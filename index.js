var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./models');
var flash = require('connect-flash');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(flash());

app.set('view engine','ejs');

app.use('/movies', require('./controllers/movies.js'));
app.use('/favorites', require('./controllers/favorites.js'));

app.get('/',function(req,res){
  res.render('index');
})

app.listen(process.env.PORT || 3000)