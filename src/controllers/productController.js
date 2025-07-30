import productServices from "../Services/productServices.js";

const createProduct = async (req, res) => {
  if (!req.file) {
    throw new error("Please upload an image");
  }
  console.log(req.file);
  const filePath = req.file.path;
  const fileName = req.file.filename;

  // return res.send(req.file);
  try {
    const product = req.body;
    console.log(req.body);
    product.imageUrl = filePath;
    product.imageName = fileName;
    console.log(product);
    if (!product) {
      return res.status(400).send("Please fill all the fields");
    }

    if (!product.price) {
      return res.status(400).send("Price is required");
    }

    const data = await productServices.createProduct(product);

    // ✅ If product creation fails
    if (!data) {
      return res.status(500).send("Failed to create product");
    }

    // ✅ Send success response properly when product is created
    res.status(201).json({
      message: "Product created successfully",
      product: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(501).send(error.message);
  }
};

// Get all products
const getAllProduct = async (req, res) => {
  try {
    console.log(req.query);

    const data = await productServices.getAllProduct(req.query);
    res.status(200).json({
      message: "Products fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error occurred while fetching products");
  }
};

// Get product By Id
const getProductById = async (req, res) => {
  try {
    if (!req.params.id) {
      return new Error("Product ID is required");
    }
    const id = req.params.id;
    const data = await productServices.getProductById(id);

    res.status(200).json({
      message: "Product fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error occurred while fetching product");
  }
};

// Delete product by ID

const deleteProductById = async (req, res) => {
  try {
    if (!req.params.id) {
      return new Error("Product ID is required");
    }
    const id = req.params.id;
    const data = await productServices.deleteProductById(id);

    res.status(200).json({
      message: "Product delete successfully",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error occurred while deleting product");
  }
};

// Update product By ID
const updateProductById = async (req, res) => {
  try {
    if (req.file) {
      // console.log(req.body)
      const newFileilePath = req.file.path;
      const newFileName = req.file.filename;
      req.body.imageName = newFileName;
      req.body.imageUrl = newFileilePath;
    }
    const id = req.params.id;
    const product = req.body;

    const data = await productServices.updateProductById(id, product);
    res.status(200).json({
      message: "Product updated successfully",
      product,
      data,
    });
  } catch (error) {
    console.error("error.message");
    res.status(400).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProductById,
};
