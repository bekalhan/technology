const jwt = require("jsonwebtoken");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const sharp = require('sharp');

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

const profilePhotoResize = async (req,res,next)=>{
    if(!req.file) return next();
    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
    await sharp(req.file.buffer).resize(250,250).toFormat('jpeg').jpeg({quality:90}).toFile(path.join(`public/images/profile/${req.file.filename}`));
    next();
}

////

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
  //jwt.decode()
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    if (req.user.role !== "super-admin") {
      return res.status(400).json({ message: "Admin access denied" });
    }
  }
  next();
};

exports.superAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "super-admin") {
    return res.status(200).json({ message: "Super Admin access denied" });
  }
  next();
};