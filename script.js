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