/* =========================================
   1. GLOBAL VARIABLES
========================================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

// ===============================
// LOAD PRODUCTS FROM API
// ===============================


async function loadProducts(){

    const container =
    document.getElementById("productsContainer");


    const loading =
    document.getElementById("loading");


    try{

        const response =
        await fetch(
`https://ecommerce-product-catalog-b5n0.onrender.com/api/products/${id}`
);;


        const products =
        await response.json();


        loading.style.display="none";


        if(products.length === 0){

            container.innerHTML =
            `
            <h3>No products available</h3>
            `;

            return;

        }


        container.innerHTML="";


        products.forEach(product=>{


            container.innerHTML += `

            <div class="product-card"
            data-category="${product.category}">


                <img 
                src="${product.image || 'images/default.jpg'}"
                alt="${product.name}">


                <h3>${product.name}</h3>


                <p>
                ${product.description || "No description available"}
                </p>


                <p>
                <strong>
                ₹${product.price}
                </strong>
                </p>


                <button onclick="addToCart('${product.name}')">
                🛒 Add to Cart
                </button>


                <a href="product-details.html?id=${product.id}"
                class="btn">
                View Details
                </a>


            </div>

            `;


        });


    }


    catch(error){


        console.log(error);


        loading.style.display="none";


        container.innerHTML=
        `
        <div class="error-box">

        <h3>
        ⚠ Failed to load products
        </h3>

        <p>
        Please check your server connection
        </p>

        </div>
        `;


    }


}



// Call function when page loads

loadProducts();

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
    document.querySelectorAll("#cartCount, #cartCountSection");


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


// SEARCH PRODUCTS

function searchProducts(){

    let input = document
    .getElementById("searchInput")
    .value
    .toLowerCase();


    let products =
    document.querySelectorAll(".product-card");


    products.forEach(card=>{


        let name =
        card.querySelector("h3")
        .innerText
        .toLowerCase();


        let description =
        card.querySelector("p")
        .innerText
        .toLowerCase();


        if(
            name.includes(input) ||
            description.includes(input)
        ){

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

// FILTER PRODUCTS BY CATEGORY

function filterProducts(){

    let category =
    document.getElementById("categoryFilter")
    .value;


    let products =
    document.querySelectorAll(".product-card");


    products.forEach(card=>{


        let productCategory =
        card.getAttribute("data-category");


        if(
            category === "all" ||
            productCategory === category
        ){

            card.style.display="block";

        }

        else{

            card.style.display="none";

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

// LOAD SINGLE PRODUCT DETAILS


async function loadProductDetails(){

    const params =
    new URLSearchParams(
        window.location.search
    );


    const id =
    params.get("id");


    if(!id) return;


    try{


        const response =
await fetch(`${API_URL}/api/products`);


if(!response.ok){

throw new Error("API Error");

}


        const product =
        await response.json();



        document.getElementById(
            "productTitle"
        ).innerText =
        product.name;



        document.getElementById(
            "productPrice"
        ).innerText =
        "₹" + product.price;



        document.getElementById(
            "productDescription"
        ).innerText =
        product.description;



        document.getElementById(
            "productImage"
        ).src =
        product.image;



        document.getElementById(
            "productFeatures"
        ).innerHTML =
        `
        <li>Category: ${product.category}</li>
        <li>Premium Quality Product</li>
        <li>Fast Delivery Available</li>
        <li>Easy Returns</li>
        `;



    }

    catch(error){

        console.log(
        "Product details error:",
        error
        );

    }

}

loadProductDetails();

// REGISTER USER

async function registerUser(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    try {

        const response = await fetch(
            "http://localhost:5000/auth/register",
            {
                method: "POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );


        const data = await response.json();


        if(response.ok){

            alert("Registration successful");

            window.location.href="login.html";

        }
        else{

            alert(data.message);

        }


    }
    catch(error){

        console.log(error);

        alert("Server error");

    }

}