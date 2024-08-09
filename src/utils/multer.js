import multer from "multer";

//antes de instalar multer, debemos configurar dónde se almacenarán los archivos
const storage = multer.diskStorage({
    //destination hará referencia a la carpeta donde se va a guardar el archivo
    destination: function (req, file, cb) {
        //especificamos la ruta en este punto
        if (file.fieldname === 'profile') {
            cb(null, './src/public/imgs/profile')
        }
        else if (file.fieldname === 'documents') {
            cb(null, './src/public/imgs/documents')
        }
        else if (file.fieldname === 'products') {
            cb(null, './src/public/imgs/products')
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const uploader = multer({ storage })