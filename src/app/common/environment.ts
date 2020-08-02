export const environment = {
    server:{
        port:process.env.SERVER_PORT || 3030,
        name:"customer-api",
        version:"1.0.0"
    },
    db:{
        url:process.env.DB_URL || 'mongodb://localhost:27017/customer-api'
    }
}