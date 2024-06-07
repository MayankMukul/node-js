require('./events')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require("dotenv").config();
const authRouter = require('./routes/auth.js');

const fs = require('fs');
const publickey = fs.readFileSync(path.resolve(__dirname,'./public.key'),'utf-8');

const jwt = require('jsonwebtoken');

// 
//password
const productRouter = require('./routes/product.js')
const userRouter = require('./routes/user.js')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_MONGO_URL);
console.log("Connected to MongoDB successfully!");
  }


const server = express();
//socket.io
const app = require('http').createServer(server);
const io = require('socket.io')(app);


//built-in middlewar

const auth = (req, res, next)=>{
  
  try{
    const token = req.get('Authorization').split("Bearer ")[1];
    console.log(token)
    let decoded = jwt.verify(token, publickey);
    // console.log(decoded);
    if(decoded.email){
      next();
    }else{
      res.sendStatus(401);
    }
  }catch(err){
    res.sendStatus(401);

    }

  
}


server.use(cors());
server.use(express.json())
server.use(express.urlencoded()); 

server.use(express.static(path.resolve(__dirname,'build')));
server.use('/auth', authRouter.router)
server.use('/products', auth, productRouter.router);
server.use('/users',auth, userRouter.router);
server.use('*', (req,res)=>{
  res.sendFile(path.resolve(__dirname,'build', 'index.html'));
});


//static hoisting

server.use((req,res,next)=>{
    // console.log(req.method, req.ip, new Date())
    next()
})


io.on('connection',(socket)=>{
    console.log(socket.id)
})


app.listen(process.env.PORT,()=>{
    console.log("server started");
})