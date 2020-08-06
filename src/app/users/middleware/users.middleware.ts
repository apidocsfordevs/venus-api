import * as bcrypt from 'bcrypt'
import { environment } from '../../common/environment'
import mongoose from 'mongoose'
import { IUser } from '../models/users.model.schema'
function hash(userDocument: IUser, next: any) {
    const user = (<IUser>userDocument)
    bcrypt.hash(user.password, environment.security.salt_rounds)
        .then(hash => {
            user.password = hash
            next()
        })
        .catch(next)
}

export function saveMiddleware(this: any, next: any) {
    const user: mongoose.Document = this
    if (!user.isModified('password')) {
        next()
    }
    else {
        hash((<IUser>user), next)
    }
}

export function updateMiddleware(this: any, next: any){
    const updatedDocument = this.getUpdate()
    if (!updatedDocument.password) {
        next()
    }
    else {
        hash((<IUser>updatedDocument), next)
    }
}