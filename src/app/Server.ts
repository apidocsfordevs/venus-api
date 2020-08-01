import { createServer } from 'restify';

export const app = () => {
    const server = createServer({
        name: "CUSTOMER-API",
        version: "1.0.0"
    })

    server.get('/whatsup', (req, resp, next) => {
        resp.contentType = 'application/json'
        resp.json(200,{
            message:"hello"
        })
        return next()
    })
    server.listen(8080, () => {
        console.log("Server is listening on port 8080")
    })
}