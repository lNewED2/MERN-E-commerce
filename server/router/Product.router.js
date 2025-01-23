const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");
const { upload, uploadToFirebase } = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/auth.middleware");

//http://localhost:5000/api/v1/product
router.product(
  "",
  authJwt.verifyToken,
  upload,
  uploadToFirebase,
  productController.createProduct
);
//http://localhost:5000/api/v1/product
router.get("", productController.getProduct);
//http://localhost:5000/api/v1/product/id
router.get("/:id", productController.getProductById);
//http://localhost:5000/api/v1/product/id
router.delete("/:id", authJwt.verifyToken, productController.getProductById);
//http://localhost:5000/api/v1/product/id
router.put(
  "/:id",
  authJwt.verifyToken,
  upload,
  uploadToFirebase,
  productController.updateProduct
);
//http://localhost:5000/api/v1/author/id
router.get("/author/:id", productController.getProductByAuthor);
module.exports = router;