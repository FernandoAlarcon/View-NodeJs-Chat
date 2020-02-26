const path = require('path');
const express = require('express');
const router = express.Router();
const http = require('http');

// INVOCACION DE LA BD
const app = express();

////// SETTINGS
const port = process.env.PORT || 4040;

//// STATIC FILES
app.use(express.static(path.join(__dirname, '/public')));

let server = http.createServer(app);
//////// START
server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});

////// WEBSOCKETS
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('Conexion Realizada', socket.id);

    socket.on('chat:message', async(data) => {
        io.sockets.emit('chat:message', data);

    });

    socket.on('chat:typing', async(data) => {
        socket.broadcast.emit('chat:typing', data);
    });
});

//erickfernando_20@hotmail.com
