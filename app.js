import express from 'express';
const app= express();
import config from './src/config/config.js';
const port= config.port
import './database.js'

app.use (express.json ());
app.use (express.urlencoded ({extended:true}));
app.use(express.static('./src/public'))

//handlebars
import exphbs from 'express-handlebars'
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'hbs');
app.set('views', './src/views');

//routers
import productRouter from './src/routes/product.router.js'
import cartRouter from './src/routes/cart.router.js'
import userRouter from './src/routes/user.router.js'
import viewsRouter from './src/routes/views.router.js'

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/users', userRouter)
app.use('/', viewsRouter)

//listen
app.listen (port, ()=> { console.log(`Escuchando el puerto ${port}`);})