const express = require('express');

const server = express();

server.get("/", (req, res) => {
    res.json({type: "GET"});
});

server.post('/', (req, res) =>{
    res.json({type: "POST"});
});

server.put('/', (req, res) =>{
    res.json({type: "PUT"});
});

server.delete('/', (req, res) =>{
    res.json({type: "DELETE"});
});

server.patch('/', (req, res) =>{
    res.json({type: "PATCH"});
});

server.get('/demo',(req,res)=>{
    res.send("<h1>hello<h1/>");
})


server.listen(8080,()=>{
    console.log("server started");
})