let cart = 0;

function addToCart() {
    cart++;
    document.getElementById("cartCount").innerText = cart;

    alert("Product added to cart!");
}

function toggleDetails(id) {
    let details = document.getElementById(id);

    if (details.style.display === "none") {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
}

function validateForm() {
    let name = document.getElementById("name").value;

    if (name === "") {
        alert("Please enter your name");
        return false;
    }

    alert("Form submitted successfully!");
    return true;
}