
const fs = require("fs");
const path = require('path');
const data = JSON.parse(fs.readFileSync( path.resolve(__dirname,"../data.json")));
const productdata = data.products;

const ejs = require('ejs');
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
  const query =  Product.find();
  if(req.query && req.query.sort){
    // api https://localhost:8080/products?sort=price&order=desc&limit=2
    const products = await query.sort({[req.query.sort]:req.query.order}).limit(req.qurey.limit).exec();  
    res.json(products);
  }else{
    const products = await query.exec();
    res.json(products);
  }
  // if(req.query && req.query.sort){
  //   const products = await query.sort({price:req.query.sort}).exec();  
  //   res.json(products);
  // }else{
  //   const products = await query.exec();
  //   res.json(products);
  // }
};

exports.getAllProductsSSR = async (req, res) => {
  const products = await Product.find();
  console.log(products);
  ejs.renderFile(path.resolve(__dirname,'../pages/index.ejs'), {products:products}, function(err, str){
    // str => Rendered HTML string
    res.send(str);
});
};

exports.getAddformProduct = async (req, res) => {
  
  ejs.renderFile(path.resolve(__dirname,'../pages/add.ejs'), function(err, str){
    // str => Rendered HTML string
    res.send(str);
});
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
