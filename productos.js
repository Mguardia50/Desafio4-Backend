const express = require ("express");
const handlebars = require ('express-handlebars');
const Router = express;

const knex = require ('knex');
const connection = require("./mysql/db.js"); 
const Knex = knex(connection);

const router = Router();
const app = express();

const  Items  = require("./getAll");
const datos = require("./pushItems");


router.engine("hbs", handlebars.engine({
    extname: 'hbs',
    layoutsDir: __dirname + '/views',
    defaultLayout: 'index',
}))

router.set('views', './views');
router.set('view engine', 'hbs');


router.get('/productos', (req, res) =>{
    const  Items2  = require("./getAll");
    /* await pushItems(); */
    res.render('index', {
        layout: "index",
        greetings: "PRODUCTOS",
        compras: Items,
    })
})


router.get('/productos/:id', async (req, res) =>{

    const {id} = req.params;
    const product = Items[id];
    (typeof JSON.stringify(Items[id]) == "undefined") ? res.send("<h1>producto no encontrado</h1>") : res.send(`<h1 style="color: black">EL PRODUCTO ES</h1>` + product) 
})

router.post('/productos', (req, res) =>{
/* router.post('/productos', upload.single('item',3), (req, res) =>{ ESTO SERIA SI USO MULTER*/
    
    const {file} = req;
    const producto = req.body;
    const idProducto = Items.length;

    Knex('productos').insert({objeto: producto.item, stock: producto.stock, url: producto.url, precio: producto.precio})
    .then(()=>console.log("agregado"))
    .catch((e)=>console.log(e))
    //.finally(()=>Knex.destroy());

    res.send("<h1> ITEM AGREGADO :</h1> " + JSON.stringify({agregada: producto, agregado2: file, id: Items.length }) + `<button onclick="location.href='/productos'">IR A PRODUCTOS</button>`) 
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