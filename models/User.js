const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:5
    },
    profile_image:{
        type:String,
        default:"https://cdn0.iconfinder.com/data/icons/clearicons/789/anonim-512.png"
    }

})


module.exports=mongoose.model('user',UserSchema);