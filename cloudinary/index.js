const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  //pass in cloudinary object you just configured
  cloudinary,
  params: {
    folder: 'YelpCamp', //specify folder to store in
    allowedFormats: ['jpeg', 'png', 'jpg']
  }
});


module.exports = {
  cloudinary,
  storage
};

