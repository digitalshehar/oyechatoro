import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
    path: '/socket.io',
});

console.log('Listener started. Waiting for events...');

socket.on('connect', () => {
    console.log('Connected to server with ID:', socket.id);
    socket.emit('join-room', 'kitchen'); // Simulate joining kitchen room if needed
});

socket.on('order-received', (order) => {
    console.log('SUCCESS: Received order:', order.id);
    console.log('Order Details:', order.customer, order.items);
    // Exit successfully after receiving the event
    process.exit(0);
});

socket.on('status-updated', (data) => {
    console.log('Received status update:', data);
});

socket.on('disconnect', () => {
    console.log('Disconnected');
});

// Timeout after 30 seconds if no event received
setTimeout(() => {
    console.error('TIMEOUT: No order received in 30 seconds.');
    process.exit(1);
}, 30000);
