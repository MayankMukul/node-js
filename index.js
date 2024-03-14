const express = require('express');

const server = express();

server.get('/',(req,res)=>{
    res.send("hello");
})

server.listen(8080,()=>{
    console.log("server started");
})