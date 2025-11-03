// Data Produk (Tas, Baju, Celana Cewek)
const products = [
    { id: 1, name: "Tas Ransel Tahan Air", price: 150980, stock: 10, image: "yussa_Tas_Ransel_Gaya_Minimalis_Tahan_Air.webp", desc: "Tas ransel tahan air ini terbuat dari bahan waterproof berkualitas yang melindungi barang dari hujan dan lembap. Desainnya ringan, kuat, dan memiliki banyak ruang, cocok untuk kerja, sekolah, maupun traveling" },
    { id: 2, name: "Totebag - Classy Suede ", price: 80000, stock: 15, image: "Tas_Totabag_Coklat.webp", desc: "Totebag suede elegan, ringan, dan kuat. Cocok untuk kerja, kuliah, atau aktivitas harian." },
    { id: 3, name: "Celana Jeans Robek Cewek", price: 120000, stock: 20, image:"CELANA HIGHWAIST JEANS WANITA BEGGYLOSSE_SOBEK.webp", desc: "Celana jeans bergaya modern dengan bahan denim lembut dan kuat. Nyaman dipakai, tahan lama, dan cocok untuk segala aktivitas." },
    { id: 4, name: "Baju Kaos Cowo / Cewe", price: 100000, stock: 8, image: "icon_arrow_left_boldicon_arrow_right_bold.webp", desc: "Baju kaos nyaman dan lembut di pakai" },
    { id: 5, name: "Sepatu Casual Onitsuka", price: 95000, stock: 12, image: "[PROMO] Sepatu Casual Onitsuka Tokuten Wanita & Pria Cream Black Gold Original.webp", desc: "Sepatu Onitsuka bergaya sporty dan klasik dengan bahan ringan serta sol anti-slip. Nyaman dipakai untuk aktivitas harian maupun olahraga" },
    { id: 6, name: "Celana Kulot Cewek", price: 70000, stock: 18, image: "Highwaist Baggy Jeans Hangover Wanita-Celana Kulot Jeans.webp", desc: "Celana kulot dengan potongan longgar dan bahan lembut. Nyaman dipakai, stylish, dan cocok untuk tampilan santai atau semi formal." }
];

// Keranjang Belanja (dari localStorage)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fungsi Update Cart Count
function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Fungsi Render Produk
function renderProducts() {
    const container = document.getElementById('products');
    container.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price.toLocaleString()}</p>
            <button onclick="viewProduct(${product.id})">Lihat Detail</button>
            <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
        `;
        container.appendChild(card);
    });
}

// Fungsi Lihat Detail Produk (Modal)
function viewProduct(id) {
    const product = products.find(p => p.id === id);
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalName').textContent = product.name;
    document.getElementById('modalDesc').textContent = product.desc;
    document.getElementById('modalPrice').textContent = product.price.toLocaleString();
    document.getElementById('modalStock').textContent = product.stock;
    document.getElementById('productModal').classList.remove('hidden');
    document.querySelector('.close').onclick = () => document.getElementById('productModal').classList.add('hidden');
    document.getElementById('addToCartModal').onclick = () => { addToCart(id); document.getElementById('productModal').classList.add('hidden'); };
}

// Fungsi Tambah ke Keranjang
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product.stock > 0) {
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        product.stock--;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Ditambahkan ke keranjang!');
    } else {
        alert('Stok habis!');
    }
}

// Fungsi Render Keranjang
function renderCart() {
    const container = document.getElementById('cartItems');
    container.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:50px;">
            <span>${item.name} (x${item.quantity})</span>
            <span>Rp ${(item.price * item.quantity).toLocaleString()}</span>
        `;
        container.appendChild(div);
    });
    document.getElementById('totalPrice').textContent = total.toLocaleString();
}

// Fungsi Checkout
function checkout() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('checkoutTotal').textContent = total.toLocaleString();
    document.getElementById('checkout').classList.remove('hidden');
    document.getElementById('cart').classList.add('hidden');
}

// Event Listeners
document.getElementById('homeBtn').addEventListener('click', () => {
    document.getElementById('products').classList.remove('hidden');
    document.getElementById('cart').classList.add('hidden');
    document.getElementById('checkout').classList.add('hidden');
});
document.getElementById('cartBtn').addEventListener('click', () => {
    renderCart();
    document.getElementById('cart').classList.remove('hidden');
    document.getElementById('products').classList.add('hidden');
    document.getElementById('checkout').classList.add('hidden');
});
document.getElementById('checkoutBtn').addEventListener('click', checkout);
document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Pembayaran berhasil! (Simulasi)');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    document.getElementById('checkout').classList.add('hidden');
    document.getElementById('products').classList.remove('hidden');
});

// Inisialisasi
renderProducts();
updateCartCount();