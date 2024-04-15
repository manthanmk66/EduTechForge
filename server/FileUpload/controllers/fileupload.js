const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localFileUpload ---> handlebar Function
exports.localFileUpload = async (req, res) => {
  try {
    // Fetch file
    const file = req.files.file;
    console.log("File Imported -->", file);

    // Create Path where file need to be stored on server

    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    // Add file to the move function
    file.mv(path, (err) => {
      if (err) {
        // Handle error if file movement fails
        console.error("Error occurred while moving file:", err);
        res.status(500).json({
          success: false,
          message: "Error occurred while moving file",
        });
      } else {
        // If file movement is successful, send success response
        res.json({
          success: true,
          message: "Local File Upload Successfully",
        });
      }
    });
  } catch (error) {
    // Catch and log any unexpected errors
    console.error("Unexpected error occurred:", error);
    res.status(500).json({
      success: false,
      message: "Unexpected error occurred",
    });
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  console.log("temp file path", file.tempFilePath);

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload hadnler
exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //Validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type:", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // Supported File Format
    console.log("Uploading to EduTechForge");
    const response = await uploadFileToCloudinary(file, "EduTechForge");
    console.log(response);

    //Save Entry to db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfully Uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//video upload  handler

exports.videoUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;

    //Validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type:", fileType);

    
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    //File Format is Supported
    console.log("Uploading to EduTechForge");
    const response = await uploadFileToCloudinary(file, "EduTechForge");
    console.log(response);

    //Save entry to DB
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Video Successfully Uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//imageSizeReducer

exports.imageSizeReducer = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //Validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type:", fileType);

    
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    //File Format is Supported
    console.log("Uploading to EduTechForge");
   
    const response = await uploadFileToCloudinary(file, "EduTechForge", 90);
    console.log(response);

    //Save Entry in DB
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfully Uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
