import { ModelRouter } from '../../common/model-router'
import { ReviewDTO } from '../models/review.model'
import { IReview } from '../models/review.model.schema'
import { Server } from 'restify'
import { environment } from '../../common/environment'
import {DocumentQuery,Document} from 'mongoose'
class ReviewRouter extends ModelRouter<IReview>{
    constructor() {
        super(ReviewDTO, environment.db.reviews.projection)
    }

    envelope(document:Document):any{
        let resource = super.envelope(document)
        const restaurantId = resource.restaurant._id ? resource.restaurant._id : resource.restaurant
        resource._links.restaurant = `/restaurant/${restaurantId}`
        return resource
    }

    protected prepareOne(query: DocumentQuery<IReview | null, IReview,{}>): DocumentQuery<IReview | null, IReview,{}> {
        return query
               .populate('user','name')
               .populate('restaurant','name')
    }

    applyRoutes(application: Server) {
        application.post(`${this.basePath}`, this.save)
        application.get(`${this.basePath}`, this.findAll)
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete])
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
    }
}

export const reviewRouter = new ReviewRouter()