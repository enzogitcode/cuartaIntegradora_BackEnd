import express from 'express';
const app = express();
import config from './src/config/config.js';
const port = config.port
import './database.js'

import passport from 'passport';
import { initializePassport, cookieExtractor } from './src/config/passport.config.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'))
app.use(cookieParser())

//passport
app.use(passport.initialize())
initializePassport()

//routers
import productRouter from './src/routes/product.router.js'
import cartRouter from './src/routes/cart.router.js'
import userRouter from './src/routes/user.router.js'
import viewsRouter from './src/routes/views.router.js'

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/users', userRouter)
app.use('/', viewsRouter)

//handlebars
import exphbs from 'express-handlebars'
import cookieParser from 'cookie-parser';
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//listen
app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`);
})