/* import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url); */


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

const perdimos2clases = require ("./perdidadetiempo");
app.use('/queganasdeperdertiempo', perdimos2clases);

const todohacelomismo = require ("./masdelomismo");
app.use('/yabastacoder', todohacelomismo);

app.listen(8080, ()=>{
    console.log("iniciandou...")
})

