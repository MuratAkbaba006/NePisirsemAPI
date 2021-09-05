const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const IngredientsSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxLength:30,
        minLength:2
    }
})

module.exports=mongoose.model('ingredients',IngredientsSchema)