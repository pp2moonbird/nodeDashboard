var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res){
  res.render('helloworld', {title: 'Hello, my world!'});
});

router.get('/userlist', function(req, res){
  var db = req.db;
  var collection  = db.get('usercollection');
  collection.find({}, {}, function(e, docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });

});


router.get('/newuser', function(req, res){
  res.render('newuser', {title: 'Add new user'})
});

router.post('/adduser', function(req, res){
  var db = req.db;

  var userName = req.body.username;
  var userEmail = req.body.useremail;

  var collection = db.get('usercollection');

  collection.insert({
    "username": userName,
    "useremail": userEmail
  }, function(err, doc) {
      if(err){
        res.send("there is a problem adding info to database.")
      }
      else{
        res.redirect("userlist");
      }
  });

});

router.get('/vue', function(req, res){
  res.render('vue', {title: 'Hello Vue'});
  var vm = new Vue({
    el: '#app',
    data: {
      message: 'Hello!Vue binding'
    }
  });
});

module.exports = router;
