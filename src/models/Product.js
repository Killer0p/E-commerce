import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    gen :{
      type: Number,
    },
    brand :{
      type: String,
    },
    use : {
      type: String,
      enum: ['GAMING', 'PROFESSIONAL', 'STUDENT', 'PERFORMANCE', 'BUDGET',]
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
