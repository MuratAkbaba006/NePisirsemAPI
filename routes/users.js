var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');

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
          name_surname:'$name_surname',
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

module.exports = router;
