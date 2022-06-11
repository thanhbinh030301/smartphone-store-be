import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import products from './routers/products.js'
import carts from './routers/carts.js'
import auth from './routers/auth.js';
import user from './routers/user.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use('/',cors())
//routes
app.use('/products', products)
app.use('/carts', carts)
app.use('/v1/auth', auth)
app.use('/v1/user', user)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
        console.log('Connected to DB')
        app.listen(PORT, ()=>{
            console.log(`listening on port ${PORT}`);
        })
    }).catch(err => {
        console.log('err', err)
    })

// JWT

