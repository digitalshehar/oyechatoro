// Menu management functionality
const STORAGE_KEY = 'oye_chatoro_menu';

// Load menu items from localStorage
let menuItems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Advanced filter state
let activeFilters = {
    search: '',
    priceRange: { min: null, max: null },
    categories: [],
    sortBy: 'name-asc',
    type: ''  // 'veg', 'bestseller', or ''
};

// Initialize filters
function initializeFilters() {
    // Initialize search
    document.querySelector('#searchBox')?.addEventListener('input', 
        debounce(() => {
            activeFilters.search = document.querySelector('#searchBox').value.toLowerCase();
            applyFilters();
        }, 300)
    );
    
    // Initialize price range
    document.querySelector('#minPrice')?.addEventListener('input', 
        debounce(() => {
            activeFilters.priceRange.min = parseFloat(document.querySelector('#minPrice').value) || null;
            applyFilters();
        }, 300)
    );
    document.querySelector('#maxPrice')?.addEventListener('input', 
        debounce(() => {
            activeFilters.priceRange.max = parseFloat(document.querySelector('#maxPrice').value) || null;
            applyFilters();
        }, 300)
    );
    
    // Initialize category checkboxes
    document.querySelectorAll('.category-checkbox').forEach(checkbox => {
        checkbox?.addEventListener('change', () => {
            activeFilters.categories = Array.from(document.querySelectorAll('.category-checkbox:checked'))
                .map(cb => cb.value);
            applyFilters();
        });
    });
    
    // Initialize type filter
    document.querySelector('#typeFilter')?.addEventListener('change', () => {
        activeFilters.type = document.querySelector('#typeFilter').value;
        applyFilters();
    });
    
    // Initialize sort
    document.querySelector('#sortSelect')?.addEventListener('change', () => {
        activeFilters.sortBy = document.querySelector('#sortSelect').value;
        applyFilters();
    });
    
    // Initialize reset button
    document.querySelector('#resetFilters')?.addEventListener('click', resetFilters);
}

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Reset filters
function resetFilters() {
    // Reset search
    document.querySelector('#searchBox').value = '';
    activeFilters.search = '';
    
    // Reset price range
    document.querySelector('#minPrice').value = '';
    document.querySelector('#maxPrice').value = '';
    activeFilters.priceRange.min = null;
    activeFilters.priceRange.max = null;
    
    // Reset categories
    document.querySelectorAll('.category-checkbox').forEach(cb => cb.checked = false);
    activeFilters.categories = [];
    
    // Reset type filter
    document.querySelector('#typeFilter').value = '';
    activeFilters.type = '';
    
    // Reset sort
    document.querySelector('#sortSelect').value = 'name-asc';
    activeFilters.sortBy = 'name-asc';
    
    // Apply reset
    applyFilters();
}

// Update active filter tags display
function updateActiveFilterTags() {
    const tagsContainer = document.querySelector('.active-filters');
    if (!tagsContainer) return;
    tagsContainer.innerHTML = '';

    // Search tag
    if (activeFilters.search) {
        addFilterTag('Search: ' + activeFilters.search, () => {
            document.querySelector('#searchBox').value = '';
            activeFilters.search = '';
            applyFilters();
        });
    }

    // Price range tags
    if (activeFilters.priceRange.min !== null) {
        addFilterTag(`Min price: ₹${activeFilters.priceRange.min}`, () => {
            document.querySelector('#minPrice').value = '';
            activeFilters.priceRange.min = null;
            applyFilters();
        });
    }
    if (activeFilters.priceRange.max !== null) {
        addFilterTag(`Max price: ₹${activeFilters.priceRange.max}`, () => {
            document.querySelector('#maxPrice').value = '';
            activeFilters.priceRange.max = null;
            applyFilters();
        });
    }

    // Category tags
    activeFilters.categories.forEach(category => {
        addFilterTag(`Category: ${category}`, () => {
            document.querySelector(`.category-checkbox[value="${category}"]`).checked = false;
            activeFilters.categories = activeFilters.categories.filter(c => c !== category);
            applyFilters();
        });
    });

    // Type tag
    if (activeFilters.type) {
        const typeLabel = activeFilters.type === 'veg' ? '🌱 Veg Only' : '⭐ Bestsellers Only';
        addFilterTag(typeLabel, () => {
            document.querySelector('#typeFilter').value = '';
            activeFilters.type = '';
            applyFilters();
        });
    }
}

// Add a single filter tag
function addFilterTag(text, removeCallback) {
    const tagsContainer = document.querySelector('.active-filters');
    if (!tagsContainer) return;

    const tag = document.createElement('span');
    tag.className = 'filter-tag';
    tag.innerHTML = `
        ${text}
        <button type="button" aria-label="Remove filter">×</button>
    `;
    tag.querySelector('button').addEventListener('click', removeCallback);
    tagsContainer.appendChild(tag);
}

