
const fs = require("fs");
const data = JSON.parse(fs.readFileSync( "data.json"));
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

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  
  await Product.findOneAndUpdate({_id:id},res.body,{new:true}).then((doc)=>{
    console.log(doc);
    res.json(doc);
  }).catch((err)=>{
    console.log(err);
    res.json(err);
  })
 
};

exports.deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productindex = productdata.findIndex((p) => p.id === id);
  let tempProduct = productdata[productindex];
  productdata.splice(productindex, 1);

  res.json(tempProduct);
};
