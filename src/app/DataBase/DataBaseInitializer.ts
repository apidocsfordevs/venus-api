import mongoose from 'mongoose'
import {environment} from '../common/environment'
export class DataBaseInitializer{
    static init(){
        return mongoose.connect(environment.db.url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
    }
}