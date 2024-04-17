import express from 'express';
import { Server as ServerSocket } from 'socket.io';
import cors from 'cors';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new ServerSocket(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (body) => {
        console.log(body);
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(6)
        }); 
    })
})

server.listen(3001, () => {
    console.log('Server listening on port 3001');
})