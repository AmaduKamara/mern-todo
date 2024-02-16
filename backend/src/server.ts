import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
