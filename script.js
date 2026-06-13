let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {

    const count = document.getElementById("cartCount");

    if (count) {
        count.innerText = cart.length;
    }

});

function addToCart(productName = "Product") {

    cart.push(productName);

    localStorage.setItem("cart", JSON.stringify(cart));

    const count = document.getElementById("cartCount");

    if (count) {
        count.innerText = cart.length;
    }

    alert(productName + " added to cart!");
}

function viewCart() {

    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    alert("Cart Items:\n\n" + cart.join("\n"));
}

let wishlist = [];

function addToWishlist(product) {

    wishlist.push(product);

    document.getElementById("wishlistCount").innerText =
    wishlist.length;

    alert(product + " added to Wishlist ❤️");
}

function viewWishlist() {

    if(wishlist.length === 0){
        alert("Wishlist is empty");
    }
    else{
        alert("Wishlist:\n\n" + wishlist.join("\n"));
    }
}

function toggleDetails(id) {

    let details = document.getElementById(id);

    if (details.style.display === "none") {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
}

function searchProducts() {

    let input =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    let cards =
        document.querySelectorAll(".product-card");

    cards.forEach(card => {

        let name =
            card.querySelector("h3")
            .innerText
            .toLowerCase();

        if (name.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}

function filterProducts() {

    let selected =
        document.getElementById("categoryFilter")
        .value;

    let cards =
        document.querySelectorAll(".product-card");

    cards.forEach(card => {

        let category =
            card.getAttribute("data-category");

        if (
            selected === "all" ||
            selected === category
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}

function validateForm() {

    let name =
        document.getElementById("name").value;

    if (name === "") {

        alert("Please enter your name");

        return false;
    }

    alert("Form submitted successfully!");

    return true;
}

function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    let btn = document.querySelector(".theme-btn");

    if(document.body.classList.contains("dark-mode")){
        btn.innerHTML = "☀️ Light Mode";
    } else {
        btn.innerHTML = "🌙 Dark Mode";
    }

}

window.onload = function () {

    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    if(category){

        const products =
            document.querySelectorAll(".product-card");

        products.forEach(product => {

            if(product.dataset.category !== category){
                product.style.display = "none";
            }

        });

    }

};

const productData = {

smartphone:{
title:"Smartphone",
image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
price:"₹30,000",
description:"Latest smartphone with advanced camera, powerful processor and premium design.",
features:[
"6.7-inch AMOLED Display",
"8GB RAM",
"128GB Storage",
"50MP AI Camera",
"5000mAh Battery"
]
},


headphones:{
title:"Wireless Headphones",
image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
price:"₹4,999",
description:"Premium wireless headphones with noise cancellation and high-quality audio.",
features:[
"Bluetooth 5.0",
"Active Noise Cancellation",
"20 Hours Battery Life",
"Deep Bass Sound",
"Comfortable Ear Cushions"
]
},


smartwatch:{
title:"Smart Watch",
image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
price:"₹4,999",
description:"Smart fitness watch with health monitoring and smart notifications.",
features:[
"Heart Rate Monitoring",
"Sleep Tracking",
"Fitness Modes",
"Bluetooth Calling",
"Water Resistant"
]
},


tablet:{
title:"Tablet",
image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
price:"₹18,999",
description:"Powerful tablet for entertainment, learning and professional work.",
features:[
"10.5-inch Display",
"6GB RAM",
"128GB Storage",
"Long Battery Life",
"High Performance Processor"
]
},


speaker:{
title:"Bluetooth Speaker",
image:"https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800",
price:"₹2,499",
description:"Portable Bluetooth speaker with powerful sound and deep bass.",
features:[
"Bluetooth 5.0",
"10 Hours Playback",
"HD Stereo Sound",
"Water Resistant",
"Portable Design"
]
},


shirt:{
title:"Men's Casual Shirt",
image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
price:"₹999",
description:"Comfortable cotton casual shirt suitable for daily wear.",
features:[
"100% Cotton Fabric",
"Slim Fit Design",
"Breathable Material",
"Machine Washable",
"Premium Quality"
]
},


shoe:{
title:"Sports Shoes",
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
price:"₹2,499",
description:"Lightweight sports shoes designed for comfort and performance.",
features:[
"Running Support",
"Soft Cushioning",
"Anti Slip Sole",
"Breathable Material",
"Durable Design"
]
},


handbag:{
title:"Women's Handbag",
image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
price:"₹1,999",
description:"Stylish handbag perfect for everyday fashion.",
features:[
"Premium Material",
"Spacious Storage",
"Elegant Design",
"Strong Handle",
"Lightweight"
]
},


sunglass:{
title:"Smart Sunglasses",
image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
price:"₹2,999",
description:"Modern smart sunglasses with stylish design.",
features:[
"UV Protection",
"Bluetooth Support",
"Lightweight Frame",
"Premium Lens",
"Comfort Fit"
]
},


coffee:{
title:"Coffee Maker",
image:"https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800",
price:"₹2,999",
description:"Automatic coffee maker for fresh coffee at home.",
features:[
"Quick Brewing",
"Easy Cleaning",
"Compact Design",
"Energy Efficient",
"Premium Build"
]
},


lamp:{
title:"Table Lamp",
image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
price:"₹1,199",
description:"Modern LED table lamp for home and office.",
features:[
"LED Lighting",
"Low Power Consumption",
"Adjustable Brightness",
"Modern Design",
"Eye Protection"
]
},


airfryer:{
title:"Air Fryer",
image:"https://images.unsplash.com/photo-1585515656768-0c7d5e4b1b53?w=800",
price:"₹4,499",
description:"Healthy cooking with less oil using advanced air frying technology.",
features:[
"Oil Free Cooking",
"Digital Controls",
"Large Capacity",
"Easy Cleaning",
"Fast Cooking"
]
},


vacuum:{
title:"Vacuum Cleaner",
image:"https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800",
price:"₹5,999",
description:"Powerful vacuum cleaner for efficient home cleaning.",
features:[
"Strong Suction",
"Multiple Cleaning Modes",
"Lightweight Design",
"Low Noise",
"Easy Storage"
]
}

};

const params = new URLSearchParams(window.location.search);
const product = params.get("product");

if(productData[product]){

document.getElementById("productTitle").innerText =
productData[product].title;

document.getElementById("productImage").src =
productData[product].image;

document.querySelector(".price").innerText =
productData[product].price;

document.getElementById("productDescription").innerText =
productData[product].description;

}

let featureList = document.getElementById("productFeatures");

if(productData[product] && featureList){

    featureList.innerHTML="";

    productData[product].features.forEach(item=>{

        let li=document.createElement("li");
        li.innerText=item;
        featureList.appendChild(li);

    });

}