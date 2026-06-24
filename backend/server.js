const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors({
    origin: "*"
}));

app.use(express.json());


// Import Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");


// API Routes

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);


// Home Route

app.get("/", (req,res)=>{

    res.json({

        message:"E-Commerce Backend Server Running Successfully"

    });

});


// Order API

app.post("/api/orders",(req,res)=>{

    const order = req.body;

    res.status(201).json({

        message:"Order placed successfully",

        order:order

    });

});



// Error Handling Middleware

app.use((err,req,res,next)=>{

    console.error(err);

    res.status(500).json({

        message:"Something went wrong"

    });

});



// Server Start

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});