const http = require('http');
const fs = require('fs');

const index = fs.readFileSync("index.html",'utf-8');
const productPage = fs.readFileSync("product.html",'utf-8');
const data = JSON.parse(fs.readFileSync( "data.json"));
const products = data.products[0];


const server = http.createServer((req,res)=>{

    switch(req.url){
        case "/":
            res.setHeader('Context-Type', 'text/html');
            res.end(index);
            break;
        case "/api":
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(data));;
            break;
        case "/product":
            res.setHeader('Context-Type', 'text/html');
            let newproductPage = productPage
              .replace("**title**", products.title)
              .replace("**price**", products.price)
              .replace("**brand**", products.brand)
              .replace("**imgurl**", products.thumbnail);
            res.end(newproductPage);
            break;
        default :
            res.writeHead(404);
            res.end(`Not Found: `);
    }
    console.log(`Request received  `);
})

server.listen(8080);