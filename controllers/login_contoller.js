const message = require('../assets/message.js');
const hashobj = require('../assets/hash.js')
const Loginroute = {};


Loginroute.signin =  (req, res) => {
    hashobj.makeHash();
    res.render("signin",{message: message,
        user: req.session.user,
        status: req.session.status,
        code: hashobj.hash
    });
    message.resetObj();
};
Loginroute.signup =  (req, res) => {
    hashobj.makeHash();
    res.render("signup",{message: message,
        user: req.session.user,
        status: req.session.status,
        code: hashobj.hash
    });
    message.resetObj();
};

module.exports = Loginroute;