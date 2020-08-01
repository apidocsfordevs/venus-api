import * as restify from 'restify'
import {environment} from '../../common/environment'
export class Server{

    private application?: restify.Server;

    public async initRoutes(): Promise<any>{
        return new Promise((resolve,rejects)=>{
            try{
                this.application = restify.createServer({
                    name:environment.server.name,
                    version:environment.server.version
                })
                this.application.use(restify.plugins.queryParser())
                this.application.listen(environment.server.port,()=>{
                    resolve(this.application)
                })
                this.application.get('/info',(res,resp,next)=>{
                    resp.json({message:"working!"})
                    return next()
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
    

    public async bootstrap(): Promise<Server>{
        return this.initRoutes().then(()=> this);
    }
}