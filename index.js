
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require("dotenv").config();
console.log(process.env.DB_PASSWORD);

// 
//password
const productRouter = require('./routes/product.js')
const userRouter = require('./routes/user.js')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/node_ecommerce');
console.log("Connected to MongoDB successfully!");
  }


const server = express();
//built-in middleware
server.use(cors());
server.use(express.json())

server.use(express.static(path.resolve(__dirname,'build')));
server.use('/products',productRouter.router);
server.use('/users',userRouter.router);
server.use('*', (req,res)=>{
  res.sendFile(path.resolve(__dirname,'build', 'index.html'));
});


//static hoisting

server.use((req,res,next)=>{
    // console.log(req.method, req.ip, new Date())
    next()
})





server.listen(process.env.PORT,()=>{
    console.log("server started");
})