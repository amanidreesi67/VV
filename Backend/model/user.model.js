import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firtName:String,
    lastName:String,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const User = mongoose.model("users",userSchema)

export default User