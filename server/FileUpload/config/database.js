const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      UseNewUrlParser: true,
      UseUnifiedTopology: true,
    })
    .then(console.log("DB Connection Successfull!!"))
    .catch((error) => {
      console.log("DB Connection Issues", error.message);
      console.error(error);
      process.exit(1);
    });
};
