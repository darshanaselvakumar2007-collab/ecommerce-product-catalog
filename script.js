/* =========================================
   1. GLOBAL VARIABLES
========================================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];



/* =========================================
   2. PAGE LOAD
========================================= */


document.addEventListener("DOMContentLoaded", () => {


    updateCartCount();

    updateWishlistCount();


    loadProductDetails();


    loadOrderDetails();

});



/* =========================================
   3. CART FUNCTIONS
========================================= */


function updateCartCount(){

    let count =
    document.getElementById("cartCount");


    if(count){

        count.innerText = cart.length;

    }

}



function addToCart(productName){


    cart.push(productName);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(
        productName + " added to cart 🛒"
    );

}



function viewCart(){


    if(cart.length === 0){

        alert("Your cart is empty");

        return;

    }


    alert(
        "Cart Items:\n\n" +
        cart.join("\n")
    );

}



/* =========================================
   4. WISHLIST FUNCTIONS
========================================= */


function updateWishlistCount(){


    let count =
    document.getElementById("wishlistCount");


    if(count){

        count.innerText =
        wishlist.length;

    }

}




function addToWishlist(product){


    wishlist.push(product);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    updateWishlistCount();


    alert(
        product + " added to wishlist ❤️"
    );

}




function viewWishlist(){


    if(wishlist.length===0){

        alert("Wishlist is empty");

        return;

    }


    alert(
        "Wishlist:\n\n" +
        wishlist.join("\n")
    );

}



/* =========================================
   5. SEARCH PRODUCTS
========================================= */


function searchProducts(){


    let input =
    document.getElementById("searchInput")
    .value
    .toLowerCase();



    let products =
    document.querySelectorAll(".product-card");



    products.forEach(card=>{


        let name =
        card.querySelector("h3")
        .innerText
        .toLowerCase();



        if(name.includes(input)){


            card.style.display="block";


        }

        else{


            card.style.display="none";


        }


    });


}




/* =========================================
   6. CATEGORY FILTER
========================================= */


function filterProducts(){


    let selected =
    document.getElementById("categoryFilter")
    .value;



    let products =
    document.querySelectorAll(".product-card");



    products.forEach(product=>{


        let category =
        product.dataset.category;



        if(
            selected==="all" ||
            category===selected
        ){


            product.style.display="block";


        }

        else{


            product.style.display="none";


        }


    });


}





/* =========================================
   7. DARK / LIGHT THEME
========================================= */


function toggleTheme(){


    document.body.classList.toggle(
        "dark-mode"
    );


    let button =
    document.querySelector(".theme-btn");



    if(
        document.body.classList.contains(
            "dark-mode"
        )
    ){


        button.innerHTML =
        "☀️ Light Mode";


    }

    else{


        button.innerHTML =
        "🌙 Dark Mode";


    }


}
/* =========================================
   8. PRODUCT DETAILS DATA
========================================= */


const productData = {


smartphone:{
title:"Smartphone",
image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
price:"₹30,000",
description:
"Latest smartphone with advanced camera, powerful processor and premium design.",
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
description:
"Premium wireless headphones with noise cancellation and high quality audio.",
features:[
"Bluetooth 5.0",
"Active Noise Cancellation",
"20 Hours Battery",
"Deep Bass Sound",
"Comfort Ear Cushions"
]
},


smartwatch:{
title:"Smart Watch",
image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
price:"₹4,999",
description:
"Fitness smartwatch with health tracking and notifications.",
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
description:
"Powerful tablet for entertainment and professional work.",
features:[
"10.5 inch Display",
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
description:
"Portable speaker with powerful sound and deep bass.",
features:[
"Bluetooth 5.0",
"10 Hour Playback",
"HD Stereo Sound",
"Water Resistant",
"Portable Design"
]
},


shirt:{
title:"Men's Casual Shirt",
image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
price:"₹999",
description:
"Comfortable cotton casual shirt for daily wear.",
features:[
"100% Cotton",
"Slim Fit",
"Breathable Fabric",
"Machine Washable",
"Premium Quality"
]
},


shoe:{
title:"Sports Shoes",
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
price:"₹2,499",
description:
"Lightweight sports shoes designed for comfort.",
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
description:
"Stylish handbag for everyday fashion.",
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
description:
"Modern smart sunglasses with stylish design.",
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
description:
"Automatic coffee maker for fresh coffee at home.",
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
description:
"Modern LED table lamp for home and office.",
features:[
"LED Lighting",
"Low Power Usage",
"Adjustable Brightness",
"Modern Design",
"Eye Protection"
]
},


airfryer:{
title:"Air Fryer",
image:"https://images.unsplash.com/photo-1585515656768-0c7d5e4b1b53?w=800",
price:"₹4,499",
description:
"Healthy cooking with less oil.",
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
description:
"Powerful cleaner for home cleaning.",
features:[
"Strong Suction",
"Multiple Modes",
"Lightweight",
"Low Noise",
"Easy Storage"
]
}


};


/* =========================================
   9. LOAD PRODUCT DETAILS PAGE
========================================= */


function loadProductDetails(){


let params =
new URLSearchParams(window.location.search);



let product =
params.get("product");



if(!productData[product]) return;



let data =
productData[product];



document.getElementById("productTitle")
.innerText=data.title;



document.getElementById("productImage")
.src=data.image;



document.querySelector(".price")
.innerText=data.price;



document.getElementById("productDescription")
.innerText=data.description;



let featureList =
document.getElementById("productFeatures");



if(featureList){


featureList.innerHTML="";


data.features.forEach(feature=>{


let li=document.createElement("li");

li.innerText=feature;

featureList.appendChild(li);


});


}


}

/* =========================================
   10. BUY NOW
========================================= */


function buyProduct(){


let title =
document.getElementById("productTitle").innerText;


let price =
document.querySelector(".price").innerText;



localStorage.setItem(
"productName",
title
);


localStorage.setItem(
"productPrice",
price
);



window.location.href=
"order.html";


}

/* =========================================
   11. ORDER PAGE
========================================= */


function loadOrderDetails(){


let product =
document.getElementById("orderProduct");


let price =
document.getElementById("orderPrice");



if(product && price){


product.innerText =
localStorage.getItem("productName");


price.innerText =
localStorage.getItem("productPrice");


}


}



function placeOrder(){


let name =
document.getElementById("customerName").value.trim();


let phone =
document.getElementById("phone").value.trim();


let address =
document.getElementById("address").value.trim();



if(name==="" || phone==="" || address===""){


alert("Please fill all delivery details");

return false;


}



if(phone.length!==10 || isNaN(phone)){


alert("Enter valid phone number");

return false;


}



localStorage.setItem(
"customerName",
name
);



alert("Order Confirmed!");

window.location.href=
"order-confirmation.html";
}