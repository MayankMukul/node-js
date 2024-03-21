
const express = require('express');
const morgan = require('morgan');
const fs = require("fs");
const productdata = JSON.parse(fs.readFileSync( "data.json"));
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

server.get("/products", (req, res) => {
    res.json(productdata);
});

server.get("/products/:id", (req, res) => {
    const id = +req.params.id;
    const product = productdata.find(p=> p.id===id);
    res.json(product);
});

server.get("/",auth, (req, res) => {
    res.json({type: "GET"});
});

server.post('/', (req, res) =>{
    res.json({type: "POST"});
});

server.post('/product', (req, res) =>{
    // console.log(req.body);
    productdata.push(req.body);
    res.json(req.body);
});

server.put('/', (req, res) =>{
    res.json({type: "PUT"});
});

server.put('/products/:id', (req, res) =>{
    const id = +req.params.id;
    const productindex = productdata.findIndex(p=> p.id===id);

    productdata.splice(productindex,1,{...req.body, id:id})
    
    res.status(201).json({type: "PUT"});
});

server.delete('/', (req, res) =>{
    res.json({type: "DELETE"});
});

server.patch('/', (req, res) =>{
    res.json({type: "PATCH"});
});

// server.get('/demo',(req,res)=>{
//     res.send("<h1>hello<h1/>");
// })


server.listen(8080,()=>{
    console.log("server started");
})