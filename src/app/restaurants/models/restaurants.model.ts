import mongoose from 'mongoose'
import {restaurantSchema, IRestaurant} from './restaurants.model.schema'

export const RestaurantDTO = mongoose.model<IRestaurant>('Restaurant',restaurantSchema)