const express = require('express');
const mongoose = require('mongoose')
const Product = require("./models/productModel")
const app = express()

//middleware to use json data in req body
app.use(express.json())

//to use form data in req body
app.use(express.urlencoded({ extended: false }))



app.get("/", (req, res) => {
    res.send("Hello")
})

app.get("/blog", (req, res) => {
    res.send("Hello blog, I'm Saicharan")
})


//get all products
app.get("/products", async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get single product
app.get("/products/:id", async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//update product
app.put("/products/:id", async(req, res) => {
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
})

//post product
app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

//delete product

app.delete("/products/:id", async(req, res) => {
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
})


mongoose.set("strictQuery", false)
mongoose.connect("mongodb+srv://saicharan:saicharan@myfirstcluster.n3irmrb.mongodb.net/Node-API?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to mongo db")
        app.listen(5000, () => console.log("Listening"))
    }).catch((eror) => {
        console.log(eror)
    })