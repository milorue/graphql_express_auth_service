const mongoose = require("mongoose")

const schema = require('../schema/user_schema')

const UserModel = mongoose.model("User", schema)

module.exports = UserModel