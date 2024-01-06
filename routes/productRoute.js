const express = require("express");
const router = express.Router();
const Product = require("../models/productModel")
const { getProducts, getSingleProduct, updateProduct, postProduct, deleteProduct } = require("../controllers/productController")


//get all products
router.get("/", getProducts)

//get single product
router.get("/:id", getSingleProduct)


//update product
router.put("/:id", updateProduct)

//post product
router.post('/', postProduct)

//delete product

router.delete("/:id", deleteProduct)


module.exports = router;