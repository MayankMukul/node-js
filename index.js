
const express = require('express');
// const morgan = require('morgan');
const fs = require("fs");
// const productdata = JSON.parse(fs.readFileSync( "data.json"));
const productRouter = require('./routes/product.js')
const userRouter = require('./routes/user.js')


const server = express();
//built-in middleware
server.use(express.json())

server.use('/products',productRouter.router);
server.use('/users',userRouter.router);

//body parser
// server.use(morgan('default'));

//static hoisting
server.use(express.static('public'));

server.use((req,res,next)=>{
    // console.log(req.method, req.ip, new Date())
    next()
})






// Model-View-Controller (MVC)



// server.get('/demo',(req,res)=>{
//     res.send("<h1>hello<h1/>");
// })


server.listen(8080,()=>{
    console.log("server started");
})