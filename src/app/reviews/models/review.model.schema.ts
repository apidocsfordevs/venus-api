import mongoose from 'mongoose'
import {IRestaurant} from '../../restaurants/models/restaurants.model.schema'
import {IUser} from '../../users/models/users.model.schema'

export interface IReview extends mongoose.Document{
    date:Date,
    rating:number,
    comments:string,
    restaurant:mongoose.Types.ObjectId | IRestaurant,
    user:mongoose.Types.ObjectId | IUser
}

export const reviewSchema = new mongoose.Schema<IReview>({
    date:{
        type:Date,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comments:{
        type:String,
        maxlength:500
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'restaurants',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
})