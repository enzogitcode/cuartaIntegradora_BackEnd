import dotenv from 'dotenv'
dotenv.config()
export default {
    port: process.env.PORT,
    mongo_Url: process.env.MONGO_URL
}

