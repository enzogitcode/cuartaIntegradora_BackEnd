import express from 'express'
const router= express.Router()
import ViewsController from '../controllers/view.controller.js'
const viewsController= new ViewsController()
import passport from 'passport'

router.get("/login", viewsController.renderLogin)
router.get("/register", viewsController.renderRegister)
router.get("/uploader", viewsController. renderUploader)
router.get("/realtimeproducts", viewsController.renderRealTimeProducts)

export default router