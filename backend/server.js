const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.use(cors());

app.use(express.json());


const JWT_SECRET = "ecommerce_secret_key";

// Middleware
app.use(cors());
app.use(express.json());


// Home Route
app.get("/", (req,res)=>{
    res.json({
        message:"E-Commerce Backend Server Running Successfully"
    });
});

app.get("/api/products", async (req,res)=>{

    try{

        const products = await prisma.product.findMany();

        res.json(products);

    }
    catch(error){

console.log(error);

res.status(500).json({
error:error.message
});

}

});

app.get("/api/products/:id", async(req,res)=>{

    try{

        const product = await prisma.product.findUnique({

            where:{
                id:Number(req.params.id)
            }

        });


        res.json(product);

    }
    catch(error){

console.log(error);

res.status(500).json({
error:error.message
});

}

});

app.post("/api/products", async(req,res)=>{

    try{

        const product = await prisma.product.create({

            data:req.body

        });


        res.status(201).json(product);

    }
    catch(error){

console.log(error);

res.status(500).json({
error:error.message
});

}

});

// UPDATE PRODUCT (PUT)

app.put("/api/products/:id", async (req, res) => {

    try {

        const product = await prisma.product.update({

            where: {
                id: Number(req.params.id)
            },

            data: req.body

        });


        res.json({
            message: "Product updated successfully",
            product: product
        });


    }
    catch(error){

console.log(error);

res.status(500).json({
error:error.message
});

}

});

app.delete("/api/products/:id", async(req,res)=>{

    try{

        const product = await prisma.product.delete({

            where:{
                id:Number(req.params.id)
            }

        });


        res.json({
            message:"Product deleted successfully",
            product:product
        });


    }
    catch(error){

console.log(error);

res.status(500).json({
error:error.message
});

}

});

// Product GET API
app.get("/api/products",(req,res)=>{

    const products=[
        {
            id:1,
            name:"Gaming Laptop",
            category:"Electronics",
            price:75000
        },
        {
            id:2,
            name:"Smartphone",
            category:"Electronics",
            price:30000
        },
        {
            id:3,
            name:"Men Shirt",
            category:"Fashion",
            price:1500
        }
    ];


    res.json(products);

});

// Product POST API
app.post("/api/products", async(req,res)=>{

    try{

        const product = await prisma.product.create({
            data:req.body
        });

        res.status(201).json(product);

    }
    catch(error){

console.log(error);

res.status(500).json({
error:error.message
});

}

});



// Order API
app.post("/api/orders",(req,res)=>{

    const order=req.body;

    res.status(201).json({
        message:"Order placed successfully",
        order:order
    });

});



// User Register API
app.post("/api/register",(req,res)=>{

    const user=req.body;

    res.status(201).json({
        message:"User Registered Successfully",
        user:user
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

// REGISTER USER

app.post("/api/register", async(req,res)=>{


    try{


        const {
            name,
            email,
            password
        } = req.body;



        const existingUser =
        await prisma.user.findUnique({

            where:{
                email:email
            }

        });



        if(existingUser){

            return res.status(400).json({

                message:"User already exists"

            });

        }



        const hashedPassword =
        await bcrypt.hash(password,10);



        const user =
        await prisma.user.create({

            data:{

                name:name,

                email:email,

                password:hashedPassword

            }

        });



        res.json({

            message:"Registration successful",

            user:user

        });


    }

    catch(error){

console.log(error);

res.status(500).json({
error:error.message
});

}


});

// LOGIN USER


app.post("/api/login", async(req,res)=>{


    try{


        const {
            email,
            password
        } = req.body;



        const user =
        await prisma.user.findUnique({

            where:{
                email:email
            }

        });



        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }



        const validPassword =
        await bcrypt.compare(
            password,
            user.password
        );



        if(!validPassword){

            return res.status(401).json({

                message:"Invalid password"

            });

        }



        const token =
        jwt.sign(

            {
                id:user.id,
                email:user.email
            },

            JWT_SECRET,

            {
                expiresIn:"1h"
            }

        );



        res.json({

            message:"Login successful",

            token:token

        });


    }


    catch(error){

console.log(error);

res.status(500).json({
error:error.message
});

}


});