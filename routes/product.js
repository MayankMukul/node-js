const express = require('express');
const productController = require('../controller/product');
const router = express.Router();

const auth = ((req,res,next)=>{
                                    //setting authentication on body
  console.log(req.query.password)

  if(req.query.password=="123"){
      next();
  } else {
      res.sendStatus(401);
  }
})

// const auth = ((req,res,next)=>{
//                                      setting authentication on url query

//     console.log(req.query.password)

//     if(req.query.password=="123"){
//         next();
//     } else {
//         res.sendStatus(401);
//     }
// })

router
  .get("/products", productController.getAllProducts)
  .get("/products/:id", productController.getProduct)
  .post("/product", productController.addProduct)
  .put("/products/:id", productController.replaceProduct)
  .patch("/products/:id", productController.updateProduct)
  .delete("/products/:id", productController.deleteProduct)

  .get("/",auth,  (req, res) => {
    res.json({ type: "GET" });
  })

  .post("/", (req, res) => {
    res.json({ type: "POST" });
  })

  .put("/", (req, res) => {
    res.json({ type: "PUT" });
  })

  .patch("/", (req, res) => {
    res.json({ type: "PATCH" });
  })

  .delete("/", (req, res) => {
    res.json({ type: "DELETE" });
  });


exports.router = router