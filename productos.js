const express = require ("express");
const {Router} = express;
const multer = require ('multer');
const router = Router();
const fs = require('fs');


let productos = ["un sapo", "do sapo", "tre sapo"];

let Items = [];
let datos = [];

class Contenedor {
    constructor(archivo){
        
        
        this.archivo = archivo;
    }

    getAll(){
        
            fs.promises.readFile(this.archivo) 
            .then( objetosVenta => {

            let arrayDatos = JSON.parse(objetosVenta);

            
                arrayDatos.map((element)=>{
                    Items.push({id: element.id, objeto: element.objeto, precio: element.precio, url: element.url});
                    
                })
                
            })
            .catch(err => {
                console.log(err)
            })
        
    }
}

//multer
const storage = multer.diskStorage({
    filename: (req, file, cb) =>{
        cb(null, file.fieldname)
    },
    destination: (req, file, cb) =>{
        cb(null, 'uploads')
    },
})

//ejecucion
const upload = multer({storage})

async function pushItems(){
    if (datos.length !=0){ (datos = []); }
    Items.forEach((Item)=>{datos.push(
        `<h1 style="color: blue">${Item.objeto}</h1>
        <h1 style="color: blue">${Item.precio}</h1>
        <img src=${Item.url} style="width: 150px; height: 150px"> `);
    }) 
}


let container = new Contenedor("./objetos.json");
container.getAll();


router.get('/productos', async (req, res) =>{
    /* const todo = await container.getAll(); */
    
    await pushItems();
    res.send(datos.join(" "))
})

router.get('/productos/:id', async (req, res) =>{

    await pushItems();
    const {id} = req.params;
    const product = datos[id];
    (typeof JSON.stringify(Items[id]) == "undefined") ? res.send("<h1>producto no encontrado</h1>") : res.send(`<h1 style="color: black">EL PRODUCTO ES</h1>` + product) 
})

router.post('/productos', upload.single('item',3), (req, res) =>{

    
    const {file} = req;
    const producto = req.body;
    const idProducto = Items.length;
    Items.push({id: idProducto, precio: producto.precio, objeto: producto.item, url: producto.url});
    res.send("<h1> ITEM AGREGADO :</h1> " + JSON.stringify({agregada: producto, agregado2: file, id: Items.length}))
})

router.put('/productos/:id', (req, res) =>{

    
    const {id} = req.params;
    const productUpd = req.body;
    const anterior = Items[id];
    Items[id] = productUpd;
    res.send({actualizada: productUpd, anterior: anterior})
})

router.delete('/productos/:id', (req, res) =>{

    const {id} = req.params;
    let productDel = Items[id];
    Items = Items.filter((productDel)=> productDel != Items[id]);
    
    res.send({eliminada: productDel})
})

module.exports = router;