const express = require('express');

const server = express();
//built-in middleware
server.use(express.json())

server.use((req,res,next)=>{
    console.log(req.method, req.ip, new Date())
    next()
})

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

server.get("/",auth, (req, res) => {
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

// server.get('/demo',(req,res)=>{
//     res.send("<h1>hello<h1/>");
// })


server.listen(8080,()=>{
    console.log("server started");
})