import { Server } from './Server'
import  * as usersConfigs from './users'

const server = new Server();

server.bootstrap(usersConfigs.routes)
.then(() => {
    console.log(`Server listening on address ${server.address}`)
})
.catch((err) => {
    console.log(err)
    process.exit(1)
})