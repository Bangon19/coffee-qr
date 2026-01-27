let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    let cartList = document.getElementById("cart");
    let total = 0;
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;
        cartList.innerHTML += `
            <li>
                ${item.name} - ${item.price}đ
                <button onclick="removeItem(${index})">❌</button>
            </li>
        `;
    });

    document.getElementById("total").innerText = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("❗ Giỏ hàng trống");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({
        time: new Date().toLocaleString(),
        items: cart
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");
    cart = [];

    alert("✅ Đặt món thành công!");
    renderCart();
}

renderCart();
