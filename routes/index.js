var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const User=require('../models/User');

router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
});

router.post('/register',(req,res,next)=>{
  const {name_surname,email,password,profile_image}=req.body;

  bcrypt.hash(password,10).then((hash)=>{

    const user=new User({
      name_surname,
      email,
      password:hash,
      profile_image
    })
  
    const promise=user.save();
  
    promise.then((user)=>{
      res.json(user);
    }).catch((err)=>{
      res.json(err);
    })

  })
 
})

router.post('/login',(req,res,next)=>{
  const {email,password}=req.body;

  User.findOne({
    email
  },(err,user)=>{
    if(err)
    throw err

    if(!user)
    {
      res.json({message:'user not found'});
    }
    else{
      bcrypt.compare(password,user.password).then((result)=>{
        if(!result)
        {
          res.json({message:'email or password wrong'})
        }
        else{
          const payload={
            
            email
          };
          const token=jwt.sign(payload,req.app.get('api_secret_key'),{
            expiresIn:72000 //dk cinsinden geçerlilik süresi
          })

          res.json({
            status:true,
            token
          })

        }
      })
    }
  })
})


module.exports = router;
