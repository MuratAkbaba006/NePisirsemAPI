var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');

const upload=require('../middleware/multer');
const multer=require('multer');



const cpupload=upload.fields([{
    name:'video',maxCount:1
},
{
    name:'image',maxCount:1
}

])
//modelin import edilmesi
const Meal=require('../models/Meal');
const Fav=require('../models/Fav');



router.post('/',cpupload,async (req, res, next) =>{
   //body içerisinde gönderilen veriler
  
    
   console.log(req.files['image'][0]);
   console.log(req.files['video'][0]);
    const {meal_name,time,cuisine,ingredients,recipe}=req.body;
    const image=req.files['image'][0].filename;
    const video=req.files['video'][0].filename;
    const image_path=`http://www.nepisirsemapp.com/${image}`;
    const video_path=`http://www.nepisirsemapp.com/${video}`;

   
          
    
    const meal=new Meal({
        name:meal_name,
        time,
        cuisine,
        ingredients,
        recipe,
        image:image_path,
        video:video_path
                
    })

  const promise=meal.save();
  
  promise.then((data)=>{
      console.log('burada hata olduğunu biliyorum');
      //res.sendFile('index.html');
      res.json({message:'Yemek ekleme işlemi başarılı'})  
    }).catch((err)=>{
      res.json(err);
  })
  
});

router.get('/',(req,res,next)=>{
    
    
    const promise=Meal.aggregate([
        {
            $lookup:{
                from:'favs',
                localField:'_id',
                foreignField:'mealId',
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
                    time:'$time',
                    cuisine:'$cuisine',
                    ingredients:'$ingredients',
                    recipe:'$recipe',
                    video:'$video',
                    image:'$image',
                    date:'$date',
                    
                    
                },
                favs:{
                    $push:'$data',
                    
                },
                
                
            }
        }
       
    ]);

    promise.then((meal)=>{
        console.log(meal);
        res.json(meal)
    }).catch((err)=>{
        res.json(err);
    })
})

router.get('/aggregate',(req,res,next)=>{
    
    const promise=Fav.aggregate([
        {
            $group:{
                _id:'$mealId',
                count:{$sum:1}
            }
        }
    ]).sort({count:-1})

    promise.then((meal)=>{
        console.log(meal);
        res.json(meal)
    }).catch((err)=>{
        res.json(err);
    })
})


router.get('/cuisine/:cuisine',(req,res,next)=>{
    const cuisineName=req.params.cuisine;
    const promise=Meal.aggregate([
    {
        $match:
        {
            cuisine:cuisineName
        }
      
    },
    {
        $sample:
        {
            size:3
        }
    }

]);

    promise.then((meal)=>{
        if(!meal)
        res.json({message:'not found any meal from this cuisine',status:404})

        res.json(meal);
    }).catch((err)=>{
        res.json(err);
    })
})

router.post('/ingredient',(req,res,next)=>{
    const {ingredientlist} = req.body;
    const promise=Meal.find({});
    promise.then((meal)=>{
        const length=meal.length;
        const ingredientlistlength=ingredientlist.length;
        const meals=[];
        var sayac=0;
        for(i=0;i<length;i++){
            sayac=0;
            for(j=0;j<ingredientlistlength;j++)
            {
                if(meal[i].ingredients.includes(ingredientlist[j]))
                {
                    sayac++
                    if(sayac==ingredientlistlength)
                    {
                        meals.push(meal[i]);
                        sayac=0;
                    }
                  
                }
            }
        }

        if(meals.length)
        res.json(meals);
        else
        res.json({message:'No meal were found that could be prepared with these ingredients'})
    }).catch((err)=>{
        res.json(err);
    })
});

router.get('/random',(req,res,next)=>{
    const promise=Meal.aggregate([
        {
            $match:{}
        },
        {
            $sample:{size:3}
        }
    ]);

    promise.then((e)=>{
        res.json(e)
    }).catch((err)=>{
        res.json(err);
    }) 

})

router.get('/pratic',(req,res,next)=>{
    
    const promise=Meal.aggregate([
        {
            $match:{
                time:{$lte:30}
            }
        },
        {
            $sample:{
                size:5
            }
        }
    
    ]).sort({time:1});

    promise.then((meal)=>{
    if(!meal)
    res.json({message:"not found"})    
    res.json(meal)

    }).catch((err)=>{
        res.json(err);
    })

})


router.get('/mostpopular',(req,res,next)=>{
    const promise=Meal.aggregate([
        {
            $match:{}
        },
        {
            $lookup:{
                from:'favs',
                localField:'_id',
                foreignField:'mealId',
                as:'data'

            }

        },
        {
            $group:{
                    
                    _id:{
                        _id:'$_id',
                        name:'$name',
                        time:'$time',
                        image:'$image',
                        cuisine:'$cuisine',
                        data:'$data'
                        
                    }
                    
            }

        }
    
    ]);
    

    //const promise=Meal.find({}).sort({favs:1}).limit(5);
    promise.then((meal)=>{
        if(!meal)
        {
        res.json({message:"not found"})
        }
        var favscount=[];
        meal.map((e)=>{
            console.log(e._id.data.length);
            favscount.push({meal:e,fav_count:e._id.data.length})
        })
        
        favscount=favscount.sort((a,b)=>a.fav_count>b.fav_count ? -1:1)
        res.json(favscount.slice(0,5).reverse())
    }).catch((err)=>{
        res.json(err);
    })
})

router.get('/newadded',(req,res,next)=>{
    const promise=Meal.find({}).sort({date:-1}).limit(5);
    promise.then((meal)=>{
        if(!meal)
        res.json({message:"not found"})

        res.json(meal.reverse());
    }).catch((err)=>{
        res.json(err);
    })
})


router.get('/:meal_id',(req,res,next)=>{
    const mealId=req.params.meal_id;
    const promise=Meal.findById(mealId);

    promise.then((meal)=>{
        if(!meal)
        next({message:'The meal was not found'});

        res.json(meal);
    }).catch((err)=>{
        res.json(err);
    })
})

router.put('/:meal_id',(req,res,next)=>{
    const mealId=req.params.meal_id;
    const promise=Meal.findByIdAndUpdate(
        mealId,
        req.body,
        {
            new:true
        }
    );

    promise.then((meal)=>{
        if(!meal)
        next({message:'The meal was not found'});

        res.json(meal);
    }).catch((err)=>{
        res.json(err);
    })
})

router.delete('/:meal_id',(req,res,next)=>{
    const mealId=req.params.meal_id;
    const promise=Meal.findByIdAndRemove(mealId);

    promise.then((meal)=>{
        if(!meal)
        next({message:'The movie was not found'});

        res.json(meal);
    }).catch((err)=>{
        res.json(err);
    })
})

module.exports = router;
