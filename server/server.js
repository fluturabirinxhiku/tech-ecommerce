const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const { connectDB } = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const couponRoutes = require("./routes/couponRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", paymentRoutes);
app.use("/api", orderRoutes);
app.use("/api", couponRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;
