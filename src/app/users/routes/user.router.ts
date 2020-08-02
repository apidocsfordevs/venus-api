import { Router } from '../../common/router';
import * as restify from 'restify';
import { UserDTO } from '../models/users.model'
class UsersRouter extends Router {
    applyRoutes(application: restify.Server) {

        application.get('/users', (req, resp, next) => {
            UserDTO.find().then(data => {
                resp.json(data)
                return next()
            })
        })

        application.get('/users/:id', (req, resp, next) => {
            UserDTO.findById(req.params['id']).then(data => {
                if (data) {
                    resp.json(data)
                    return next()
                }
                resp.send(404, { message: "NOT FOUND" })
                return next()
            })
        })

        application.post('/users', (req, resp, next) => {
            let user = new UserDTO(JSON.parse(req.body))
            user.save().then(userCreated => {
                userCreated.password = 'encrypted'
                resp.json(userCreated)
                return next()
            })
        })

        application.put('/users/:id', (req, resp, next) => {
            const options = {
                overwrite: true
            }
            UserDTO.update({ "_id": req.params['id'] }, JSON.parse(req.body))
                .exec()
                .then(result => {
                    if(result.n){
                        return UserDTO.findById(req.params['id'])
                    }
                    return resp.send(404)
                })
                .then(user => {
                    resp.json(user)
                    return next()
                })
                .catch(err => 
                    resp.send(500,err)
                )
        })
    }
}

export const usersRouter = new UsersRouter()