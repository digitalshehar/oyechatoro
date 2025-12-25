
// Basic simulation of Zod validation logic (unit text style) since we can't easily hit localhost API from here without running server
// But we CAN import the schema and test it directly to prove the schema works.

import { menuItemSchema } from '../app/lib/validations/menu';
import { createOrderSchema } from '../app/lib/validations/orders';

console.log('🚀 Starting Validation Tests...\n');

// 1. Menu Validation Tests
console.log('--- Menu Validation Audit ---');
const validMenu = {
    name: 'Spicy Paneer Pizza',
    price: 399,
    categoryId: 'cat_123',
    isVegetarian: true,
    spicinessLevel: 'HOT'
};

const invalidMenu = {
    name: '', // Empty name
    price: -50, // Negative price
    categoryId: '' // Empty Category
};

const menuCheck1 = menuItemSchema.safeParse(validMenu);
console.log(`Test Valid Menu: ${menuCheck1.success ? '✅ PASS' : '❌ FAIL'}`);
if (!menuCheck1.success) console.log(menuCheck1.error);

const menuCheck2 = menuItemSchema.safeParse(invalidMenu);
console.log(`Test Invalid Menu: ${!menuCheck2.success ? '✅ PASS (Correctly Rejected)' : '❌ FAIL (Should have failed)'}`);
if (!menuCheck2.success) {
    const errs = menuCheck2.error.flatten().fieldErrors;
    console.log('   Errors caught:', Object.keys(errs).join(', '));
}

// 2. Order Validation Tests
console.log('\n--- Order Validation Audit ---');
const validOrder = {
    items: [{ menuItemId: 'item_1', quantity: 2, name: 'Pizza', price: 200 }],
    type: 'DineIn', // PascalCase now
    paymentMethod: 'UPI' // PascalCase now
};

const invalidOrder = {
    items: [], // Empty items
    discount: -100, // Negative discount
    paymentMethod: 'Bitcoin' // Invalid enum
};

const orderCheck1 = createOrderSchema.safeParse(validOrder);
console.log(`Test Valid Order: ${orderCheck1.success ? '✅ PASS' : '❌ FAIL'}`);
if (!orderCheck1.success) console.log(orderCheck1.error);

const orderCheck2 = createOrderSchema.safeParse(invalidOrder);
console.log(`Test Invalid Order: ${!orderCheck2.success ? '✅ PASS (Correctly Rejected)' : '❌ FAIL (Should have failed)'}`);
if (!orderCheck2.success) {
    const errs = orderCheck2.error.flatten().fieldErrors;
    console.log('   Errors caught:', Object.keys(errs).join(', '));
}
