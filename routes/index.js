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
  const {name,email,password,profile_image}=req.body;

  const verifymail=email.toLowerCase();
  
  bcrypt.hash(password,10).then((hash)=>{

    const user=new User({
      name,
      email:verifymail,
      password:hash,
      profile_image
    })
  
    const promise=user.save();
  
    promise.then((user)=>{
      const payload={
        userId:user._id,    
        email
      };
      const token=jwt.sign(payload,req.app.get('api_secret_key'),{
        expiresIn:72000 //dk cinsinden geçerlilik süresi
      })

      res.json({
        status:true,
        token
      })
    }).catch((err)=>{
      res.json(err);
    })

  })
 
})

router.post('/login',(req,res,next)=>{
  const {email,password}=req.body;
  const verifyemail=email.toLowerCase()
  const userId=0;
  User.findOne({
    email:verifyemail
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
            userId:user._id,
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
