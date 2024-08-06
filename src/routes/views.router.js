import express from 'express'
const router= express.Router()
import ViewsController from '../controllers/view.controller.js'
const viewController= new ViewsController()

router.get("/login", viewController.renderLogin)
router.get("/register", viewController.renderRegister)

export default router