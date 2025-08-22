// This is the bluePrint for the mongodb
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName: {
        type:String,
        required:true,
        unique:true
    },
    email: {
        type:String,
        required:true,
        // if the person uses the same email to register, the backend will get the error
        unique:true  
    },
    password: {
        type:String,
        required:true,
    },
    role: {
        type:String,
        default:"user"
    },
})

const User = mongoose.model("User",UserSchema)
module.exports = User