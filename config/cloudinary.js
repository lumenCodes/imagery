const cloudinary = require('cloudinary').v2;

cloudinary.config({
  
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  
})

/**
 * ******************************upload an image****************
 */
exports.uploadImage = async (file) => {
  try {
    const response = await cloudinary.uploader.upload(file, {
      resource_type: 'image',
      folder: 'imagery/images'
    });

    return response;
  } catch (error) {
    throw new Error(`From Cloudinary: ${error}`);
  }
};