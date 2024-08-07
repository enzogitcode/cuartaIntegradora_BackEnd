import CartRepository from "../repositories/cart.repository.js"
const cartRepository = new CartRepository()
class CartController {
    async getAllCarts (req, res) {
        try {
            const carts= await cartRepository.getAllCarts()
            res.json(carts)
        } catch (error) {
            console.log(error)
        }
    }
    async newCart(req, res) {
        try {
            const newCart = await cartRepository.createCart()
            res.json(newCart)
            console.log("Nuevo carrito creado")
        } catch (error) {
            console.log("error al crear el carrito", error)
            res.json(error)
        }
    }
    async addProducts(req, res) {

        const productId = req.params.pid;

        const cartId = req.params.cid;

        const quantity = req.body.quantity || 1;

        try {

            const cart = await cartRepository.addProducts(

                cartId,

                productId,

                quantity

            );

            res.json(cart);

        } catch (error) {

            console.log("Error en addProducts del controlador", error);

            res.status(500).json({ error: error.message });

        }
    }

    async deleteProduct(req, res) {
        const cartId = req.params.cid
        const productId = req.params.pid
        try {
            const updatedCart = await cartRepository.deleteProduct(cartId, productId)
            console.log("Producto eliminado correctamente")
            res.json(updatedCart)
        } catch (error) {
            console.log(error)
        }

    }
    async getCartById(req, res) {
        const cartId = req.params.cid
        try {
            const cart = await cartRepository.getCartById(cartId)
            if (!cart) {
                res.json("No existe un carrito con ese Id")
            }
            res.json(cart)

        } catch (error) {
            console.log(error)
            res.json(error)
        }
    }
    async updateCart(req, res) {
        const cartId = req.params.cid
        const updatedProducts = req.body
        try {
            const cart = await cartRepository.updateCart(cartId, updatedProducts)
            res.json(cart)
        } catch (error) {
            console.log(error)
        }
    }
    async updateQuantity(req, res) {
        const cartId = req.params.cid
        const productId = req.params.pid
        const newQuantity = req.body;
        try {
            const updatedCart = await cartRepository.updateProductQuantity(cartId, productId, newQuantity);
            res.json(updatedCart);
        } catch (error) {
            console.log(error)
        }
    }
    async clearCart(req, res) {
        const cartId = req.params.cid
        try {
            const cart = await cartRepository.clearCart(cartId)
            if (!cart) {
                res.json("No existe un carrito con ese Id")
            }
            res.json(cart)
            console.log("Carrito vacío", cart)

        } catch (error) {
            console.log("no se pudo vaciar el carrito", error)
        }

    }
    async purchase(req, res) { 
        
    }
}
export default CartController