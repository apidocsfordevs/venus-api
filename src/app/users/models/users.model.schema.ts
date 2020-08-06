import mongoose from 'mongoose'
import {validateCPF} from '../../common/validators'
import {saveMiddleware,updateMiddleware} from '../middleware/users.middleware'
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
    gender?:string,
    cpf?:string
}

const userSchema = new mongoose.Schema(userBaseSchema)
userSchema.pre('save',saveMiddleware)
userSchema.pre('findOneAndUpdate',updateMiddleware)
userSchema.pre('update',updateMiddleware)

export default userSchema