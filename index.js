const http = require('http');
const fs = require('fs');

const index = fs.readFileSync("index.html",'utf-8')

const server = http.createServer((req,res)=>{
    console.log(`Request received  `);
    res.end(index)
})

server.listen(8080);