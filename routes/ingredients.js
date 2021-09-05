var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');

const Ingredient=require('../models/Ingredient');

router.post('/add',(req,res,next)=>{
    const {name}=req.body;

    const ingredient = new Ingredient({
        name:name
    });

    const promise=ingredient.save();

    promise.then((data)=>{

        res.json({message:'Malzeme ekleme işlemi başarılı',data:data})
    }).catch((err)=>{
        res.json(err);
    })
});

router.get('/getlist',(req,res,next)=>{
    const promise=Ingredient.find({});

    promise.then((ingredients)=>{
        if(!ingredients)
        res.json({message:'not found'})

        res.json(ingredients)
    }).catch((err)=>{
        res.json(err);
    })
})

module.exports=router