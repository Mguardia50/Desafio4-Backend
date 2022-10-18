//npm i knex mysql sqlite3
//este codigo es para crear una tabla
const knex = require ("knex");
const sqliteConfig = require("./sqliteConfig.js") ;
const Knex =knex(sqliteConfig)

Knex.schema.createTable('mensajes', tabla =>{

    tabla.increments('id')
    tabla.string('autor')
    tabla.string('msj')


})
.then(()=> console.log("tabla creada"))
.catch((e) => {console.log(e); throw e;})
.finally(() => {
    Knex.destroy();
})