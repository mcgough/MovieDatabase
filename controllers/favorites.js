var express = require('express');
var router = express.Router();
var db = require('../models');

router.post('/',function(req,res){
  db.favorite.findOrCreate({where: {imdbid: req.body.imdbid, title: req.body.title, year: req.body.year, poster: req.body.poster}}).spread(function(favorite,created){
  }).then(function(data){
    res.send(data);
  });
 })


router.get('/index',function(req,res){
  db.favorite.findAll().then(function(favs){
      res.render('favorites/index', {list:favs});
    // db.comment.findAll().then(function(comment){
    // })
  })
})

router.delete('/:id',function(req,res){
  db.favorite.destroy({where: {id:req.params.id}}).then(function(){
    db.comment.destroy({where:{favoriteId: req.params.id}}).then(function(){
      res.send({result:true});
    })
  })
})


router.get('/:id/commenting',function(req,res){
  var id = req.params.id;
  res.render('favorites/comments',{id:id});
})

// router.post('/comments',function(req,res){
//   db.favorite.find({where: {id:req.body.id}}).then(function(fav){
//     fav.createComment({comment:req.body.comment}).then(function(){
//       res.redirect('/favorites/index');
//     })
//   })
// })

router.post('/couchcomments',function(req,res){
  console.log('req body',req.body);
  db.favorite.find({where: {id:req.body.id}}).then(function(fav){
    fav.createComment({comment:req.body.couchcomment}).then(function(comment){
      res.send({comment:comment});
    }).catch(function(error){
      console.log(error);
      res.send(error);

    });
  })
})






module.exports = router;