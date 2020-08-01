import {Server} from './Server'

const server = new Server();
server.bootstrap()
        .then(()=>{
            console.log(`Server listening on address ${server.address}`)
        })
        .catch(()=>{
            
        })