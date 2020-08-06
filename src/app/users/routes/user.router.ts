import { ModelRouter } from '../../common/model-router';
import * as restify from 'restify';
import { UserDTO } from '../models/users.model'
import { NotFoundError } from 'restify-errors';
import { IUser } from '../models/users.model.schema';
class UsersRouter extends ModelRouter<IUser> {

    constructor() {
        super(UserDTO)
        this.on('beforeRender', document => {
            document.password = 'encrypted'
        })
    }

    applyRoutes(application: restify.Server) {
        application.get('/users', [this.validateId,this.findAll])
        application.get('/users/:id', [this.validateId,this.findById])
        application.post('/users', [this.validateId,this.save])
        application.put('/users/:id', [this.validateId,this.replace])
        application.patch('/users/:id', [this.validateId,this.update])
        application.del('/users/:id', [this.validateId,this.delete])
    }
}

export const usersRouter = new UsersRouter()