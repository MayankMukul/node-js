
const fs = require("fs");
const path = require('path');

const model = require('../model/user');
const User = model.User;

const jwt = require('jsonwebtoken');

// const data = JSON.parse(fs.readFileSync(  path.resolve(__dirname,"../data.json")));
// const userdata = data.users;
// console.log(productdata)

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const id = +req.params.id;
  const user = await User.findById(id);
  res.json(user);
};

exports.createUser = async (req, res) => {

  const user = new User(req.body);
  let token = jwt.sign({email:req.body.email}, 'shhhhh')
  user.token = token;
  await user.save().then(doc=>{
    console.log(doc)
    res.status(200).json(doc)
  }).catch(err=>{
    res.status(400).json(err);
  })
  
};

exports.replaceUser = async (req, res) => {
  const id = +req.params.id;

  try{
    const doc = await User.findOneAndReplace({_id:id},req.body, {new:true})
    res.status(200).json(doc);
  }catch{
    console.log(err)
    res.status(400).json(err);
  }
 
};

exports.updateUser = async (req, res) => {
  const id = +req.params.id;
  try{
    const doc = await User.findOneAndUpdate({_id:id},req.body, {new:true})
    res.status(200).json(doc);
  }
  catch(err){
    console.log(err)
    res.status(400).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  const id = +req.params.id;
  try{
    const doc = await User.findOneAndDelete({_id:id})
    res.status(200).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
    }

};
