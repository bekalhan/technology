const app = require("./app");
const cloudinary = require("cloudinary");

// config
if(process.env.NODE_ENV!=="PRODUCTION"){
require("dotenv").config({
    path:"./config/.env"
})}

// connect database
require('./db/Database');


// create server
const server = app.listen(process.env.PORT,() =>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})


