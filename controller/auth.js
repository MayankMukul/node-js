
const jwt = require('jsonwebtoken');

const model = require('../model/user');
const User = model.User;
const path = require('path')
const fs = require('fs');
const privatekey = fs.readFileSync(path.resolve(__dirname,'../private.key'),'utf-8');

exports.createUser = async (req, res) => {
    const user = new User(req.body);
    let token = jwt.sign({email:req.body.email}, privatekey, {algorithm:'RS256'})
    user.token = token;
    await user.save().then(doc=>{
      console.log(doc)
      res.status(200).json(doc)
    }).catch(err=>{
      res.status(400).json(err);
    })
    
  };