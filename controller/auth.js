
const jwt = require('jsonwebtoken');

const model = require('../model/user');
const User = model.User;


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