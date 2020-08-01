interface IUser{
    name:string,
    email:string
}

const users:IUser[] = [
    {
        name:'Peter Parker',
        email:"some@email.com"
    },
    {
        name:'Tony Start',
        email:"tony@avenger.com"
    }
]

export class User{
    static findAll(): Promise<IUser[]>{
        return Promise.resolve(users)
    }
}