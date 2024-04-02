
const fs = require("fs");
const data = JSON.parse(fs.readFileSync( "data.json"));
const productdata = data.products;
// console.log(productdata)

exports.getAllProducts = (req, res) => {
  res.json(productdata);
};

exports.getProduct = (req, res) => {
  const id = +req.params.id;
  const product = productdata.find((p) => p.id === id);
  res.json(product);
};

exports.addProduct = (req, res) => {
  // console.log(req.body);
  productdata.push(req.body);
  res.json(req.body);
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
