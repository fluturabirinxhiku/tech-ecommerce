const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the product name"],
      trim: true,
      maxLength: [150, "Product name cannot exceed 150 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter the product price"],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, "Please enter the product description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please select the category for this product"],
      enum: {
        values: [
          "Cameras",
          "Laptops & PCs",
          "Accessories",
          "Headphones",
          "TV, Video & Audio",
          "Phones & Tablets",
          "Gaming",
        ],
        message: "Please select the correct category for this product",
      },
    },
    brand: {
      type: String,
      required: [true, "Please enter the product brand"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter the product stock"],
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
