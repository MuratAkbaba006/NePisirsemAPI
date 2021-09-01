var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const upload=require('../middleware/multer');
const User=require('../models/User');
/* GET users listing. */
router.get('/:user_id', (req, res, next) =>{

  const user_id=req.params.user_id;

  const promise=User.aggregate([
    {
      $match:{
        '_id':mongoose.Types.ObjectId(user_id)
      }
    },
    {
      $lookup:{
        from:'favs',
        localField:'_id',
        foreignField:'userId',
        as:'data'
      }
    },
    {
      $unwind:{
        path:'$data',
        preserveNullAndEmptyArrays:true
      }
    },
    {
      $group:{
        _id:{
          _id:'$_id',
          name:'$name',
          email:'$email',
          profile_image:'$profile_image'
        },
        favs:{
          $push:'$data'
        }
      }
    }
  ]);

  promise.then((user)=>{
    res.json(user);
  }).catch((err)=>{
    res.json(err);
  })
});

router.put('/mail_update/:user_id',(req,res,next)=>{
  
  const userId=req.params.user_id;
  const promise=User.findByIdAndUpdate(
    userId,
    req.body,
    {
      new:true
    }
  );

  promise.then((user)=>{
    if(!user)
    next({message:'The user was not found'});

    res.json({user:user,message:'Email Adresi Başarıyla Güncellendi'})
  }).catch((err)=>{
    res.json(err);
  })
})


router.put('/password_update/:user_id',(req,res,next)=>{
  const userId=req.params.user_id;
  const {oldpassword,password,repassword}=req.body;

  User.findOne({_id:userId},(err,user)=>{
    if(err)
    throw err

    if(!user)
    {
      res.json({message:'User Not Found'})
    }
    else{
      bcrypt.compare(oldpassword,user.password).then((result)=>{
        if(!result)
        {
          res.json({message:'Parola Bilgisi Hatalı'})
        }
        else{
          if(password !== repassword)
          {
            res.json({message:'Girilen Şifreler Eşleşmemektedir'});
            res.end()
          }
          else{
           bcrypt.hash(password,10).then((hash)=>{
             
            const promise=User.findByIdAndUpdate(
              userId,
              {password:hash},
              { new:true}
            )
            return promise
        
            })
            .then((user)=>{
              if(!user)
              next({message:'The user was not found'});
        
              res.json({user:user,message:'Parola güncelleme işlemi başarılı'})
            })
            .catch((err)=>{
              res.json(err)
            })
           
        }
        }
      })
    }
  })
 
})

router.put('/pp_update/:user_id',upload.single('profile_image'),(req,res,next)=>{
  const userId=req.params.user_id;
  const profile_image=req.file;
  const image_path=`https://nepisirsemapi.herokuapp.com/${profile_image.filename}`
  const promise=User.findByIdAndUpdate(
    userId,
    {
      profile_image:image_path
    },
    {
      new:true
    }
  );

  promise.then((user)=>{
    if(!user)
    next({message:'The user was not found'});

    res.json({user:user,message:'Profil Fotoğrafı Başarıyla Güncellendi'})
  }).catch((err)=>{
    res.json(err);
  })


})




module.exports = router;
