import multer from "multer";

//antes de instalar multer, debemos configurar dónde se almacenarán los archivos
const storage = multer.diskStorage({
    //destination hará referencia a la carpeta donde se va a guardar el archivo
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/img') //especificamos la ruta en este punto
    },
     filename: function (req, file, cb) {
        cb(null, file.originalname)
     }
})

export const uploader = multer({ storage })