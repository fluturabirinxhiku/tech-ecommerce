const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MONGODB CONNECTED: " + conn.connection.host);
  } catch (error) {
    console.log("MONGODB ERROR: " + error);
  }
};
