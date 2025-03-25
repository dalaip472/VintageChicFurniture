function searchTables() {
    let input, filter, container, items, name, i, txtValue, hasResults;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    container = document.getElementById("tableContainer");
    items = container.getElementsByClassName("table-item");
    hasResults = false; // Tracks whether any item matches the search

    for (i = 0; i < items.length; i++) {
        name = items[i].getElementsByTagName("h3")[0];
        txtValue = name.textContent || name.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = ""; // Show matching items
            hasResults = true; // Found at least one match
        } else {
            items[i].style.display = "none"; // Hide non-matching items
        }
    }

    // Check if no results were found
    let noResultsMessage = document.getElementById("noResults");
    if (!hasResults) {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement("div");
            noResultsMessage.id = "noResults";
            noResultsMessage.style.textAlign = "center";
            noResultsMessage.style.color = "#721d1d";
            noResultsMessage.style.fontWeight = "bold";
            noResultsMessage.style.marginTop = "50px";
            noResultsMessage.textContent = "No results found.";
            container.parentNode.appendChild(noResultsMessage);
        }
    } else {
        if (noResultsMessage) {
            noResultsMessage.remove(); // Remove the "No results found" message if there are results
        }
    }
}



// Initialize an empty cart
let cart = [];

// Function to add item to cart
function addToCart(item) {
    cart.push(item);
    showNotification(`${item.name} has been added to your cart!`);
    updateCartDisplay(); // Update the cart display
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing items
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.name} - ${item.price}`;
        cartItemsContainer.appendChild(li);
    });
    document.getElementById('cart').style.display = 'block'; // Show the cart
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);
    
    // Show the notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10); // Delay to allow the class to be added

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500); // Wait for fade-out before removing
    }, 3000);
}

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const item = {
            name: button.parentElement.querySelector('h3').innerText,
            price: button.parentElement.querySelector('p:nth-of-type(2)').innerText,
            image: button.parentElement.querySelector('img').src
        };
        addToCart(item);
    });
});

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items to your cart before checking out.');
        return;
    }

    let total = 0;
    let cartSummary = 'Your Cart:\n\n';

    cart.forEach(item => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")); // Extract numeric value from price
        total += price;
        cartSummary += `${item.name} - ${item.price}\n`;
    });

    cartSummary += `\nTotal: $${total.toFixed(2)}`;
    alert(cartSummary); // Display cart summary and total price

    // Optionally, you can clear the cart after checkout
    cart = [];
    updateCartDisplay(); // Update the cart display
    document.getElementById('cart').style.display = 'none'; // Hide the cart
}