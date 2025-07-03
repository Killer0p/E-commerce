
import productServices from "../Services/productServices.js";

const createProduct = async (req, res) => {
  try {
    const product = req.body;

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
    res.status(501).send("Error occurred while creating product");
  }
};

export { createProduct };
