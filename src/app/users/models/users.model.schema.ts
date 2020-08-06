import mongoose from 'mongoose'
import {validateCPF} from '../../common/validators'
import * as bcrypt from 'bcrypt'
import {environment} from '../../common/environment'
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
userSchema.pre('save',function(next:any){
    const user: mongoose.Document= this
    if(!user.isModified('password')){
        next()
    }
    else{
        bcrypt.hash((<IUser> user).password,environment.security.salt_rounds)
               .then(hash=>{
                    (<IUser> user).password = hash
                    next()
               })
               .catch(next)
    }
})

export default userSchema