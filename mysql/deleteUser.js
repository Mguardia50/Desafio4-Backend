import knex from "knex";
import connection from './db.js';
const Knex = knex(connection);


Knex.from('productos').where("id", 4).del()
.then( () =>console.log("Borraoh"))
.catch((e)=>console.log(e))
.finally(()=> Knex.destroy());