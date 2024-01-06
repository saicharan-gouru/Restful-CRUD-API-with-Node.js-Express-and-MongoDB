const Product = require("../models/productModel")

const getProducts = async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getSingleProduct = async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProduct = async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        //when we cant find product in db
        if (!product) {
            return res.status(404).json({ message: "Cannot find product with given id" })
        }
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const postProduct = async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(400).json({ message: "Cannot find product with given id" })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}






module.exports = {
    getProducts,
    getSingleProduct,
    updateProduct,
    postProduct,
    deleteProduct
}