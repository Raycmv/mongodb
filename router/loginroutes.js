const express = require('express');
const router = express.Router();
const Loginroute = require('../controllers/login_contoller.js');
const Usersroute = require('../controllers/users_controllers.js');
const Authent = require('../assets/authent.js');


router.get('/users', Authent.sesion, Usersroute.useroute);
router.get('/users/session', Authent.sesion, Usersroute.userouteSession);
router.post('/users/newuser', Usersroute.userouteInsert);
router.post('/users/validate', Usersroute.userouteValidate);
router.get('/users/delete/:id', Authent.sesion, Usersroute.userouteDelete);
router.get('/users/deleteAll', Authent.sesion, Usersroute.userouteDeleteAll);
router.get('/users/logout', Usersroute.userouteLogout);


router.get('/signin', Loginroute.signin);
router.get('/signup', Loginroute.signup);

module.exports = router;