import express from 'express';
const app= express();
import './database.js'
app.use (express.json ());
app.use (express.urlencoded ({extended:true}));
app.use(express.static('./src/public'))

//routers
import productRouter from './src/routes/product.router.js'
import cartRouter from './src/routes/cart.router.js'
import userRouter from './src/routes/user.router.js'

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/users', userRouter)
//app.use('/', viewsRouter)

import config from './src/config/config.js';
const port= config.port
app.listen (port, ()=> { console.log(`Escuchando el puerto ${port}`);})