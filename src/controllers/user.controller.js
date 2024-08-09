import UserModel from '../models/user.model.js'
import CartModel from '../models/cart.model.js'
import UserRepository from '../repositories/user.repository.js'
const userRepository = new UserRepository()
import { createHash, isValidPassword } from '../utils/hashbcrypt.js'

class UserController {
    async register(req, res) {
        let { first_name, last_name, email, age, password, carts, role, documents, last_connection } = req.body
        try {
            const user = await userRepository.getUserByEmail({ email })
            if (user) {
                console.log("Ya hay un usuario registrado con ese email")
                return res.status(400).send("El usuario ya existe")
            }
            const newCart = new CartModel()
            await newCart.save()
            const newUser = new UserModel({
                first_name,
                last_name,
                email,
                age,
                password: createHash(),
                carts: newCart._id,
                role,
                documents,
                last_connection
            })
            await newUser.save()
            req.session.login = true;
            req.session.user = { ...newUser._doc };
            console.log("Nuevo usuario creado", newUser)
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
            res.redirect('api/users/profile')
        } catch (error) {
            res.json(error)
            console.log(error)
        }

    }
    async profile(req, res) {

        res.render("profile", { user: req.session.user });
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
        if (req.session.login) {
            if (!req.file) {
                return res.status(400).send({ status: "error", error: "No se pudo guardar la imagen" })
            }
            console.log(req.file)
            let user= req.session.user
            user.documents= req.file.path
            res.send({status: "success", message: "Image Uploaded"})
        }
    }
}

export default UserController
