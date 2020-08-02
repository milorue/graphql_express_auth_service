// ===============================
// User Model

// ----Data Field----
// email: String
// password: String
// username: String
// meta: {lastLoggedIn: Date}
// ------------------

// ----Methods----
// Description: "Updates lastLoggedIn to the current time and place"
// Method: updateLoginDate()
// ---------------

// ----Files----
// MODEL | model/user_model.js
// SCHEMA | schema/user_schema.js
// -------------

// ----Example----
// const user_examp = new UserModel({email: "test", password: "test", username: "test", meta: {lastLoggedIn: new Date()}})
// user_examp.updateLogInDate()
// ---------------
// ===============================
const UserModel = require("./user_model")


// template

// ===============================
// 
//
// ----Data Field----
// 
// ------------------
//
// ----Methods----
// Description: 
// Method: 
//
// Description: 
// Method: 
// ---------------

// ----Files----
// MODEL | 
// SCHEMA | 
// -------------

// ----Example----
// 
// ---------------
// ===============================


module.exports = {
    User: UserModel,

}