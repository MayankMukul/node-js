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
  .get("/", productController.getAllProducts)
  .get("/ssr",productController.getAllProductsSSR)
  .get("/:id", productController.getProduct)
  .post("/", productController.addProduct)
  .put("/:id", productController.replaceProduct)
  .patch("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct)

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