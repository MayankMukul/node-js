
const fs = require("fs");
const data = JSON.parse(fs.readFileSync( "data.json"));
const productdata = data.products;
// console.log(productdata)

//mongoose
const model = require('../model/product');
const Product = model.Product;

exports.addProduct = async (req, res) => {
  const product = new Product();
  product.title = "Newly added product";
  product.description = "Newly added product";
  product.brand = "Newly added product";
  product.category = "Newly added product";
  product.images = ["Newly added product"];
  product.price = 999;
  product.rating = 5;
  product.discountPercentage = 5;
  await product.save().then((doc)=>{
    console.log(doc)
    res.json(doc);
  }).catch(err=>{console.error(err)});
  
};

exports.getAllProducts = (req, res) => {
  res.json(productdata);
};

exports.getProduct = (req, res) => {
  const id = +req.params.id;
  const product = productdata.find((p) => p.id === id);
  res.json(product);
};


exports.replaceProduct = (req, res) => {
  const id = +req.params.id;
  const productindex = productdata.findIndex((p) => p.id === id);

  productdata.splice(productindex, 1, { ...req.body, id: id });

  res.json({ type: "PUT" });
};

exports.updateProduct = (req, res) => {
  const id = +req.params.id;
  const productindex = productdata.findIndex((p) => p.id === id);
  let tempProduct = data[productindex];
  productdata.splice(productindex, 1, { ...tempProduct, ...req.body });

  res.json({ type: "PATCH" });
};

exports.deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productindex = productdata.findIndex((p) => p.id === id);
  let tempProduct = productdata[productindex];
  productdata.splice(productindex, 1);

  res.json(tempProduct);
};
