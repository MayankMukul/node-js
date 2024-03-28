const express = require('express');
const userController = require('../controller/product');
const router = express.Router();


router
  .get("/", userController.getAllProducts)
  .get("/:id", userController.getProduct)
  .post("/", userController.addProduct)
  .put("/:id", userController.replaceProduct)
  .patch("/:id", userController.updateProduct)
  .delete("/:id", userController.deleteProduct)


exports.router = router;