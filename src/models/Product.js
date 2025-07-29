import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
 productName:{
        type: String,
        required : true
    },
    description: {
        type: String
    },
    display: {
        type: String
    },
    ram: {
        type: Number
    },
    gen:{
        type: Number
    },
    rom: {
        type: Number
    },
    brand:{
        type:String
    },
    use : {
        type :String,
        enum : ['GAMING','PROFESSIONAL','STUDENT','BUDGET']
    },
    price: {
        type : Number,
        required : true
    },
    stock : {
        type: Number,
        default: 0
    },
    imageUrl:{
        type : String
    },
    imageName:{
        type : String
    },
    featured:{
        type: Boolean,
        default: false
    },
    isActive:{
        type: Boolean,
        default : true
    },
    rating:{
        type: Number,
        default: 0
    },
    processor:{
        type: String,
        enum : ['INTEL','Ryzen']
    },

}, {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
