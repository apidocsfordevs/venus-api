import { Router } from '../../common/router';
import * as restify from 'restify';
import { User } from '../models/users.model'
class UsersRouter extends Router {
    applyRoutes(application: restify.Server) {
        application.get('/users', (req, resp, next) => {
            User.findAll().then(data =>{
                resp.json(data)
                return next()
            })
        })
    }
}

export const usersRouter = new UsersRouter()