const http = require('http');
const fs = require('fs');

const index = fs.readFileSync("index.html",'utf-8');
const productPage = fs.readFileSync("product.html",'utf-8');
const data = JSON.parse(fs.readFileSync( "data.json"));
const products = data.products;


const server = http.createServer((req,res)=>{
    if(req.url.startsWith("/product")){
        let urlid = req.url.split('/')[2];
        let chosenProduct = products.find(prod => prod.id === (+urlid));
        // console.log(chosenProduct);
            res.setHeader('Context-Type', 'text/html');
            let newproductPage = productPage
              .replace("**title**", chosenProduct.title)
              .replace("**price**", chosenProduct.price)
              .replace("**brand**", chosenProduct.brand)
              .replace("**imgurl**", chosenProduct.thumbnail);
            res.end(newproductPage);
        return ;
    }

    
    

    
    switch(req.url){
        case "/":
            res.setHeader('Context-Type', 'text/html');
            res.end(index);
            break;
        case "/api":
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(data));;
            break;
        
        default :
            res.writeHead(404);
            res.end(`Not Found: `);
    
    console.log(`Request received  `);

    }

});

server.listen(8080);