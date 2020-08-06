import * as restify from 'restify'
export const handleError = (req: restify.Request, resp: restify.Response, err: any, done: any) => {
    console.log(err);
    Object.defineProperty(err, 'toJSON', {
        enumerable: false,  
        configurable: false,
        writable: true,    
        value: 'static'
    })
    err.toJSON = () => {
        return {
            message: err.message
        }
    }
    switch (err.name) {
        case 'MongoError':
            if (err.code === 11000) {
                err.statusCode = 400
            }
            break
        case 'ValidationError':
            err.statusCode = 400
            const messages: any[] = []
            for (const errorName in err.errors) {
                messages.push({
                    message:err.errors[errorName].message
                })
            }
            err.toJSON = () => {
                return {
                    errors: messages
                }
            }
            break
    }
    done()
}