require("dotenv").config();
const express = require("express");
const { connectDb } = require("./config/connect");

//making express as amethod
const app = express();

PORT = process.env.PORT || 3500;

// MIDDLEWARE
app.use(express.json());

// Blog Routes
const blog = require("./routes/blog");
app.use("/api/v1", blog);

// Creating Server
const start = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`server is running on the http://localhost:${PORT}`);
  });
};

app.get("/", (req, res) => {
  res.send("This is my Home Page");
});

start();
