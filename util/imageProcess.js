const fs=require('fs');
const sharp=require('sharp');



const imageProcess=async(imageisim,id)=>{
    fs.access('../uploads/images',(err)=>{
        if(err){
            fs.mkdirSync('../uploads/images',{recursive:true},err=>{
                console.log('hata')
            })
        }
    });

    try {
    const formattedName=imageisim.split(' ').join('-');
    var fileName=`${id}-${formattedName}`
    //await sharp(req.file.buffer).resize({width:615,height:350}).toFile(`../uploads/images/${fileName}`);
    } catch (error) {
        console.log('Error',error)
    }
    
    return fileName;
    
}

module.exports=imageProcess