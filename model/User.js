const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:['user', "admin"],
        default: "user"
    }

})


const user = mongoose.model("User", UserSchema)

module.exports = user