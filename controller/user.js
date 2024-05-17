
const fs = require("fs");
const path = require('path');

const model = require('../model/user');
const User = model.User;

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

exports.createUser = (req, res) => {

  const user = new User(req.body);
  user.save((err, doc)=>{
    console.log({err,doc});
    if(err){
      res.status(400).json(err);
    }else{
      res.status(200).json(doc);
    }
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
