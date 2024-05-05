const Customers = require('../models/customers_model.js');
const Chartroute = {};

Chartroute.chart = (req, res)=>{
    //insertCust()
    res.render('chart',{
        message: null,
        user: req.session.user,
        status: req.session.status
    })
}

Chartroute.chartJson = async (req, res)=>{
    try{
        const customers = await Customers.find();
        res.json(customers)
    } catch(err){
        console.log(err);
    }
}


//insertar elementos en la tabla desde un json
async function insertCust(){
    const dataset = await fetch('http://localhost:4000/assets/user.json').then(response => response.json());
    dataset.forEach((elem)=>{
        Customers.create(elem);
    })
    
}

module.exports = Chartroute;