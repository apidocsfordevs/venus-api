import { ModelRouter } from '../../common/model-router';
import * as restify from 'restify';
import { UserDTO } from '../models/users.model'
import { IUser } from '../models/users.model.schema';
import { environment } from '../../common/environment';
class UsersRouter extends ModelRouter<IUser> {
    constructor() {
        super(UserDTO,environment.db.users.projection)
    }

    findByEmail = (req:restify.Request,resp:restify.Response,next:restify.Next)=>{
        const {email} = req.query        
        if(email){
            this.model.find({"email":email})
                      .then(this.render(resp,next))
                      .catch(next)
        }
        next()
    }

    applyRoutes(application: restify.Server) {
        application.get('/users', [this.findByEmail,this.findAll])
        application.get('/users/:id', [this.validateId, this.findById])
        application.post('/users', this.save)
        application.put('/users/:id', [this.validateId, this.replace])
        application.patch('/users/:id', [this.validateId, this.update])
        application.del('/users/:id', [this.validateId, this.delete])
    }
}

export const usersRouter = new UsersRouter()