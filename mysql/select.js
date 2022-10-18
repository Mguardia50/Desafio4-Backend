
const knex = require ('knex');
const connection = require("./db.js"); 
const Knex = knex(connection);

function selectFromDb (table){

    Knex.from(table).select('*')
                .then( rows => {
                    let arrayDatos = (JSON.parse(JSON.stringify(rows)))
                    Items.push(...arrayDatos);
                    //console.log(Items)
                })
                .catch((e)=>console.log(e))
                .finally(()=> Knex.destroy()); 
            }
module.exports = selectFromDb();

