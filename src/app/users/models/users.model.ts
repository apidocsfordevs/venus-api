import mongoose from 'mongoose'
import userSchema,{IUser } from './users.model.schema'
export const UserDTO = mongoose.model<IUser>('User', userSchema)