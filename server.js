require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const productRoute = require("./routes/productRoute")
const app = express()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 5000


//middleware to use json data in req body
app.use(express.json())

//to use form data in req body
app.use(express.urlencoded({ extended: false }))

//routes
app.use("/api/products", productRoute)



app.get("/", (req, res) => {
    res.send("Hello")
})

app.get("/blog", (req, res) => {
    res.send("Hello blog, I'm Saicharan")
})





mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to mongo db")
        app.listen(PORT, () => console.log("Listening"))
    }).catch((eror) => {
        console.log(eror)
    })