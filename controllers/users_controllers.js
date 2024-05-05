const Users = require('../models/user_model.js');
const encript = require('../assets/encript.js');
const message = require('../assets/message.js');
const hashobj = require('../assets/hash.js');
const valid = require('../assets/valid.js');


const Usersroute = {};

Usersroute.useroute = async (req, res) => {
    if(req.session.status){
        try{
            const users = await Users.find().sort({_id: -1}).limit(20);
            res.render("users", {usersArr: users, 
                message: message,
                user: req.session.user,
                status: req.session.status})
            message.resetObj();
        } catch(err){
            console.log(err);
        } 
    } else {
        res.redirect('/users/session')
    }
    
};


Usersroute.userouteInsert = async (req, res) => {
    let body = req.body;
    if (!body.code || !hashobj.valid(body.code)){
        res.status(400);
        res.send();
    }

    let validName = valid.text(body.name);
    let validEmail = valid.email(body.email);
    let validPassw = valid.password(body.password1);
    

    if(validName === 'Danger' || validEmail === 'Danger'){
        message.changeObj('Error','Does not enter unauthorized characters');
        body = null;
        res.status(400);
        res.send();
    } else if(validName === 'Invalid' || validEmail === 'Invalid'){
        message.changeObj('Error','The data is incorrect');
        body = null;
        res.status(400);
        res.send();
    } else if(validPassw === 'Invalid'){
        message.changeObj('Error','The password format is incorrect');
        body = null;
        res.status(400);
        res.send();
    } else if(body.password1 != body.password2){
        message.changeObj('Error','Passwords do not match');
        res.status(400);
        res.send();
    } else {
        const email = await Users.findOne({email: body.email});
        if(email){
            message.changeObj('Error','The email entered already exists');
            res.status(400);
            res.send();
        } else {
            try{
                let password = encript(body.password1); 
                let user = {
                    name: body.name,
                    email: body.email,
                    password
                };
                await Users.create(user);
                res.redirect("/signin");
            }catch(err){
                console.log(err);
            } 
        }
    }
};

Usersroute.userouteValidate = async (req, res) => {
    const body = req.body;     
    if (!body.code || !hashobj.valid(body.code)){
        res.redirect('/');
        return
    }
    let validEmail = valid.email(body.email);
    if(!body.email || !body.password){
        message.changeObj('Error','Fields are required');
        res.status(400);
        res.send();
    } else if(validEmail === 'Danger'){
        body.email = null;
        message.changeObj('Error','Illegal characters');
        res.status(400);
        res.send();
        return
    } else if(validEmail === 'Invalid'){
        body.email = null;
        message.changeObj('Error','The email is invalid');
        res.status(400);
        res.send();
        return
    }else{
        const password = encript(body.password);                  
         const user = await Users.findOne({email: body.email});

        if(!user || !password || password != user.password){
            body.password = null;
            message.changeObj('Error','The username or password is incorrect');
            res.status(400);
            res.send();
            return
        } else {
            req.session.user = user.name;
            if(user.email === 'raymondcmv@gmail.com'){
                req.session.status = 'admin';
            } else{
                req.session.status = null;
            }
            res.redirect('/users/session')
        }
    } 
};

Usersroute.userouteDelete = async (req, res) => {
    const id = req.params.id;
    try{
        await Users.deleteOne({_id: id});
        message.changeObj('Success','The user has been successfully deleted','greenbox');
        res.redirect("/users");
    } catch(err){
        console.log(err);
        res.render('404'); 
    }
}

Usersroute.userouteDeleteAll = async (req, res) => {
    try{
        await Users.deleteMany();
        let user = [{ name: 'Visitor', email: 'user01@gmail.com',
            password: 'dEeFfGgHDfEgFhGieFfGgHhIEfGjJlNñOrRtVwXaAcEfGjJlNñOrRtVwXaAc'
        },{ name:'Raycmv', email: 'raymondcmv@gmail.com',
            password: 'hhoSpKrHEFdiiOtPlRifgDIIpTqLsIFGeDFIjKnNoQrSvVxZaBeEgIjKnNoQ'
        }]
        await Users.create(user);
        message.changeObj('Success','Users have been successfully deleted','greenbox');
        res.redirect("/users");
    } catch(err){
        console.log(err);
        res.render('404');
    }
}

Usersroute.userouteSession = (req, res)=>{
    let status = req.session.status;
    let user = req.session.user;
    if(status){
        res.render('adminSession',{user, status})
    } else{
        res.render('userSession',{user, status})
    }
}
Usersroute.userouteLogout = (req, res)=>{
    req.session.user = null;
    req.session.status = null;
    res.redirect('/')
    message.resetObj();
}


module.exports = Usersroute;