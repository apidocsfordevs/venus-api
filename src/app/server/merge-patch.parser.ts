import * as restify from 'restify'

const requestContentTypeMergePatch = 'application/merge-patch+js'

export const mergePatchBodyParser = (req:restify.Request,resp:restify.Response,next:restify.Next) =>{
    if(req.getContentType() === requestContentTypeMergePatch && req.method == 'PATCH'){
        try {
            req.body = JSON.parse(req.body)
        } catch (error) {
            return next(new Error(`Invalid Content ${error.message}`))            
        }
    }
    return next()
}