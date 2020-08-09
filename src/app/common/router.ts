import * as restify from 'restify'
import { EventEmitter } from 'events';
import { NotFoundError } from 'restify-errors';
export abstract class Router extends EventEmitter {
    abstract applyRoutes(application: restify.Server): any
    render(response: restify.Response, next: restify.Next) {
        return (document: any) => {
            if (document) {
                this.emit('beforeRender', document)
                response.statusCode = 200;
                response.json(document)
            }
            else {
                throw new NotFoundError("Documento não encontrado!")
            }
            return next()
        }
    }

    renderAll(response: restify.Response, next: restify.Next, page: number, limit: number, totalPages: Promise<number>) {
        return (documents: any[]) => {
            if (documents) {
                documents.forEach(document => this.emit('beforeRender', document))
                response.statusCode = 200;
                totalPages.then(totalPagesCount => response.json({ documents, page, limit, totalPagesCount })).catch(next)
            }
            else {
                response.json([])
            }
            return next()
        }
    }
}