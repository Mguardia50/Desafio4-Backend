

 class ContenedorDB {

    
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

 let container = new Contenedor("./objetos.json");

container.getAll(); 