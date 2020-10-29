export const environment = {
    server:{
        port:process.env.SERVER_PORT || 3030,
        name:"venus-api",
        version:"1.0.0"
    },
    db:{
        url:process.env.DB_URL || 'mongodb://localhost:27017/venus-api',
        users:{
            projection:process.env.USER_PROJECTIONS || 'name email'
        },
        restaurants:{
            projection:process.env.RESTAURANTS_PROJECTIONS || 'name menu'
        },
        reviews:{
            projection:process.env.REVIEWS_PROJECTIONS || 'rating comments restaurant user'
        }
    },
    security:{
        salt_rounds: process.env.SALT_ROUNDS || 10  
    }
}