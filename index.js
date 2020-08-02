require('dotenv').config()

// server & orm
const express = require("express")
const mongoose = require("mongoose")

// internal file system
const fs = require("fs")

// graphql
const typeDefs = fs.readFileSync('./graphql_schema/schema.graphql', {encoding: 'utf-8'})
const {ApolloServer, gql} = require("apollo-server-express")

// hashing & security
const { hash, genSalt, compare } = require('bcryptjs')
const {sign} = require("jsonwebtoken")

// data model
const UserModel = require('./data_schema/model/user_model')

async function run(){
    const app = express();
    app.get("/", (_req, res) => {
        res.send("♿ Welcome to the EnAb GraphQL Server ♿")
    })

    mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    const db = mongoose.connection

    db.on('error', console.error.bind(console, 'Connection Error ☹️:'))
    db.once('open', function() {
        
        const resolvers = {
            Query:{
                async users(){
                    let result = await UserModel.find((err, users) => {
                        if(err){
                            return new Promise(resolve => {
                                resolve([])
                            })
                        }
                        return new Promise(resolve => {
                            resolve(users)
                        })
                    })

                    return result
                }

            },
            Mutation:{
                async register(parent, args){
                    const salt = await genSalt()
                    const hashedPassword = await hash(args.password, salt)
                    
                    const user = new UserModel({
                        email: args.email, 
                        password: hashedPassword, 
                        username: args.username, 
                        meta:{
                            lastLoggedIn: new Date()
                        }})

                    try{
                        let success = await user.save()
                        return true
                    }
                    catch{
                        return false
                    }
                },

                async login(parent, args, context){

                    let user_l = await UserModel.findOne({email: args.email})

                    if(user_l){
                        const login_validation = await compare(args.password, user_l.password)

                        if (!login_validation){
                            throw new Error("Incorrect password")
                        }

                        // update the login date upon successful login
                        user_l.updateLoginDate()

                        try{
                            let updated_user_l = await user_l.save()
                        }
                        catch{
                            
                        }

                        context.res.cookie("id", sign({userId: user_l._id, email: user_l.email, username: user_l.username},
                            process.env.REFRESH_TOKEN_SECRET, {
                                expiresIn: "7d"
                            }),
                            {httpOnly: true})
                        

                        // login success
                        return {
                            accessToken: sign({ userId: user_l._id, email: user_l.email, username: user_l.username}, process.env.ACCESS_TOKEN_SECRET, {
                                expiresIn: "15m"
                            })
                        }
                    }
                    else{
                        throw new Error("Login error")
                    }
                    

                    

                    
                }
            }
        }
    
        const apolloServer = new ApolloServer({
            typeDefs, resolvers, context: ({ req, res }) => ({ req, res })
        })
        
    
        apolloServer.applyMiddleware({app})
    
        app.listen(4000, () => {
            console.log("EnAb Server Started")
        })

    })
    
}

run()

