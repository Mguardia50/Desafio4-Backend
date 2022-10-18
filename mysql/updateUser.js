import knex from "knex";
import connection from './db.js';
const Knex = knex(connection);


Knex.from('productos')
.where("id", 2)
.update({nombre: 'Cataplasmaconstias'})
.then( () =>console.log("Atualizaoh"))
.catch((e)=>console.log(e))
.finally(()=> Knex.destroy());