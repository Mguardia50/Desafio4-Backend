const multer = require ('multer');



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