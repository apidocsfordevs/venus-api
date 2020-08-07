import { Server } from './server/Server'
import  * as usersConfigs from './users'
import  * as restaurantsConfigs from './restaurants'

const server = new Server();

server.bootstrap([...usersConfigs.routes,...restaurantsConfigs.routes])
.then(() => {
    console.log(`Server listening on address ${server.address}`)
})
.catch((err) => {
    console.log(err)
    process.exit(1)
})