// Apply filters and display menu items
function applyFilters() {
    const container = document.getElementById('menuItemsList');
    if (!container) return;

    // Get all items
    let filteredItems = menuItems;

    // Apply search filter
    if (activeFilters.search) {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(activeFilters.search) || 
            item.description.toLowerCase().includes(activeFilters.search) ||
            item.category.toLowerCase().includes(activeFilters.search)
        );
    }

    // Apply price range filter
    if (activeFilters.priceRange.min !== null || activeFilters.priceRange.max !== null) {
        filteredItems = filteredItems.filter(item => {
            const aboveMin = activeFilters.priceRange.min === null || 
                item.price >= activeFilters.priceRange.min;
            const belowMax = activeFilters.priceRange.max === null || 
                item.price <= activeFilters.priceRange.max;
            return aboveMin && belowMax;
        });
    }

    // Apply category filter
    if (activeFilters.categories.length > 0) {
        filteredItems = filteredItems.filter(item => 
            activeFilters.categories.includes(item.category)
        );
    }

    // Apply type filter
    if (activeFilters.type) {
        filteredItems = filteredItems.filter(item => 
            (activeFilters.type === 'veg' && item.isVeg) || 
            (activeFilters.type === 'bestseller' && item.isBestseller)
        );
    }

    // Apply sorting
    filteredItems.sort((a, b) => {
        switch(activeFilters.sortBy) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'category':
                return a.category.localeCompare(b.category) || 
                    a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    // Update active filter tags
    updateActiveFilterTags();

    // Display empty state if no items
    if (filteredItems.length === 0) {
        const message = menuItems.length === 0 
            ? 'No menu items added yet. Use the form above to add items.'
            : 'No items match your filters.';
        container.innerHTML = `<div class="empty-state">${message}</div>`;
        return;
    }

    // Render items
    container.innerHTML = filteredItems.map(item => `
        <div class="menu-item ${bulkEditMode ? 'selectable' : ''}">
            ${bulkEditMode ? `<input type="checkbox" class="select-checkbox" data-id="${item.id}">` : ''}
            <div class="menu-item-details">
                <strong>${item.name}</strong> - ₹${item.price}
                <div class="item-badges">
                    ${item.isVeg ? '<span class="menu-item-badge badge-veg">🌱 Veg</span>' : ''}
                    ${item.isBestseller ? '<span class="menu-item-badge badge-bestseller">⭐ Bestseller</span>' : ''}
                </div>
                <p>${item.description}</p>
                <small>Category: ${item.category}</small>
            </div>
            ${!bulkEditMode ? `
                <div class="menu-item-actions">
                    <button onclick="editItem('${item.id}')" class="btn-edit">Edit</button>
                    <button onclick="deleteItem('${item.id}')" class="btn-delete">Delete</button>
                </div>
            ` : ''}
        </div>
    `).join('');

    updateStatistics();
}

// Save menu item
function saveMenuItem(event) {
    event.preventDefault();
    
    const form = event.target;
    const editItemId = document.getElementById('editItemId').value;
    
    const item = {
        id: editItemId || Date.now().toString(),
        name: document.getElementById('itemName').value,
        category: document.getElementById('itemCategory').value,
        price: parseInt(document.getElementById('itemPrice').value),
        description: document.getElementById('itemDescription').value,
        isVeg: document.getElementById('itemVeg').checked,
        isBestseller: document.getElementById('itemBestseller').checked
    };

    if (editItemId) {
        // Update existing item
        const index = menuItems.findIndex(i => i.id === editItemId);
        if (index !== -1) menuItems[index] = item;
    } else {
        // Add new item
        menuItems.push(item);
    }

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems));
    
    // Reset form
    form.reset();
    document.getElementById('editItemId').value = '';
    document.getElementById('saveButton').textContent = 'Add Item';
    
    // Show feedback and refresh display
    showAlert(editItemId ? 'Item updated successfully!' : 'Item added successfully!', 'success');
    applyFilters();
}

// Edit menu item
function editItem(id) {
    const item = menuItems.find(i => i.id === id);
    if (!item) return;

    document.getElementById('editItemId').value = item.id;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemCategory').value = item.category;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemDescription').value = item.description;
    document.getElementById('itemVeg').checked = item.isVeg;
    document.getElementById('itemBestseller').checked = item.isBestseller;
    document.getElementById('saveButton').textContent = 'Update Item';
    
    // Scroll to form
    document.getElementById('menuForm').scrollIntoView({ behavior: 'smooth' });
}

// Delete menu item
function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    menuItems = menuItems.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems));
    showAlert('Item deleted successfully!', 'success');
    applyFilters();
}

