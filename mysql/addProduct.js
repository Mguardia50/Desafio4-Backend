/*  import knex from "knex";
import connection from './db.js';   */
const knex = require ('knex');
const connection = require("./db.js"); 
const Knex = knex(connection);
let nuncaMasRequire = require('../static/productos.js')

function agregarMYSQL () {
    const product = nuncaMasRequire
    Knex('productos').insert(product)
    .then(()=>console.log("agregado"))
    .catch((e)=>console.log(e))
    .finally(()=>Knex.destroy());
}

module.exports = agregarMYSQL (objeto, stock, precio, url);
 //export default agregarMYSQL (objeto, stock, precio, url); 