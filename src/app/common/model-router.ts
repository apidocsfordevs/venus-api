import { Router } from './router'
import mongoose from 'mongoose'
import { Request, Response, Next } from 'restify'
import { NotFoundError } from 'restify-errors'

export abstract class ModelRouter<T extends mongoose.Document> extends Router {
    constructor(protected model: mongoose.Model<T>) {
        super()
    }

    validateId = (req: Request, resp: Response, next: Next) =>{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            next(new NotFoundError("Not a valid ID"))
        }
        else{
            next()
        }
    }

    findAll = (req: Request, resp: Response, next: Next) => {
        this.model.find()
            .then(this.render(resp, next))
            .catch(next)
    }

    findById = (req: Request, resp: Response, next: Next) => {
        const options = {
            errorMessage: "NOT FOUND"
        }
        this.model.findById(req.params['id']).then(this.render(resp, next, options)).catch(next)
    }

    save = (req: Request, resp: Response, next: Next) => {
        let document = new this.model(req.body)
        document.save().then(this.render(resp, next)).catch(next)
    }

    replace = (req: Request, resp: Response, next: Next) => {
        const options = {
            overwrite: true,
            runValidators: true
        }
        this.model.update({ "_id": req.params['id'] }, req.body, options)
            .exec()
            .then(result => {
                if (result.n) {
                    return this.model.findById(req.params['id'])
                }
                throw new NotFoundError("Documento não encontrado!")
            })
            .then(this.render(resp, next))
            .catch(next)
        return next()
    }

    update = (req: Request, resp: Response, next: Next) => {
        const options = {
            new: true,
            runValidators: true
        }
        return this.model.findByIdAndUpdate({ "_id": req.params['id'] }, req.body, options)
            .then(this.render(resp, next))
            .catch(next)
    }

    delete = (req: Request, resp: Response, next: Next) => {
        this.model.deleteOne({ "_id": req.params['id'] })
            .exec()
            .then(queryResult => {
                if (queryResult.n) {
                    resp.send(204)
                    return next()
                }
                throw new NotFoundError("Documento não encontrado!")
            })
            .catch(err =>
                resp.send(500, err)
            )
        return next()
    }
}