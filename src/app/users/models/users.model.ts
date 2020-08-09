import mongoose from 'mongoose'
import userSchema,{IUser, IUserDTO } from './users.model.schema'
export const UserDTO = mongoose.model<IUser,IUserDTO>('User', userSchema)