import * as restify from 'restify'
import {environment} from './common/environment'
import {Router} from './common/router'
export class Server{

    private application: restify.Server;

    constructor(){
        this.application = restify.createServer({
            name:environment.server.name,
            version:environment.server.version
        })
        this.application.use(restify.plugins.queryParser())
    }

    private startListening(resolve: Function){
        this.application.listen(environment.server.port,()=>{
            resolve(this.application)
        })
    }

    public async initRoutes(routers: Router[] = []): Promise<any>{
        return new Promise((resolve,rejects)=>{
            try{
                this.startListening(resolve)
                routers.forEach(route => {
                    route.applyRoutes(this.application)
                })
            }
            catch(error){
                rejects(error);
            }
        })
    }
    
    public get address():string{
        return JSON.stringify(this.application?.address())
    }
    

    public async bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initRoutes(routers).then(()=> this);
    }
}