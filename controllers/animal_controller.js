const Animals = require('../models/animal_model.js');
const funcdefault = require('../assets/data.js');
const message = require('../assets/message.js');
const valid = require('../assets/valid.js')

const Animalsroute = {};

Animalsroute.animalroute = async (req, res) => {
    try{
        const animals = await Animals.find().sort({ _id: -1 }).limit(20);
        if(animals.length === 0 || animals.length > 20){
            await funcdefault();
        }
        res.render("animals", {animalsArr: animals,
            user: req.session.user,
            status: req.session.status
        })
    } catch(err){
        console.log(err);
    }
};

Animalsroute.animalrouteAdd =  (req, res) => {
    res.render("add-animal", {message: message,
        user: req.session.user,
        status: req.session.status
    })
    message.resetObj();
};

Animalsroute.animalrouteInsert = async (req, res) => {
    const body = req.body;
    let validName = valid.text(body.name);
    let validType = valid.text(body.type);
    let validColor = valid.text(body.color);
    let validSize = valid.number(body.size);

    if(validName === 'Danger' || validType === 'Danger' || validColor  === 'Danger' || validSize  === 'Danger'){
        message.changeObj('Error','😠 No introdusca caracteres no autorizados');
        res.status(400);
        res.redirect("/animals/add-animal");
        return
    } else if(validName === 'Invalid' || validType === 'Invalid' || validColor  === 'Invalid' || validSize  === 'Invalid'){
        message.changeObj('Error','Los datos introducidos son incorrectos');
        res.status(400);
        res.redirect("/animals/add-animal");
        return
    } else if (body.size.length > 3){
        message.changeObj('Error','El numero introducido es incorrecto');
        res.status(400);
        res.redirect("/animals/add-animal");
        return
    } else {
       try{
            await Animals.create(body);
            res.redirect("/animals")
        }catch(err){
            console.log(err);
        } 
    }
    
};

Animalsroute.animalrouteEdit =async (req, res) => {
    const id = req.params.id;
    try{
        const animals = await Animals.findOne({_id: id});
        res.render("animal-edit",{animal: animals,
            message: message,
            user: req.session.user,
            status: req.session.status
        });
        message.resetObj();
    } catch(err){
        console.log(err);
        res.render('404');
    }
    
};

Animalsroute.animalrouteUpdate = async (req, res) => {
    const body = req.body;
    let validName = valid.text(body.name);
    let validType = valid.text(body.type);
    let validColor = valid.text(body.color);
    let validSize = valid.number(body.size);

    if(validName === 'Danger' || validType === 'Danger' || validColor  === 'Danger' || validSize  === 'Danger'){
        message.changeObj('Error','😠 No introdusca caracteres no autorizados');
        res.status(400);
        res.redirect("/animals/edit/"+ body.id);
        return
    } else if(validName === 'Invalid' || validType === 'Invalid' || validColor  === 'Invalid' || validSize  === 'Invalid'){
        message.changeObj('Error','Los datos introducidos son incorrectos');
        res.status(400);
        res.redirect("/animals/edit/"+ body.id);
        return
    } else if (body.size.length > 3){
        message.changeObj('Error','El numero introducido es incorrecto');
        res.status(400);
        res.redirect("/animals/edit/"+ body.id);
        return
    } else {
        try{
            await Animals.findByIdAndUpdate(body.id, body);
            res.redirect("/animals");
        }catch(err){
            console.log(err);
        }
    }
};

Animalsroute.animalrouteDelete = async (req, res) => {
    const id = req.params.id;
    try{
        await Animals.deleteOne({_id: id});
        res.redirect("/animals");
    } catch(err){
        console.log(err);
        res.render('404');
    }
    
}


module.exports = Animalsroute;