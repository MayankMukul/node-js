
const fs = require("fs");
const path = require('path');
const data = JSON.parse(fs.readFileSync( path.resolve(__dirname,"../data.json")));
const productdata = data.products;
// console.log(productdata)

//mongoose
const model = require('../model/product');
const Product = model.Product;

//create
exports.addProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save().then((doc)=>{
    // console.log(doc)
    res.json(doc);
  }).catch(err=>{
    // console.error(err)
    res.json(err);
  });
  
};

//read
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const product = await Product.findById(id);
  res.json(product);
};


exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  
  await Product.findOneAndReplace({_id:id} , req.body, { new: true}).then((doc)=>{
    // console.log(doc)
    res.json(doc);
  }).catch((err)=>{
    // console.error(err)
    res.json(err);
  }
)

};

//update
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  
  await Product.findOneAndUpdate({_id:id},req.body,{new:true}).then((doc)=>{
    // console.log(doc);
    res.json(doc);
  }).catch((err)=>{
    // console.log(err);
    res.json(err);
  })
 
};

//delete
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  
  await Product.findOneAndDelete({_id:id}).then((doc)=>{
    console.log(doc);
    res.json(doc);
  }).catch((err)=>{
    console.log(err);
    res.json(err);
  });

};
