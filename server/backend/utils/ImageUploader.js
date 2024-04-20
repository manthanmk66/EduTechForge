const cloudinary = require("cloudinary").v2;

exports.uploadImageCloudinary = async (file, folder, height, quality) => {
  try {
    const options = { folder };
    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }
    options.resource_type = "auto";

    const result = await cloudinary.uploader.upload(file, options);
    return result;
  } catch (error) {
    // Handle error
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};
