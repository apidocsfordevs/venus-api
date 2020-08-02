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
            UserDTO.update({ "_id": req.params['id'] }, req.body, options)
                .exec()
                .then(result => {
                    if (result.n) {
                        return UserDTO.findById(req.params['id'])
                    }
                    resp.send(404)
                })
                .then(user => {
                    resp.json(user)
                })
                .catch(err =>
                    resp.send(500, err)
                )
            return next()
        })

        application.patch('/users/:id', (req, resp, next) => {
            const options = {
                new: true
            }
            UserDTO.findByIdAndUpdate({ "_id": req.params['id'] }, req.body, options)
                .then(user => {
                    if (user) {
                        resp.json(user)
                    }
                    resp.send(404)
                    return next()
                })
                .catch(err =>
                    resp.send(500, err)
                )
            return next()
        })
        application.del('/users/:id', (req, resp, next) => {
            const options = {
                new: true
            }
            UserDTO.deleteOne({ "_id": req.params['id'] })
                .exec()
                .then(queryResult => {
                    if (queryResult.n) {
                        resp.send(204)
                        return next()
                    }
                    resp.send(404)
                })
                .catch(err =>
                    resp.send(500, err)
                )
            return next()
        })
    }
}

export const usersRouter = new UsersRouter()