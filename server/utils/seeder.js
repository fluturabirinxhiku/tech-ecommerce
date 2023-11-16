const Product = require("../models/productModel");
const { connectDB } = require("../config/db");
const dotenv = require("dotenv");
const products = require("../data/products");

dotenv.config();
connectDB();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products have been deleted");
    await Product.insertMany(products);
    console.log("Products have been added successfully");
    process.exit();
  } catch (error) {
    console.log("SEEDER ERROR: " + error);
    process.exit();
  }
};

seedProducts();
