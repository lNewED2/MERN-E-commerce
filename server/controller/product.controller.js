const ProductModel = require("../model/Product");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.createProduct = async (req, res) => {
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "Create a new product"
    #swagger.description = 'Endpoint to create a new product'
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['file'] = {
       in:'formData',
       type:'file',
       required:true,
       description:'Image to upload to Firebase Storage and get its url'
    }
    #swagger.requestBody = {
       required:true,
       content:{
         "multipart/form-data":{
           schema:{
             $ref:"#components/schemas/NewProduct"
           }
         }
       }
    }
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/ProductResponse"},
       description: "Product created successfully"
    }
   */
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }
  const firebaseUrl = req.file.firebaseUrl;
  const { name, description, category, price } = req.body;
  if (!name || !description || !category || !price) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    const ProductDoc = await ProductModel.create({
      name,
      description,
      category,
      image: firebaseUrl,
      price,
    });
    res.json(ProductDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to create Product" });
  }
};

exports.getProduct = async (req, res) => {
  /**
  #swagger.tags = ['Product']
  #swagger.summary = "Get all products"
  #swagger.description = 'Endpoint to retrieve all products'
  #swagger.responses[200] = {
    description: "List of all products",
    schema: { "$ref": "#components/schemas/ProductResponse" }
  }
  #swagger.responses[404] = {
    description: "No products found"
  }
*/

  try {
    const Product = await ProductModel.find();
    //SELECT * FROM Product WHERE Product.author =USER._id
    if (!Product) {
      return res.status(404).json({ message: "No Product found" });
    }
    res.json(Product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};

exports.getProductById = async (req, res) => {
  /**
  #swagger.tags = ['Product']
  #swagger.summary = "Delete a product"
  #swagger.description = 'Delete a product by its ID'
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    description: 'Product ID',
    type: 'string'
  }
  #swagger.responses[200] = {
    description: "Product deleted successfully"
  }
  #swagger.responses[404] = {
    description: "Product not found"
  }
*/

  const { id } = req.params;
  try {
    const ProductDoc = await ProductModel.findById(id);
    if (!ProductDoc) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.json(ProductDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  /**
  #swagger.tags = ['Product']
  #swagger.summary = "Delete a product"
  #swagger.description = 'Delete a product by its ID'
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    description: 'Product ID',
    type: 'string'
  }
  #swagger.responses[200] = {
    description: "Product deleted successfully"
  }
  #swagger.responses[404] = {
    description: "Product not found"
  }
*/

  const { id } = req.params;
  try {
    const ProductDoc = await ProductModel.findById(id);
    if (!ProductDoc) {
      res.status(404).send({ message: "You can not delete Product" });
      return;
    }
    await ProductDoc.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "delete Product error" });
  }
};

exports.updateProduct = async (req, res) => {
  /**
  #swagger.tags = ['Product']
  #swagger.summary = "Update a product"
  #swagger.description = 'Update product details by ID'
  #swagger.consumes = ['multipart/form-data']
  #swagger.parameters['file'] = {
    in:'formData',
    type:'file',
    required:false,
    description:'Image to upload to Firebase Storage'
  }
  #swagger.requestBody = {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          $ref: "#components/schemas/NewProduct"
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "Product updated successfully",
    schema: { "$ref": "#components/schemas/ProductResponse" }
  }
  #swagger.responses[400] = {
    description: "Missing required fields"
  }
  #swagger.responses[404] = {
    description: "Product not found"
  }
*/

  const { id } = req.params;
  if (!id) return res.status(404).json({ message: "Product not provided" });

  try {
    const ProductDoc = await ProductModel.findById(id);
    if (!ProductDoc) {
      res.status(404).send({ message: "You can not update Product" });
      return;
    }

    const { name, category, description, price } = req.body;
    if (!name || !category || !description || !price) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    ProductDoc.name = name;
    ProductDoc.category = category;
    ProductDoc.description = description;
    ProductDoc.price = price;
    if (req.file) {
      const path = req.file.firebaseUrl;
      ProductDoc.image = path;
    }
    await ProductDoc.save();
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "update Product error" });
  }
};

exports.getProductByAuthor = async (req, res) => {
  /**
  #swagger.tags = ['Product']
  #swagger.summary = "Get products by author"
  #swagger.description = 'Retrieve all products created by a specific author'
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    description: 'Author ID',
    type: 'string'
  }
  #swagger.responses[200] = {
    description: "List of products by author",
    schema: { "$ref": "#components/schemas/ProductResponse" }
  }
  #swagger.responses[404] = {
    description: "Author not found"
  }
*/

  const { id } = req.params;
  try {
    const ProductDoc = await ProductModel.find({ author: id }).populate(
      "author",
      ["username"]
    );
    if (!ProductDoc) {
      return res.status(404).send({ message: "author not found" });
    }
    res.json(ProductDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};