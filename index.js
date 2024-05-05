const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Home = require('./controllers/home_controller.js');
const session = require('express-session');

const port = process.env.PORT || 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))   //para procesar formularios recibidos

// parse application/json
app.use(bodyParser.json())          //para enviar informacion en formato json


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log("Base de datos conectadas"))
  .catch((err)=>console.log(err));


app.set('view engine', 'ejs') 
app.set('views', __dirname + '/views') 

app.use(express.static(__dirname + '/public/'));
app.use('/',session({ secret: 'xmfhgystgkfh', resave: false, saveUninitialized: false }))

app.get('/', Home); 

app.use(require('./router/bdroutes'))
app.use(require('./router/loginroutes'))

app.use((req, res, next)=>{
    res.status(404).render('404')
})

app.listen(port, () => { console.log("Server active at: http://localhost:" + port); });




