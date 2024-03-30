
const fs = require("fs");
const data = JSON.parse(fs.readFileSync( "data.json"));
const userdata = data.users;
// console.log(productdata)

exports.getAllUsers = (req, res) => {
  res.json(userdata);
};

exports.getUser = (req, res) => {
  const id = +req.params.id;
  const product = userdata.find((p) => p.id === id);
  res.json(product);
};

exports.addUser = (req, res) => {
  // console.log(req.body);
  userdata.push(req.body);
  res.json(req.body);
};

exports.replaceUser = (req, res) => {
  const id = +req.params.id;
  const productindex = userdata.findIndex((p) => p.id === id);

  userdata.splice(productindex, 1, { ...req.body, id: id });

  res.json({ type: "PUT" });
};

exports.updateUser = (req, res) => {
  const id = +req.params.id;
  const productindex = userdata.findIndex((p) => p.id === id);
  let tempProduct = data[productindex];
  userdata.splice(productindex, 1, { ...tempProduct, ...req.body });

  res.json({ type: "PATCH" });
};

exports.deleteUser = (req, res) => {
  const id = +req.params.id;
  const productindex = userdata.findIndex((p) => p.id === id);
  let tempProduct = userdata[productindex];
  userdata.splice(productindex, 1);

  res.json(tempProduct);
};
