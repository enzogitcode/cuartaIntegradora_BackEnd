import UserModel from '../models/user.model.js'
import CartModel from '../models/cart.model.js'
import UserRepository from '../repositories/user.repository.js'
const userRepository = new UserRepository()
import { createHash, isValidPassword } from '../utils/hashbcrypt.js'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import config from '../config/config.js'
const SECRET= config.SECRET
import { uploader } from '../middleware/multer.js'

class UserController {
    async register(req, res) {
        let { first_name, last_name, email, age, password, carts, role, documents, last_connection } = req.body
        try {
            const user = await userRepository.getUserByEmail(email)
            if (user) {
                console.log("Ya hay un usuario registrado con ese email")
                return res.status(400).send({ status: "failed" }, { message: "El usuario ya existe" })
            }
            const newCart = new CartModel();
            const newUser = new UserModel({
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                carts: newCart._id,
                role,
                documents,
                last_connection
            })
            await newCart.save()
            const userSaved = await newUser.save()
            /* req.session.login = true;
            req.session.user = { ...newUser._doc }; */
            console.log("Nuevo usuario creado", newUser)
            const token = jwt.sign(
                { id: userSaved._id }, //indica que dato quiero guardar
                config.SECRET,
                { expiresIn: 86400 }
            )
            res.cookie("coderCookieToken", token, {
                maxAge: 86400,
                httpOnly: true
            })
            res.redirect('api/users/profile')

        } catch (error) {
            console.log("Error al registrar el usuario", error)
            res.send(error)
        }
    }
    async login(req, res) {
        let { email, password } = req.body
        try {
            const user = await findOne({ email })
            if (!user) {
                console.log("usuario no encontrado")
                res.json("usuario no encontrado")
            }
            const isValid = isValidPassword(password, user);
            if (!isValid) {
                return res.status(401).send("Contraseña incorrecta");
            }
            const token= jwt.sign({user:user}, SECRET, {expiresIn: 86400})
            res.cookie("coderCookieToken", token, {
                maxAge: 86400,
                httpOnly: true
            })
            res.redirect('api/users/profile')
        } catch (error) {
            res.json(error)
            console.log(error)
        }

    }
    async profile(req, res) {
        try {
            if (req.session.user) {
                res.render("profile", { user: req.session.user })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async logout(req, res) {
        if (req.session.login) {
            req.session.destroy();
        }
        res.redirect("api/users/login")
    }
    async admin() {

    }
    async uploadFiles(req, res) {
        const uid = req.params.uid
        const user = await UserModel.findById(uid)

        if (!req.file) {
            return res.status(400).send({ status: "error", error: "No se pudo guardar la imagen" })
        }
        console.log(req.file)
        user.documents = req.file.path
        res.send({ status: "success", message: "Image Uploaded" })

    }
}

export default UserController
