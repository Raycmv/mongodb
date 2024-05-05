const express = require('express');
const router = express.Router();
const Moviesroute = require('../controllers/movie_controllers.js');
const Animalsroute = require('../controllers/animal_controller.js');
const Authent = require('../assets/authent.js');
const Chartroute = require('../controllers/chart_controllers.js');

router.get('/movies/sort/:key/:ord', Authent.sesion, Moviesroute.movierouteSort);
router.get('/movies/search/items/:page', Authent.sesion, Moviesroute.movierouteSearchItems);
router.get('/movies/search/:clm/:txt', Authent.sesion, Moviesroute.movierouteSearch);
router.get('/movies/:page', Moviesroute.movieroute);

router.get('/animals', Animalsroute.animalroute);
router.get('/animals/add-animal', Authent.sesion, Animalsroute.animalrouteAdd);
router.post('/animals/new-animal', Animalsroute.animalrouteInsert);
router.get('/animals/edit/:id', Authent.sesion, Animalsroute.animalrouteEdit);
router.post('/animals/animal-update', Authent.sesion, Animalsroute.animalrouteUpdate)
router.get('/animals/delete/:id', Authent.sesion, Animalsroute.animalrouteDelete)

router.get('/grafic', Chartroute.chart);
router.get('/grafic/json', Chartroute.chartJson);

module.exports = router;