const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();


// REGISTER USER
exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;


        // Check existing user
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });


        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create user
        const user = await prisma.user.create({

            data: {
                name,
                email,
                password: hashedPassword
            }

        });


        res.status(201).json({

            message: "Registration successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });

    }

};




// LOGIN USER
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;


        // Find user
        const user = await prisma.user.findUnique({

            where:{
                email: email
            }

        });


        if (!user) {

            return res.status(404).json({
                message:"User not found"
            });

        }



        // Compare password

        const validPassword =
        await bcrypt.compare(password, user.password);



        if(!validPassword){

            return res.status(401).json({
                message:"Invalid password"
            });

        }



        // Create JWT token

        const token = jwt.sign(

            {
                id:user.id,
                email:user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"1d"
            }

        );



        res.json({

            message:"Login successful",

            token:token,

            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }

        });



    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Login failed"
        });

    }

};