import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import constant from "../config/constant.js";

// Configuration
cloudinary.config({
  cloud_name: constant.CLOUD_NAME,
  api_key: constant.API_KEY,
  api_secret: constant.API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Images",
  },
});

const uploads = multer({ storage: storage });

export { cloudinary, uploads };
