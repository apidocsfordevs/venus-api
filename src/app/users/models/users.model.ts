interface IUser{
    name:string,
    email:string,
    id:number
}

const users:IUser[] = [
    {
        name:'Peter Parker',
        email:"some@email.com",
        id:1
    },
    {

        name:'Tony Start',
        email:"tony@avenger.com",
        id:2
    }
]

export class User{
    static findAll(): Promise<IUser[]>{
        return Promise.resolve(users)
    }
    static findById(id:number): Promise<IUser>{
        return new Promise((resolve,reject)=>{
            try{
                const user = users.find(value => value.id == id)
                resolve(user)
            }
            catch(err){
                reject(err)
            }
        })
    }
}