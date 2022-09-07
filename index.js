const { urlencoded } = require("express");
const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const path = require('path')
app.use(express.static('static'));

const productos = [];




const productosRouter = require ("./productos");
app.use('/', productosRouter);




app.listen(8080, ()=>{
    console.log("iniciandou...")
})

