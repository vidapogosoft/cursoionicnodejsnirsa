const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

//comunicacion en tiemo real con nuestro sitio

const io = new Server(server, {
    cors:{
        origin: "http://localhost:8100",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors({
    origin:"http://localhost:8100",
    methods: ["GET", "POST"],
    credentials:true
}));

const port = 3000;
//conexion
io.on('connection', (socket) => {

    console.log("usuario conectado: ", socket.id);

    //escucha del evento
    socket.on('sendMessage', (data) => {

         console.log("mensaje recibido del cliente: ", data);

        //emite el mensaje a todos los clientes conectados
        io.emit('receiveMessage', {user: data.user, message: data.message});
    });

   socket.on('disconnet', () => {
        console.log("usuario desconectado: ", socket.id);
   });
    
});

server.listen(port,() => {
    console.log(`Servidor Socket.IO escuchando en el puerto ${port}`);
});