// Download menu data
function downloadMenu() {
    const data = JSON.stringify(menuItems, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `menu-items-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showAlert('Menu data downloaded successfully!', 'success');
}

// Clear all menu items
function clearMenu() {
    if (!confirm('Are you sure you want to delete ALL menu items? This cannot be undone!')) return;
    
    menuItems = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems));
    showAlert('All menu items cleared!', 'success');
    applyFilters();
}

// Show alert message
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(alert, container.firstChild);
    
    setTimeout(() => alert.remove(), 3000);
}

// Login functionality
function login() {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        applyFilters();
        initializeFilters();
    } else {
        showAlert('Invalid password', 'error');
    }
}

// Backup functionality
function backupMenu() {
    const backup = {
        timestamp: new Date().toISOString(),
        data: menuItems
    };
    localStorage.setItem('oye_chatoro_menu_backup', JSON.stringify(backup));
    showAlert('Menu backup created successfully!', 'success');
}

function restoreMenu() {
    const backup = localStorage.getItem('oye_chatoro_menu_backup');
    if (!backup) {
        showAlert('No backup found!', 'error');
        return;
    }
    
    if (!confirm('This will replace your current menu with the backup. Continue?')) return;
    
    try {
        const { timestamp, data } = JSON.parse(backup);
        const backupDate = new Date(timestamp).toLocaleString();
        
        menuItems = data;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems));
        showAlert(`Menu restored from backup (${backupDate})`, 'success');
        applyFilters();
    } catch (err) {
        showAlert('Failed to restore backup!', 'error');
    }
}

// Import/Export functionality
function importMenu(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (!Array.isArray(imported)) throw new Error('Invalid format');
            
            if (!confirm(`Import ${imported.length} menu items? This will replace your current menu.`)) return;
            
            menuItems = imported;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems));
            showAlert('Menu imported successfully!', 'success');
            applyFilters();
        } catch (err) {
            showAlert('Failed to import menu: Invalid file format', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
}

// Bulk edit functionality
let bulkEditMode = false;

function toggleBulkEdit() {
    bulkEditMode = !bulkEditMode;
    const panel = document.getElementById('bulkEditPanel');
    panel.classList.toggle('hidden', !bulkEditMode);
    applyFilters();
}

// Handle bulk action selection
document.getElementById('bulkAction')?.addEventListener('change', function(e) {
    const valueContainer = document.getElementById('bulkActionValue');
    valueContainer.innerHTML = '';
    
    switch(e.target.value) {
        case 'category':
            valueContainer.innerHTML = `
                <select id="newCategory">
                    <option value="starters">Starters</option>
                    <option value="chaat">Chaat & Snacks</option>
                    <option value="pizza">Pizza</option>
                    <option value="pasta">Pasta</option>
                    <option value="sandwich">Sandwiches & Burgers</option>
                    <option value="chinese">Chinese</option>
                    <option value="southindian">South Indian</option>
                    <option value="thali">Special Thali</option>
                    <option value="desserts">Desserts</option>
                    <option value="beverages">Beverages</option>
                </select>
            `;
            break;
            
        case 'price':
            valueContainer.innerHTML = `
                <select id="priceAction">
                    <option value="set">Set to</option>
                    <option value="increase">Increase by</option>
                    <option value="decrease">Decrease by</option>
                </select>
                <input type="number" id="priceValue" min="0" placeholder="Amount">
            `;
            break;
    }
    
    valueContainer.classList.toggle('hidden', !e.target.value);
});

function applyBulkAction() {
    const selected = Array.from(document.querySelectorAll('.select-checkbox:checked'))
        .map(cb => cb.dataset.id);
        
    if (selected.length === 0) {
        showAlert('No items selected!', 'error');
        return;
    }
    
    const action = document.getElementById('bulkAction').value;
    if (!action) {
        showAlert('Please select an action!', 'error');
        return;
    }
    
    let updated = false;
    
    switch(action) {
        case 'category':
            const newCategory = document.getElementById('newCategory').value;
            menuItems = menuItems.map(item => 
                selected.includes(item.id) ? {...item, category: newCategory} : item
            );
            updated = true;
            break;
            
        case 'price':
            const priceAction = document.getElementById('priceAction').value;
            const priceValue = parseInt(document.getElementById('priceValue').value);
            
            if (isNaN(priceValue)) {
                showAlert('Please enter a valid price!', 'error');
                return;
            }
            
            menuItems = menuItems.map(item => {
                if (!selected.includes(item.id)) return item;
                
                let newPrice = item.price;
                switch(priceAction) {
                    case 'set': newPrice = priceValue; break;
                    case 'increase': newPrice += priceValue; break;
                    case 'decrease': newPrice = Math.max(0, newPrice - priceValue); break;
                }
                return {...item, price: newPrice};
            });
            updated = true;
            break;
            
        case 'veg':
            menuItems = menuItems.map(item =>
                selected.includes(item.id) ? {...item, isVeg: true} : item
            );
            updated = true;
            break;
            
        case 'bestseller':
            menuItems = menuItems.map(item =>
                selected.includes(item.id) ? {...item, isBestseller: !item.isBestseller} : item
            );
            updated = true;
            break;
            
        case 'delete':
            if (!confirm(`Delete ${selected.length} items?`)) return;
            menuItems = menuItems.filter(item => !selected.includes(item.id));
            updated = true;
            break;
    }
    
    if (updated) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems));
        showAlert('Bulk update completed successfully!', 'success');
        toggleBulkEdit();
        applyFilters();
    }
}

// Initialize display
applyFilters();