import * as restify from 'restify'
import { EventEmitter } from 'events';
export abstract class Router extends EventEmitter{
    abstract applyRoutes(application: restify.Server): any
    render(response: restify.Response, next: restify.Next, options: any = {}) {
        return (document:any) => {
            if (document) {
                this.emit('beforeRender',document)
                response.statusCode = 200;
                response.json(document)
            }
            else {
                response.statusCode = 404;
                response.send(options.errorMessage)
            }
            return next()
        }
    }
}