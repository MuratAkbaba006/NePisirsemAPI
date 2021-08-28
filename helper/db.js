const mongoose=require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://admin:Admin.123@cluster0.iyuap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});
    mongoose.connection.on('open',()=>{
        console.log("MongoDB bağlantısı sağlandı");
    });

    mongoose.connection.on('error',(err)=>{
        console.log('MongoDB bağlantısı kurulamadı',err)
    });

    mongoose.Promise=global.Promise;
}