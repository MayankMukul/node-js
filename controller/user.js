
const fs = require("fs");
const path = require('path');

const data = JSON.parse(fs.readFileSync(  path.resolve(__dirname,"data.json")));
const userdata = data.users;
// console.log(productdata)

exports.getAllUsers = (req, res) => {
  res.json(userdata);
};

exports.getUser = (req, res) => {
  const id = +req.params.id;
  const user = userdata.find((p) => p.id === id);
  res.json(user);
};

exports.addUser = (req, res) => {
  // console.log(req.body);
  userdata.push(req.body);
  res.json(req.body);
};

exports.replaceUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = userdata.findIndex((p) => p.id === id);

  userdata.splice(userIndex, 1, { ...req.body, id: id });

  res.json({ type: "PUT" });
};

exports.updateUser = (req, res) => {
  const id = +req.params.id;
  const userindex = userdata.findIndex((p) => p.id === id);
  let tempProduct = data[userindex];
  userdata.splice(userindex, 1, { ...tempProduct, ...req.body });

  res.json({ type: "PATCH" });
};

exports.deleteUser = (req, res) => {
  const id = +req.params.id;
  const userindex = userdata.findIndex((p) => p.id === id);
  let tempProduct = userdata[userindex];
  userdata.splice(userindex, 1);

  res.json(tempProduct);
};
