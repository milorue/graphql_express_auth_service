const mongoose = require("mongoose")

let UserSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    username: {type: String, unique: true},
    meta: {
        lastLoggedIn: Date
    }

})

UserSchema.methods.updateLoginDate = function(){
    this.meta.lastLoggedIn= new Date()
}

module.exports = UserSchema