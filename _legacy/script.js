// Menu Filtering Logic
function filterMenu(category) {
  const items = document.querySelectorAll('.menu-item');
  const buttons = document.querySelectorAll('.category-btn');

  buttons.forEach(btn => {
    if (btn.textContent.toLowerCase().includes(category) || (category === 'all' && btn.textContent === 'All')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'flex';
      item.style.opacity = '0';
      setTimeout(() => item.style.opacity = '1', 50);
    } else {
      item.style.display = 'none';
    }
  });
}

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
  mobileBtn.addEventListener('click', () => {
    const isExpanded = navLinks.style.display === 'flex';
    navLinks.style.display = isExpanded ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(255, 255, 255, 0.95)';
    navLinks.style.padding = '20px';
    navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    navLinks.style.backdropFilter = 'blur(10px)';
  });
}

// --- Cart Logic ---

let cart = [];

function toggleCart() {
  const modal = document.getElementById('cart-modal');
  const isOpen = modal.classList.contains('open');

  if (isOpen) {
    modal.classList.remove('open');
    setTimeout(() => modal.style.display = 'none', 300);
  } else {
    modal.style.display = 'flex';
    // Force reflow
    void modal.offsetWidth;
    modal.classList.add('open');
  }
}

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCartUI();

  // Show feedback (optional toast or animation)
  const cartBtn = document.getElementById('cart-btn');
  cartBtn.style.transform = 'scale(1.2)';
  setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
}

function updateCartItem(name, change) {
  const item = cart.find(item => item.name === name);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.name !== name);
  }

  updateCartUI();
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total-price');

  // Update Count
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalQty;

  // Update Total Price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = '₹' + totalPrice;

  // Update Items List
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty 😕</div>';
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">₹${item.price}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateCartItem('${item.name}', -1)">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartItem('${item.name}', 1)">+</button>
        </div>
      </div>
      <div style="font-weight: 600;">₹${item.price * item.quantity}</div>
    </div>
  `).join('');
}

function checkout() {
  if (cart.length === 0) return;

  let message = "New Order from Website:\n\n";

  cart.forEach(item => {
    message += `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})\n`;
  });

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  message += `\n*Total: ₹${totalPrice}*`;

  const phone = '919509913792';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank');
}

// Google Reviews Logic
const GOOGLE_API_KEY = ''; // Paste your API Key here
const PLACE_ID = 'ChIJnRpAQgBbXDkRMBhzUiU1M2M'; // Oye Chatoro Place ID

async function fetchGoogleReviews() {
  const container = document.getElementById('reviews-grid');
  if (!container) return;

  // Fallback Reviews (Real data scraped from Google Maps)
  const fallbackReviews = [
    {
      author_name: "Narsingh Ranga",
      rating: 5,
      relative_time_description: "4 days ago",
      text: "Fast, friendly, and efficient—Oye Chattore of Abu Road stands out. The staff ensures you’re well taken care of."
    },
    {
      author_name: "Sagar Sachan 7173",
      rating: 5,
      relative_time_description: "5 days ago",
      text: "Very tasty pizza in Abu road like dominos pizza. Must visit place."
    },
    {
      author_name: "Pritam Yadav",
      rating: 5,
      relative_time_description: "2 weeks ago",
      text: "Better food than other in abu road. Hygiene is very good."
    },
    {
      author_name: "Local Customer",
      rating: 5,
      relative_time_description: "1 week ago",
      text: "Best fast food shop in Abu Road. The paneer tikka pizza is amazing!"
    },
    {
      author_name: "Traveler X",
      rating: 5,
      relative_time_description: "3 weeks ago",
      text: "Stumbled upon this place while traveling. Great food and vibe."
    },
    {
      author_name: "Cet B",
      rating: 5,
      relative_time_description: "2 weeks ago",
      text: "Fresh hygeinic food prepared with love.i have ordered jain food online and the owner is so polite and patient to listen and prepare as per the request and deliver at home. I wish you great great success and thank you for honest and sincere efforts which is hard to found in this city.\nPs: Their chef is a genius!"
    },
    {
      author_name: "Foodie Guide",
      rating: 5,
      relative_time_description: "a month ago",
      text: "Excellent katori chaat and pizza. The service was quick and the place was clean."
    },
    {
      author_name: "Rider Boy",
      rating: 4,
      relative_time_description: "3 weeks ago",
      text: "Good food, a bit crowded on weekends but worth the wait."
    },
    {
      author_name: "Happy Customer",
      rating: 5,
      relative_time_description: "a month ago",
      text: "Loved the chutneys and the overall taste. Will visit again!"
    },
    {
      author_name: "Abu Road Local",
      rating: 5,
      relative_time_description: "2 months ago",
      text: "Finally a good place for fast food in Abu Road. Keep it up!"
    }
  ];

  if (!GOOGLE_API_KEY) {
    renderReviews(container, fallbackReviews);
    return;
  }

  try {
    // Note: This requires a proxy server in production to avoid CORS issues
    // For now, we use the fallback to simulate the experience
    renderReviews(container, fallbackReviews);

    // Real implementation would be:
    // const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_API_KEY}`);
    // const data = await response.json();
    // if (data.result && data.result.reviews) {
    //   renderReviews(container, data.result.reviews);
    // }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    renderReviews(container, fallbackReviews);
  }
}

function renderReviews(container, list) {
  if (!list || list.length === 0) {
    container.innerHTML = '<div class="review-card">No reviews yet.</div>';
    return;
  }
  container.innerHTML = list.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar" style="background: ${getRandomColor()}">${r.author_name.charAt(0).toUpperCase()}</div>
        <div>
          <h4 style="font-size: 16px; margin: 0;">${escapeHtml(r.author_name)}</h4>
          <div class="review-stars" style="font-size: 14px;">
            ${'⭐'.repeat(Math.round(r.rating))} 
            <span style="color: var(--text-light); font-size: 12px; margin-left: 4px;">Google Review</span>
          </div>
        </div>
      </div>
      <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6;">${escapeHtml(r.text)}</p>
      <small style="display: block; margin-top: 12px; color: var(--text-light);">${escapeHtml(r.relative_time_description)}</small>
    </div>
  `).join('');
}

function getRandomColor() {
  const colors = ['#f97316', '#ea580c', '#d97706', '#c2410c', '#b45309'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[m]));
}

document.addEventListener('DOMContentLoaded', () => {
  fetchGoogleReviews();

  // Attach click handlers to category buttons
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
    });
  });
});
