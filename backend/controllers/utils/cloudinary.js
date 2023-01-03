const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEYS, 
    api_secret: process.env.CLOUDINARY_SECRET_KEYS
  });

  module.exports= cloudinary;