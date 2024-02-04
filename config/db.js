const mongoose = require("mongoose");

const connectDB = async () => {
  // MongoDB
  try {
    const line = mongoose.connect(process.env.MONGO_URI).then((res) =>
      console.log(`MongoDB Connected: 
        HOST:${res.connections[0].host}
        DB: ${res.connections[0].name}`)
    );
  } catch (error) {
    console.log("error>>>>>", error);
  }
};

module.exports = connectDB;
