const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload images to cloudinary
const cloudinaryUpload = async (imagePath) => {
  try {
    const data = await cloudinary.uploader.upload(imagePath, {
      resource_type: "auto",
    });
    return data;
  } catch {
    console.log("cloudinary upload error");
  }
};
// Delete images from cloudinary
const cloudinaryDelete = async (puplicId) => {
  try {
    const data = await cloudinary.uploader.destroy(puplicId);
    return data;
  } catch {
    console.log("cloudinary Delete error");
  }
};

module.exports = { cloudinaryUpload, cloudinaryDelete };
