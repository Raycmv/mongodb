
const Authent = {};

Authent.sesion = function (req, res, next){
    if (req.session.user) {
        next()
    } else {
        res.redirect("/signin")
    }
}


module.exports = Authent;