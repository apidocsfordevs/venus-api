import * as restify from 'restify'
import {BadRequestError} from 'restify-errors'
const requestContentTypeMergePatch = 'application/merge-patch+js'

export const mergePatchBodyParser = (req:restify.Request,resp:restify.Response,next:restify.Next) =>{
    if(req.getContentType() === requestContentTypeMergePatch && req.method == 'PATCH'){
        try {
            req.body = JSON.parse(req.body)
        } catch (error) {
            return next(new BadRequestError(`Invalid Content ${error.message}`))            
        }
    }
    return next()
}