const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// GET ALL PRODUCTS
exports.getProducts = async(req,res)=>{

try{

const products =
await prisma.product.findMany();

res.json(products);

}
catch(error){

res.status(500).json({
message:"Failed to fetch products"
});

}

};


// GET SINGLE PRODUCT

exports.getProductById = async(req,res)=>{

try{

const product =
await prisma.product.findUnique({

where:{
id:Number(req.params.id)
}

});


res.json(product);

}

catch(error){

res.status(500).json({
message:"Product not found"
});

}

};



// CREATE PRODUCT

exports.createProduct = async(req,res)=>{

try{

const product =
await prisma.product.create({

data:req.body

});


res.json(product);

}

catch(error){

res.status(500).json({
message:"Cannot create product"
});

}

};



// UPDATE PRODUCT

exports.updateProduct = async(req,res)=>{

try{

const product =
await prisma.product.update({

where:{
id:Number(req.params.id)
},

data:req.body

});


res.json(product);

}

catch(error){

res.status(500).json({
message:"Cannot update product"
});

}

};



// DELETE PRODUCT

exports.deleteProduct = async(req,res)=>{

try{

await prisma.product.delete({

where:{
id:Number(req.params.id)
}

});


res.json({
message:"Product deleted"
});

}

catch(error){

res.status(500).json({
message:"Cannot delete product"
});

}

};