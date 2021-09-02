const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = new Schema({

    name:{
        type:String,
        required:false,
        maxLength:50,
        minLength:3
    },
    time:{
        type:Number,
        required:false,
        max:5000,
        min:5
    },
    cuisine:{
        type:String,
        required:false,
        max:75,
        min:2
    },
    ingredients:{
        type:Array,
        required:true
    
    },
    recipe:{
        type:String,
        required:false
    },
    video:{
        type:String,
        required:false
    },
    image:{
        type:String,
        required:false
    },
    date:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model('meal',MealSchema);