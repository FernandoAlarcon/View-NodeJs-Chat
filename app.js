const path = require('path');
const express = require('express');
const router = express.Router();

// INVOCACION DE LA BD
const app = express();

////// SETTINGS
app.set('port', process.env.PORT || 4040);

//// STATIC FILES
app.use(express.static(path.join(__dirname, '/public')));

//////// START
const server = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
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
