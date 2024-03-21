const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    return cb(null, './uploads');
  },
  filename: (req, file, cb)=> {
   return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
     storage: storage,
     fileFilter: (req,file,cb)=>{
        if(
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg'
        ){
            return cb(null,true);
        }else{
            return cb(null,false);
        }
     },
     limits:{
        fileSize: 1024*1024*10, // Max file size is 10MB
     }, 
    });

    module.exports = upload

