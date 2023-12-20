import express from 'express';
import { Server } from 'socket.io';

const PORT = 3200

const app = express();

const expressServer = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})

const io = new Server(expressServer, {
    cors: {
        origin: "*"
    }
});

io.on("connection", socket => {
    console.log(`User ${socket.id.substring(0, 5)} is connected`);

    // Send an welcome event only to the currently connected user.
    socket.emit("welcome", `Hello user-${socket.id.substring(0, 5)}. Welcome to Hello Chat.`)

    socket.on("activity", data => {
        // Send an activity event to all users except currently connected user
        socket.broadcast.emit("activity", data)
    });

    socket.on("message", data => {
        console.log(data);
        // Send a message event to all connected users.
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
    })


    socket.on("disconnect", () => {
        console.log(`User ${socket.id.substring(0, 5)} is disconnected.`)
    })
});