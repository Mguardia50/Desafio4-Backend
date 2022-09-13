//ahora que lo pienso no creo que te necesite por el momento para renderizar
const  Items  = require("./getAll");

let datos = [];

async function pushItems(){
    if (datos.length !=0){ (datos = []); }
    Items.forEach((Item)=>{datos.push(
        `<h1 style="color: blue">${Item.objeto}</h1>
        <h1 style="color: blue">${Item.precio}</h1>
        <img src=${Item.url} style="width: 150px; height: 150px"> `);
    }) 
   
}

pushItems();

module.exports = datos;