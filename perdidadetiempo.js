const express = require ("express");
const handlebars = require ('express-handlebars');
const Router = express;

const router = Router();
const app = express();

const  Items  = require("./getAll");
const datos = require("./pushItems");


router.set('views', './views');
router.set('view engine', 'pug');


router.get('/', (req, res) =>{
   
    res.render('innecesario',{
        objetos: Items,
    });
})



module.exports = router;