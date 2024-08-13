import UserModel from '../models/user.model.js'
import CartModel from '../models/cart.model.js'
import UserRepository from '../repositories/user.repository.js'
const userRepository = new UserRepository()
import { createHash, isValidPassword } from '../utils/hashbcrypt.js'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import config from '../config/config.js'
const SECRET = config.SECRET
import { uploader } from '../middleware/multer.js'

class UserController {
    async register(req, res) {
        let { first_name, last_name, email, age, password, carts, role, documents, last_connection } = req.body
        try {
            const user = await userRepository.getUserByEmail(email)
            if (user) {
                console.log("Ya hay un usuario registrado con ese email")
                return res.status(400).send({ message: "El usuario ya existe" })
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
            console.log("Nuevo usuario creado", userSaved)
            const token = jwt.sign(
                { user: userSaved }, //indica que dato quiero guardar
                config.SECRET,
                { expiresIn: "24h" }
            )
            res.cookie("coderCookieToken", token, {
                maxAge: 86400,
                httpOnly: true
            }).redirect('/api/users/profile')

        } catch (error) {
            console.log("Error al registrar el usuario", error)
            res.send(error)
        }
    }
    async login(req, res) {
        let { email, password } = req.body
        try {
            const user = await userRepository.getUserByEmail(email)
            if (!user) {
                console.log("usuario no encontrado")
                res.json("usuario no encontrado")
            }
            const isValid = isValidPassword(password, user);
            if (!isValid) {
                return res.status(401).send("Contraseña incorrecta");
            }
            user.last_connection = new Date()
            const userSaved = await user.save()
            const token = jwt.sign({ user: userSaved }, SECRET, { expiresIn: "24h" })
            res.cookie("coderCookieToken", token, {
                maxAge: 3600000,
                httpOnly: true
            }).redirect('/api/users/profile')
            //este redirect funciona
        } catch (error) {
            res.json(error)
            console.log(error)
        }

    }
    async profile(req, res) {
        try {
            res.render("profile", { user: req.user.user })

        } catch (error) {
            console.log(error)
        }
    }

    async logout(req, res) {
        const token = req.cookies["coderCookieToken"]
        try {
            if (token) {
                const decoded = jwt.verify(token, SECRET)
                req.user = decoded
                const userId = decoded.user._id
                //actualizar last_connection
                const updatedUser = await UserModel.findByIdAndUpdate(userId)
                updatedUser.last_connection = new Date();
                await updatedUser.save()
            }
            else {
                res.send({message: "No se encuentra el token"})
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Error interno del servidor");
            return;
        }
        res.clearCookie("coderCookieToken").redirect("/login")
        //esta parte si
    }


    async uploadFiles(req, res) {
        const {uid} = req.params
        try {
            const user = await UserModel.findByIdAndUpdate(uid)
            if (!req.file) {
                return res.status(400).send({ status: "error", error: "No se pudo guardar la imagen" })
            }
            user.documents = req.file.path
            await user.save()
            res.send({ status: "success", message: "Image Uploaded" })

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    async changeRoles(req, res) {
        const { uid } = req.params
        try {
            const user = await UserModel.findByIdAndUpdate({ _id: uid })
            if (!user) {
                console.log("No existe un usuario con ese Id")
                res.send("No existe un usuario con ese Id")
            }
            console.log(user.role)
            await user.save()
            return user;


        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await UserModel.find()
            res.json(users)
        } catch (error) {
            res.status(500).send({ message: "No se pueden ver los usuarios" })
            console.log(error)
        }
    }
    async deleteUser(req, res) {
        const { uid } = req.params
        try {
            const user = await UserModel.findByIdAndDelete({ _id: uid })
            if (!user) {
                res.send({ message: "no existe un user con ese Id" })

            }
            res.status(201).send({ message: "usuario eliminado con éxito" })
            console.log("usuario eliminado con éxito", user)

        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
}


export default UserController
