require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const productRoute = require("./routes/productRoute")
const errorMiddleware = require("./middleware/errorMiddleware")
const cors = require('cors')

const app = express()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 5000

//allow fontend to access these api's otherwise we'll get cors error
app.use(cors())


//to allow only few domains to access
// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }


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

app.use(errorMiddleware)



mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to mongo db")
        app.listen(PORT, () => console.log("Listening"))
    }).catch((eror) => {
        console.log(eror)
    })