import { ModelRouter } from '../../common/model-router'
import { ReviewDTO } from '../models/review.model'
import { IReview } from '../models/review.model.schema'
import { Server } from 'restify'
import { environment } from '../../common/environment'
import {DocumentQuery} from 'mongoose'
class ReviewRouter extends ModelRouter<IReview>{
    constructor() {
        super(ReviewDTO, environment.db.reviews.projection)
    }

    protected prepareOne(query: DocumentQuery<IReview | null, IReview,{}>): DocumentQuery<IReview | null, IReview,{}> {
        return query
               .populate('user','name')
               .populate('restaurant','name')
    }

    applyRoutes(application: Server) {
        application.post('/reviews', this.save)
        application.get('/reviews', this.findAll)
        application.del('/reviews/:id', [this.validateId, this.delete])
        application.get('/reviews/:id', [this.validateId, this.findById])
    }
}

export const reviewRouter = new ReviewRouter()