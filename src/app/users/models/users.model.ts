import mongoose from 'mongoose'
import { userSchema } from './users.model.schema'
export const UserDTO = mongoose.model('User', userSchema)