const knex = require ("knex");
const sqliteConfig = require("./sqliteConfig.js") ;
const Knex =knex(sqliteConfig)


Knex('mensajes').insert(msg)
.then(()=>console.log("agregado"))
.catch((e)=>console.log(e))
.finally(()=>Knex.destroy()); 