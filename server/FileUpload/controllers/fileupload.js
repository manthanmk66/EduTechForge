const File = require("../models/File");

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
