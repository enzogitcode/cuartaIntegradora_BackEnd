
class ViewsController {
    async renderLogin(req, res) {
        res.render("login");
    }

    async renderRegister(req, res) {
        res.render("register");
    }
    async renderProfile(req, res) {
        /* if (!req.session.login) {
            return res.redirect("/")
        } */
        //res.render("profile", { user: req.session.user });
        res.render("profile", {user: user})
    }
    async renderUploader(req, res) {
        res.render ("uploader")
    }
    async renderRealTimeProducts(req, res) {
        res.render ("realTimeProducts")
    }
}

export default ViewsController