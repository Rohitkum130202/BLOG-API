const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDb = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Connected to Database");
};
