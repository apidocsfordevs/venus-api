import { ModelRouter } from '../../common/model-router'
import { RestaurantDTO } from '../models/restaurants.model'
import { IRestaurant } from '../models/restaurants.model.schema'
import { Server, Next, Response, Request } from 'restify'
import { environment } from '../../common/environment'
class RestaurantRouter extends ModelRouter<IRestaurant>{
    constructor() {
        super(RestaurantDTO, environment.db.restaurants.projection)
    }

    findRestaurantMenuOption = (req: Request, res: Response, next: Next) => {
        const { id, menuID } = req.params
        this.model.find({ _id: id }, { menu: { $elemMatch: { _id: menuID } } })
                  .then(this.render(res,next))
                  .catch(next)
        
    }

    applyRoutes(application: Server) {
        application.post('/restaurants', this.save)
        application.get('/restaurants', this.findAll)
        application.del('/restaurants/:id', [this.validateId, this.delete])
        application.get('/restaurants/:id', [this.validateId, this.findById])
        application.put('/restaurants/:id', [this.validateId, this.replace])
        application.patch('/restaurants/:id', [this.validateId, this.update])
        application.get('/restaurants/:id/menu/:menuID', [this.validateId, this.findRestaurantMenuOption])
    }
}

export const restaurantRouter = new RestaurantRouter()