const mongoose = require("mongoose")

// unused rn

class UserService{
    constructor(dbURL){
        this.dbURL = dbURL
        
        mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        this.db = mongoose.connection        
    }
}