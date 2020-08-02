import { Router } from '../../common/router';
import * as restify from 'restify';
import { UserDTO } from '../models/users.model'
class UsersRouter extends Router {
    applyRoutes(application: restify.Server) {

        application.get('/users', (req, resp, next) => {
            UserDTO.find().then(data =>{
                resp.json(data)
                return next()
            })
        })

        application.get('/users/:id', (req, resp, next) => {
            UserDTO.findById(req.params['id']).then(data =>{
                if(data){
                    resp.json(data)
                    return next()
                }
                resp.send(404, {message:"NOT FOUND"})
                return next()
            })
        })
    }
}

export const usersRouter = new UsersRouter()