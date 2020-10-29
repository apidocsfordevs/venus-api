import * as restify from 'restify'
import { EventEmitter } from 'events';
import { NotFoundError } from 'restify-errors';
import {Document} from 'mongoose'
export abstract class Router extends EventEmitter {
    abstract applyRoutes(application: restify.Server): any

    envelope(document:Document):any {
        return document
    }

    render(response: restify.Response, next: restify.Next) {
        return (document: any) => {
            if (document) {
                this.emit('beforeRender', document)
                response.statusCode = 200;
                response.json(document)
            }
            else {
                throw new NotFoundError('Document not found.')
            }
            return next()
        }
    }

    renderAll(response: restify.Response, next: restify.Next, page: number, limit: number, totalPages: Promise<number> | any) {
        return (documents: any[]) => {
            if (documents) {
                documents.forEach((document, index, array) => {
                    this.emit('beforeRender', document)
                    array[index] = this.envelope(document)
                });
                response.statusCode = 200;
                totalPages.then((totalPagesCount: any) => response.json({ documents, page, limit, totalPagesCount })).catch(next)
            }
            else {
                response.json([])
            }
            return next()
        }
    }
}