const multer = require('multer');
const sharp = require('sharp');
const path = require("path");

const multerStorage = multer.memoryStorage();

const multerFilter = (req,file,cb) =>{
    // check file type 
    if(file.mimetype.startsWith("image")){
        cb(null,true);
    }else{
        cb({
            message : "Unsupported file format"
        },false);
    }
}


const PhotoUpload = multer({
    storage :multerStorage,
    fileFilter : multerFilter,
    limits :{fileSize:1000000}
});


//profile image resize

const productPhotoResize = async (req,res,next)=>{
    if(!req.file) return "error";
    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
    await sharp(req.file.buffer).resize(250,250).toFormat('jpeg').jpeg({quality:90}).toFile(path.join(`public/images/products/${req.file.filename}`));
    next();
}

//post image resize
/*
const postPhotoResize = async (req,res,next)=>{
    if(!req.file) return next();
    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
    await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:90}).toFile(path.join(`public/images/posts/${req.file.filename}`));
    next();
}*/

module.exports = {PhotoUpload,productPhotoResize};