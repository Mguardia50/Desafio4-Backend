const express = require('express');
const http = require ('http');
const fetch = require ('node-fetch');

const { urlencoded } = require("express");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

let Mensajes= [];
let productos = [];
let productosAgregados = [];

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const path = require('path')
app.use(express.static('static'));


const productosRouter = require ("./productos");
app.use('/', productosRouter);



const perdimos2clases = require ("./perdidadetiempo");
app.use('/queganasdeperdertiempo', perdimos2clases);

const todohacelomismo = require ("./masdelomismo");
app.use('/yabastacoder', todohacelomismo);




io.on('connection', socket =>{
    console.log("este es el idsoquete: " + socket.id);
    

    socket.on('new_msg', (data)=>{
        console.log("esto es data " + JSON.stringify(data));
        Mensajes.push(data);
        io.sockets.emit('listaMensajes', Mensajes);
    })

    socket.on('new_prod', (resp, resp2)=>{
        productos = [];
        /* comentario importante: el maldito desafio te obligaba a usar el desafio anterior y HBS, lo cual
         hace que el each lleve a todos dentro del array, conviene hacer un renderizado y no....esta atrocidad
         en fin, me dio paja hacer todo de nuevo, pa la proxima, esta vez lo atamos con alambre*/
        productos.push(resp);
        productosAgregados.push(resp2);
        const productosfinal = productos.concat(productosAgregados);
        io.sockets.emit('cargarProductos', productosfinal);
    })

    socket.on('eliminarTodo', ()=>{
        console.log("borraoh");
        Mensajes = [];
        io.sockets.emit('listaMensajes', Mensajes);
    })

    })

server.listen(8080, ()=>{
    console.log("iniciandou...")
})

