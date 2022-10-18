const express = require('express');
const http = require ('http');
const fetch = require ('node-fetch');

const { urlencoded } = require("express");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

const knex = require ("knex");
const sqliteConfig ={
    client: 'sqlite3',
    connection: {
        filename: './DB/myDB.sqlite',
    },
    useNullAsDefault: true
};
const Knex =knex(sqliteConfig)

const connection = require("./mysql/db.js"); 
const Knex2 = knex(connection)


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
        //Mensajes.push(data);

        //YA SEEEE QUE NO HAY QUE MEZCLAR Y TENGO QUE IMPORTAR, PERO BANCAME ESTA PORFA!!! 
        Knex.from('mensajes').insert(data)
        .then(()=>console.log("agregado"))
        .catch((e)=>console.log(e))
        ;
        Knex.from('mensajes').select('*')
        .then( rows => {
            Mensajes = []
            let arrayDatos = (JSON.parse(JSON.stringify(rows)))
            console.table(rows)
            Mensajes.push(...arrayDatos);
            
        })
        //.then(()=>console.log("agregado"))
        .catch((e)=>console.log(e))
        .finally(()=>{
            io.sockets.emit('listaMensajes', Mensajes);
            }); 

        
    })

    socket.on('new_prod', (resp, resp2)=>{
        productos = [];
        //productos.push(resp);
        //productosAgregados.push(resp2);

        Knex2.from('productos').insert(resp2)
        .then(()=>console.log("agregado"))
        .catch((e)=>console.log(e))
        ;  
        Knex2.from('productos').select('*')
        .then( rows => {
            let arrayDatos = (JSON.parse(JSON.stringify(rows)))
            //console.table(rows)
            productos.push(...arrayDatos)
            //console.log("esto es prod" + JSON.stringify(productos))
            io.sockets.emit('cargarProductos', productos);
        })
        .catch((e)=>console.log(e))
        //const productosfinal = productos.concat(productosAgregados);

        //io.sockets.emit('cargarProductos', productos);
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

