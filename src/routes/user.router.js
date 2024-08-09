import express from 'express'
const router = express.Router()
import UserController from '../controllers/user.controller.js'
const userController = new UserController()
import { uploader } from '../utils/multer.js'

router.post("/login", userController.login)
router.post("/register", userController.register)
router.get("/profile", userController.profile)

//nueva ruta cambiar roles
//sólo actualizar a premium si han cargado: Identificación, Comprobante de domicilio, Comprobante de estado de cuenta
//router.put("/api/users/premium/:uid", userController.changeRole)

//nueva ruta agregar documentos
router.post("/:uid/documents", uploader.fields([{ name: 'profile', maxCount: 1 }, { name: 'documents', maxCount: 10 }, {name: 'products', maxCount: 10} ]), userController.uploadFiles)

export default router