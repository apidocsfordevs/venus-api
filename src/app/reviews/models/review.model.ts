import mongoose from 'mongoose'
import {reviewSchema,IReview} from './review.model.schema'

export const ReviewDTO = mongoose.model<IReview>('Reviews',reviewSchema)