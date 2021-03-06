import { ModelRouter } from '../../common/model-router';
import * as restify from 'restify';
import { UserDTO } from '../models/users.model'
import { IUser, IUserDTO } from '../models/users.model.schema';
import { environment } from '../../common/environment';
class UsersRouter extends ModelRouter<IUser> {
    constructor() {
        super(UserDTO,environment.db.users.projection)
    }

    findByEmail = (req:restify.Request,resp:restify.Response,next:restify.Next)=>{
        const {email} = req.query        
        let { page = 1, limit = 5 } = req.query        
        page = Number.parseInt(page)
        limit = Number.parseInt(limit)
        if(email){
            (<IUserDTO>this.model).findByEmail(email)
                      .then(users => [users])
                      .then(this.renderAll(resp,next,page, limit, this.model.countDocuments().exec()))
                      .catch(next)
        }
        else{
            next()
        }
    }

    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, [this.findByEmail,this.findAll])
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
        application.post(`${this.basePath}`, this.save)
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace])
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update])
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete])
    }
}

export const usersRouter = new UsersRouter()