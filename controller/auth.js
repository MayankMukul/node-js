
const jwt = require('jsonwebtoken');

const model = require('../model/user');
const User = model.User;
const path = require('path')
const fs = require('fs');
const bcrypt = require('bcrypt');
const privatekey = fs.readFileSync(path.resolve(__dirname,'../private.key'),'utf-8');

exports.signUp = async (req, res) => {
    const user = new User(req.body);
    const hash = bcrypt.hashSync(req.body.password, 10);
    user.password = hash;

    let token = jwt.sign({email:req.body.email}, privatekey, {algorithm:'RS256'})
    user.token = token;
    await user.save().then(doc=>{
      console.log(doc)
      res.status(200).json(doc)
    }).catch(err=>{
      res.status(400).json(err);
    })
    
  };

  exports.login = async (req, res)=>{
    try {
      const doc = await User.findOne({ email: req.body.email });
      const isAuth = bcrypt.compareSync(req.body.password, doc.password);
      if (isAuth) {
        let token = jwt.sign({ email: req.body.email }, privatekey, {
          algorithm: "RS256",
        });
        doc.token = token;
        doc.save().then(()=>{
          res.status(200).json({token})
        }).catch(err=>{
          res.status(400).json(err)
        })
        
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      res.status(401).json(err);
    }
  }