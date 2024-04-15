//App create

const express = require("express");
const app = express();

//Find Out PORT

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//Middleware

app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload());

//Connect To DB

const db = require("./config/database");
db.connect();

//Connect to Cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//Api Routes
const upload = require("./routes/FileUpload");
app.use("/api/v1/upload", upload);

//Activatr Server
app.listen(PORT, () => {
  console.log(`App is Running at ${PORT}`);
});
