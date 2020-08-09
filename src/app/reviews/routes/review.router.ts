import { ModelRouter } from '../../common/model-router'
import { ReviewDTO } from '../models/review.model'
import { IReview } from '../models/review.model.schema'
import { Server, Next, Response, Request } from 'restify'
import { environment } from '../../common/environment'
class ReviewRouter extends ModelRouter<IReview>{
    constructor() {
        super(ReviewDTO, environment.db.reviews.projection)
    }

    applyRoutes(application: Server) {
        application.post('/reviews', this.save)
        application.get('/reviews', this.findAll)
        application.del('/reviews/:id', [this.validateId, this.delete])
        application.get('/reviews/:id', [this.validateId, this.findById])
        application.patch('/reviews/:id', [this.validateId, this.update])
    }
}

export const reviewRouter = new ReviewRouter()