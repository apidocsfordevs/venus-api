import mongoose from 'mongoose'

export interface IMenuItem extends mongoose.Document {
    name: string,
    price: number
}

export interface IRestaurant extends mongoose.Document {
    name: string;
    menu: IMenuItem[];
}

const menuSchema = new mongoose.Schema<IMenuItem>({
    name: {
        required: true,
        type: String
    },
    price: {
        type: Number,
        required: true
    }
})

export const restaurantSchema = new mongoose.Schema<IRestaurant>({
    name:{
        type:String,
        required:true
    },
    menu:{
        type:[menuSchema],
        select:false,
        default:[]
    }
})