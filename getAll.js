
const knex = require ('knex');
const connection = require("./mysql/db.js"); 
const Knex = knex(connection);




let Items = [];



 class Contenedor {

    
    constructor(table){

        this.table = table;

    }

    getAll(){


            
             Knex.from(this.table).select('*')
                .then( rows => {
                    let arrayDatos = (JSON.parse(JSON.stringify(rows)))
                    Items.push(...arrayDatos);
                    //console.log(Items)
                })
                .catch((e)=>console.log(e))
                //.finally(()=> Knex.destroy());  


        
    }


}

 let container = new Contenedor('productos');

container.getAll(); 


module.exports = Items;


