module.exports = {
    apps: [
        {
            name: "oyechatoro",
            script: "server.js",
            instances: "max", // Use all CPU cores (cluster mode) - remove if using standard socket.io without redis-adapter
            exec_mode: "fork", // Use 'fork' for safe basic socket.io, 'cluster' requires redis adapter
            env: {
                NODE_ENV: "production",
                PORT: 3000
            }
        }
    ]
};
