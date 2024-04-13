const mongoose = require("mongoose");

const uri = "mongodb://0.0.0.0:27017/backend";
const dbName = "login-api";

async function connectToDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

module.exports = { connectToDB };
