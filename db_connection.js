const mongoose = require("mongoose");
require("dotenv").config()

class Database {
  constructor() {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("database connected");
      })
      .catch((err) => {
        console.log("databse not connected", err);
      });
  }
}

module.exports = new Database();
