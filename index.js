
const express = require('express');
const morgan = require('morgan');
const fs = require("fs");
const productdata = JSON.parse(fs.readFileSync( "data.json"));
const productController = require('./controller/product.js');

const server = express();
//built-in middleware
server.use(express.json())

//body parser
// server.use(morgan('default'));

//static hoisting
server.use(express.static('public'));

server.use((req,res,next)=>{
    // console.log(req.method, req.ip, new Date())
    next()
})
//setting authentication on body
const auth = ((req,res,next)=>{
    console.log(req.body.password)

    if(req.body.password=="123"){
        next();
    } else {
        res.sendStatus(401);
    }
})

// setting authentication on url query

// const auth = ((req,res,next)=>{
//     console.log(req.query.password)

//     if(req.query.password=="123"){
//         next();
//     } else {
//         res.sendStatus(401);
//     }
// })



server.get("/products", productController.getAllProducts);
server.get("/products/:id", productController.getProduct);
server.post('/product', productController.addProduct);
server.put('/products/:id', productController.replaceProduct );
server.patch('/products/:id', productController.updateProduct);
server.delete('/products/:id', productController.deleteProduct);

server.get("/",auth, (req, res) => {
    res.json({type: "GET"});
});

server.post('/', (req, res) =>{
    res.json({type: "POST"});
});

server.put('/', (req, res) =>{
    res.json({type: "PUT"});
});

server.patch('/', (req, res) =>{
    res.json({type: "PATCH"});
});

server.delete('/', (req, res) =>{
    res.json({type: "DELETE"});
});


// server.get('/demo',(req,res)=>{
//     res.send("<h1>hello<h1/>");
// })


server.listen(8080,()=>{
    console.log("server started");
})