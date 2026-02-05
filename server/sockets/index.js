// FILE: server/sockets/index.js
import User from '../models/User.js';

const userSockets = new Map();

export const setupSocketHandlers = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('user_connected', async(userId) => {
            userSockets.set(userId, socket.id);
            socket.join(userId);

            await User.findByIdAndUpdate(userId, {
                isOnline: true,
                lastSeen: Date.now()
            });

            socket.broadcast.emit('user_online', userId);
        });

        socket.on('typing', ({ conversationId, userId }) => {
            socket.to(conversationId).emit('user_typing', { userId, conversationId });
        });

        socket.on('stop_typing', ({ conversationId, userId }) => {
            socket.to(conversationId).emit('user_stop_typing', { userId, conversationId });
        });

        socket.on('join_conversation', (conversationId) => {
            socket.join(conversationId);
        });

        socket.on('leave_conversation', (conversationId) => {
            socket.leave(conversationId);
        });

        socket.on('disconnect', async() => {
            console.log(`User disconnected: ${socket.id}`);

            for (const [userId, socketId] of userSockets.entries()) {
                if (socketId === socket.id) {
                    await User.findByIdAndUpdate(userId, {
                        isOnline: false,
                        lastSeen: Date.now()
                    });

                    socket.broadcast.emit('user_offline', userId);
                    userSockets.delete(userId);
                    break;
                }
            }
        });
    });
};