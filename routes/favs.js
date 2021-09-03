var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');

const Fav=require('../models/Fav');

router.post('/',(req,res,next)=>{
    const {userId,mealId}=req.body;
    const fav=new Fav({
        userId,
        mealId
    })

    const promise=fav.save();

    promise.then((data)=>{
        res.json(req.body);
    }).catch((err)=>{
        res.json(err);
    })
});

router.get('/getfavs/:meal_id',(req,res,next)=>{
    const {meal_id} = req.params;
    const promise=Fav.find({mealId:meal_id})
   
    promise.then((meal)=>{
        if(!meal)
        next({message:'not found any meal from this cuisine'})

        res.json(meal);
    }).catch((err)=>{
        res.json(err);
    })
})

router.get('/getfavsforuser/:user_id',(req,res,next)=>{
    const {user_id} = req.params;
    

    const promise=Fav.aggregate([
        {
            $match:{
                userId:mongoose.Types.ObjectId(user_id)
            }
        },
        {
           $lookup:{
               from:'meals',
               localField:'mealId',
               foreignField:'_id',
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
                    userId:'$userId',
                    mealId:'$mealId'
                },
                favs:{
                    $push:'$data'
                }
            }
        }

    ])

    promise.then((as)=>{
        res.json(as)
    }).catch((err)=>{
        res.json(err)
    })
})


router.delete('/:fav_id',(req,res,next)=>{

    const {fav_id}=req.params;
    console.log(fav_id);
    const promise = Fav.findByIdAndRemove(fav_id);

    promise.then((fav)=>{
        if(!fav)
        next({message:'This fav_id is has not been'})

        res.json(fav);
    }).catch((err)=>{
        res.json(err);
    })
})

module.exports = router;