import mongoose from 'mongoose'
import {validateCPF} from '../../common/validators'
const userBaseSchema = {
    name:{
        type:String,
        required:true,
        maxlength:80,
        minlength:3,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        match:/[^;/?´<>:'-][\w]+@+[^;/?´<>:'-][\w]+[.][\w]*/
    },
    password:{
        type:String,
        select:false,
        required:true
    },
    gender:{
        type:String,
        enum:['Male','Female','None']
    },
    cpf:{
        type:String,
        required:false,
        validate:{
            validator:validateCPF,
            message:'{PATH}: Invalid CPF ({VALUE})'
        }
    }
}

export interface IUser extends mongoose.Document{
    name:string,
    email:string,
    password:string,
}

export const userSchema = new mongoose.Schema(userBaseSchema)