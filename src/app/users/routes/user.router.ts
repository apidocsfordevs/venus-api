import { ModelRouter } from '../../common/model-router';
import * as restify from 'restify';
import { UserDTO } from '../models/users.model'
import { IUser } from '../models/users.model.schema';
import { environment } from '../../common/environment';
class UsersRouter extends ModelRouter<IUser> {
    constructor() {
        super(UserDTO,environment.db.users.projection)
    }

    applyRoutes(application: restify.Server) {
        application.get('/users', this.findAll)
        application.get('/users/:id', [this.validateId, this.findById])
        application.post('/users', this.save)
        application.put('/users/:id', [this.validateId, this.replace])
        application.patch('/users/:id', [this.validateId, this.update])
        application.del('/users/:id', [this.validateId, this.delete])
    }
}

export const usersRouter = new UsersRouter()