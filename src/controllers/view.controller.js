import passport from "passport";
class ViewsController {
    async renderLogin(req, res) {
        res.render("login");
    }

    async renderRegister(req, res) {
        res.render("register");
    }
    async renderUploader(req, res) {
        res.render ("uploader")
    }
    async renderRealTimeProducts(req, res) {
        res.render ("realTimeProducts")
    }
}

export default ViewsController