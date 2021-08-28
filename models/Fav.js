const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const FavsSchema = new Schema({
    
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    mealId:{
        type:Schema.Types.ObjectId,
        required:true
    }

})

module.exports=mongoose.model('favs',FavsSchema);