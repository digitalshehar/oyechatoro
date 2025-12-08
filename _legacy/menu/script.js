let cart = [];

function toggleCart() {
    const overlay = document.getElementById('cart-overlay');
    overlay.classList.toggle('open');
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();

    // Feedback
    const fab = document.querySelector('.cart-fab');
    fab.style.transform = 'scale(1.2)';
    setTimeout(() => fab.style.transform = 'scale(1)', 200);
}

function updateItem(name, change) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
    }
    updateCart();
}

function updateCart() {
    const countEl = document.getElementById('cart-count');
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    countEl.textContent = totalQty;
    totalEl.textContent = '₹' + totalPrice;

    if (cart.length === 0) {
        itemsEl.innerHTML = '<p style="text-align:center;color:var(--text-gray);font-style:italic;">Your selection is empty.</p>';
    } else {
        itemsEl.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <div style="color:var(--text-white);font-weight:bold;">${item.name}</div>
                    <div style="color:var(--text-gold);font-size:14px;">₹${item.price}</div>
                </div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="updateItem('${item.name}', -1)">-</button>
                    <span style="color:var(--text-white);width:20px;text-align:center;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateItem('${item.name}', 1)">+</button>
                </div>
            </div>
        `).join('');
    }
}

function checkout() {
    if (cart.length === 0) return;

    let msg = "Premium Dining Order:\n\n";
    cart.forEach(item => {
        msg += `• ${item.quantity}x ${item.name} (₹${item.price * item.quantity})\n`;
    });

    const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    msg += `\n*Grand Total: ₹${total}*`;

    const phone = '919509913792';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

// Scroll Spy for Navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});
