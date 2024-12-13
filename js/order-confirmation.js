document.addEventListener("DOMContentLoaded", function () {
    // Retrieve order data from sessionStorage
    const formData = JSON.parse(sessionStorage.getItem("checkoutFormData"));
    const cartData = JSON.parse(sessionStorage.getItem("checkoutCartData"));
    const totalPrice = sessionStorage.getItem("checkoutTotalPrice");

    // Generate a unique order ID (you can replace this with backend logic if needed)
    const orderId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Get current date for order date
    const orderDate = new Date().toLocaleDateString();

    // Populate dynamic fields
    document.querySelector(".order-summary strong:nth-of-type(1)").innerText = `Order ID: ${orderId}`;
    document.querySelector(".order-summary strong:nth-of-type(2)").innerText = `Order Date: ${orderDate}`;
    document.querySelector(".order-summary strong:nth-of-type(3)").innerText = `Shipping Address: ${formData.fullName}, ${formData.address}, ${formData.city}, ${formData.postal}`;
    
    // Update ordered items list
    const itemsList = document.querySelector(".order-summary ul");
    itemsList.innerHTML = ""; // Clear any placeholder items
    cartData.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerText = `${item.product} - ${item.total}`;
        itemsList.appendChild(listItem);
    });

    // Update total amount
    document.querySelector(".order-summary strong:nth-of-type(4)").innerText = `Total Amount: ${totalPrice}`;

    // Set estimated delivery date (5 days from now as an example)
    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5);
    document.querySelector(".order-summary strong:nth-of-type(5)").innerText = `Estimated Delivery: ${estimatedDeliveryDate.toLocaleDateString()}`;
});
