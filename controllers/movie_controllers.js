const Movies = require('../models/movie_model.js');

const Moviesroute = {};
let movies = [];
let arrMovie = [];
let targ = 0;
let direc = 0;

Moviesroute.movieroute =  async (req, res) => {
    let page = parseInt(req.params.page);
    
    if(movies.length == 0){
        try{
            movies = await Movies.find().select('title year directors awards plot poster');
        } catch(err){
            res.render('404');
            console.log(err);
        }
    }

    if(page == 0 || page > Math.floor(movies.length/10)){
      res.render('404'); 
    } else {
        let pages = page * 10 < movies.length ? page * 10 : movies.length - ((page -1) * 10);

      for (let i = (pages - 10); i < pages; i++){
          arrMovie.push(movies[i])
      }
      
      res.render("movies", {moviesArr: arrMovie,
          movies: movies.length,
          current: page,
          user: req.session.user,
          status: req.session.status,
          targ, direc
      })
      arrMovie = []
    }
    
}

Moviesroute.movierouteSort = async (req, res) => {
    const obj = {}; 
    obj[req.params.key]=parseInt(req.params.ord);
    
    if(obj[req.params.key] > 0){ direc = 0} else { direc = 1};

    switch (req.params.key) {
        case 'title':
          targ = 1;
          break;
        case 'year':
          targ = 2;
          break;
        case 'directors':
          targ = 3;
          break;
        case 'awards.wins':
          targ = 4;
          break;
        case 'awards.nominations':
          targ = 5;
          break;
        default:
          targ= 0
      }

    try{
        movies = await Movies.find().sort(obj).select('title year directors awards plot poster');
        res.redirect("/movies/1")
    } catch(err){
        console.log(err);
        res.render('404');
    }
};

Moviesroute.movierouteSearch = (req, res) => {
  let clm = req.params.clm;
  let txt = req.params.txt;

  movies.forEach((elem)=>{
    if( clm == 'year' && elem[clm] == txt){
      arrMovie.push(elem)
    }else if(clm != 'year' && elem[clm].includes(txt)){
      arrMovie.push(elem)
    }
  })
  res.redirect('/movies/search/items/1')
}

Moviesroute.movierouteSearchItems = (req, res) => {
  let searchMovies = [];
  let page = parseInt(req.params.page);

    if(page == 0 || page > Math.floor(arrMovie.length/10) && arrMovie.length > 11){
      res.render('404');
    } else {
       
      if(arrMovie.length > 10){
          let pages = page * 10 < arrMovie.length ? page * 10 : arrMovie.length - ((page -1) * 10);
          for (let i = (pages - 10); i < pages; i++){
            searchMovies.push(arrMovie[i])
          }
      } else{
          for (let i = 0; i < arrMovie.length; i++){
            searchMovies.push(arrMovie[i])
          }
      }
      
      res.render("movieSearch", {
          moviesArr: searchMovies,
          movies: arrMovie.length,
          current: page,
          user: req.session.user,
          status: req.session.status,
          targ, direc
      })
    }
}

module.exports = Moviesroute;