const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const cors  = require('cors');


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({useTempFiles: true}));

// config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({
        path:"./config/.env"
    })}

// Route imports
const auth = require("./routes/auth");
const admin = require("./routes/admin/auth");
const category = require("./routes/category");
const product = require("./routes/product");
const cart = require("./routes/cart");
const adress = require("./routes/address");
const order = require("./routes/order");

app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api",auth);
app.use("/api",admin);
app.use("/api",category);
app.use("/api",product);
app.use("/api",cart);
app.use("/api",adress);
app.use("/api",order);




module.exports = app