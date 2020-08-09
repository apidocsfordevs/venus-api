import { Server } from './server/Server'
import  * as usersConfigs from './users'
import  * as restaurantsConfigs from './restaurants'
import  * as reviewsConfigs from './reviews'

const server = new Server();

server.bootstrap([...usersConfigs.routes,...restaurantsConfigs.routes,...reviewsConfigs.routes])
.then(() => {
    console.log(`Server listening on address ${server.address}`)
})
.catch((err) => {
    console.log(err)
    process.exit(1)
})