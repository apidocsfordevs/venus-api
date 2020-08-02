import mongoose from 'mongoose'
const userBaseSchema = {
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        select:false
    }
}

export const userSchema = new mongoose.Schema(userBaseSchema)