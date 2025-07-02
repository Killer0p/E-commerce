import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      // required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: True,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
