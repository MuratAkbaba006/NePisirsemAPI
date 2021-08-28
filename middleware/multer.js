const multer=require('multer');

const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
      cb(null,Date.now()+"_"+file.originalname)
    }
  });

  const imageFilter = function(req, file, cb) {
    // Accept images only
    if ((!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/))||(!file.originalname.match(/\.(mp4|avi)$/))) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};  


module.exports=multer({storage:fileStorageEngine});