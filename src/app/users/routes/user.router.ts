import { Router } from '../../common/router';
import * as restify from 'restify';
import { UserDTO } from '../models/users.model'
class UsersRouter extends Router {

    constructor() {
        super()
        this.on('beforeRender', document => {
            document.password = 'encrypted'
        })
    }

    applyRoutes(application: restify.Server) {
        application.get('/users', (req, resp, next) => {
            UserDTO.find().then(this.render(resp, next))
        })

        application.get('/users/:id', (req, resp, next) => {
            const options = {
                errorMessage: "NOT FOUND"
            }
            UserDTO.findById(req.params['id']).then(this.render(resp, next, options))
        })

        application.post('/users', (req, resp, next) => {
            let user = new UserDTO(JSON.parse(req.body))
            user.save().then(this.render(resp, next))
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
                .then(this.render(resp, next))
                .catch(err =>
                    resp.send(500, err)
                )
            return next()
        })

        application.patch('/users/:id', (req, resp, next) => {
            const options = {
                new: true
            }
            return UserDTO.findByIdAndUpdate({ "_id": req.params['id'] }, req.body, options)
                .then(this.render(resp, next))
                .catch(err =>
                    resp.send(500, err)
                )
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