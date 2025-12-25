import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';

// Force disable Turbopack to avoid Windows symlink issues
process.env.NEXT_TURBO = '0';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port, webpack: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            const { pathname, query } = parsedUrl;

            if (pathname === '/a') {
                await app.render(req, res, '/a', query);
            } else if (pathname === '/b') {
                await app.render(req, res, '/b', query);
            } else if (!pathname.startsWith('/socket.io')) {
                await handle(req, res, parsedUrl);
            }
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('internal server error');
        }
    });

    const serverIo = new Server(server);

    serverIo.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on('join-room', (room) => {
            socket.join(room);
            console.log(`Socket ${socket.id} joined room ${room}`);
        });

        socket.on('new-order', (order) => {
            console.log('New Order received:', order.id);
            serverIo.emit('order-received', order);
        });

        socket.on('update-status', ({ orderId, status }) => {
            console.log(`Order ${orderId} status updated to ${status}`);
            serverIo.emit('status-updated', { orderId, status });
        });

        socket.on('update-order', (order) => {
            console.log('Order updated:', order.id);
            serverIo.emit('order-updated', order);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});
