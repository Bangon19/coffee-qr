// โหลดข้อมูลตะกร้าจาก localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ แก้ฟังก์ชัน addToCart (เพิ่ม image)
function addToCart(name, price, image) {
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// แสดงตะกร้าสินค้า
function renderCart() {
    let cartList = document.getElementById("cart");
    let total = 0;
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;

        cartList.innerHTML += `
            <li style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                <img src="${item.image}" 
                     style="width:50px;height:50px;object-fit:cover;border-radius:6px;">
                <span>
                    ${item.name} - ${item.price}đ
                </span>
                <button onclick="removeItem(${index})">❌</button>
            </li>
        `;
    });

    document.getElementById("total").innerText = total;
}

// ลบสินค้า
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// สั่งซื้อ
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

// โหลดตะกร้าทันทีเมื่อเปิดหน้าเว็บ
renderCart();
