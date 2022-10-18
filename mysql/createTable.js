
const knex = require ('knex');
const connection = require("./db.js");
const Knex = knex(connection);

Knex.schema.createTable('productos', tabla =>{

    tabla.increments('id')
    tabla.string('objeto')
    tabla.float('precio')
    tabla.integer('stock')
    tabla.string('url')

})
.then(()=> console.log("tabla creada"))
.catch((e) => {console.log(e); throw e;})
.finally(() => {
    Knex.destroy();
})

//esta muere acá, no hay que crearla 20 veces, solo 1, por eso no se usa dentro de ningun js