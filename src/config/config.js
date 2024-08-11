import dotenv from 'dotenv'
dotenv.config()
export default {
    port: process.env.PORT,
    mongo_Url: process.env.MONGO_URL,
    SECRET: process.env.SECRET,
    ADMIN_NAME: process.env.ADMIN_NAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
}

