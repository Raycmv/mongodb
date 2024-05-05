const message = require('../assets/message.js');

const Home = (req, res)=>{
    res.render("index", {
        titulo: "Interaction with mongoDB", 
        user: req.session.user,
        status: req.session.status
    }); 
    message.resetObj();
}


module.exports = Home;