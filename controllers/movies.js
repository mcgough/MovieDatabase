var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

router.get('/',function(req,res){
  var query = req.query.q;
  var url = 'http://www.omdbapi.com/?s=' + query;
  console.log('here!!!!!!!!',query);
  request(url,function(error,response,data){
    if(!error && response.statusCode === 200) {
      var parsedMovies = JSON.parse(data);
      var objResults = parsedMovies.Search;
      console.log('#######',objResults);
      // res.send(parsedMovies);
      if(parsedMovies.Search) {
        res.render('movies/index',parsedMovies);
      }else{
        res.render('movies/error');
      }
    } else {
      console.log('error!!!',error,response.statusCode);
    }
  })
})

router.get('/:id',function(req,res){
  var id = req.params.id;
  var url = 'http://www.omdbapi.com/?i=' + id + '&plot=full&tomatoes=true';
  request(url,function(error,response,data){
    if(!error && response.statusCode === 200) {
      console.log(data);
      var parsedMovieInfo = JSON.parse(data);
      // res.send(parsedMovieInfo.imdbID);
      db.favorite.find({where: {imdbid:parsedMovieInfo.imdbID}}).then(function(data){
        if(data){
          parsedMovieInfo.favorited = true;
          res.render('movies/show',parsedMovieInfo);
        }else{
          parsedMovieInfo.favorited = false;
          res.render('movies/show', parsedMovieInfo);
        }
      });
    }
  })
})

router.delete('/:id',function(req,res){
  db.favorite.destroy({where: {'imdbid':req.params.id}}).then(function(){
    res.send({deleted:true});
  })
})



module.exports = router;