var express = require('express');
var router = express.Router();

/* GET */
router.get('/movies', function(req, res, next){
  res.render('index', { title: 'ifrjrfjreu' });
});

/* GET */
router.get('/movies/:id', function(req, res, next) {
  res.render('index', { title: req.body });
});


/* PUT */
router.put('/movies/', function(req, res, next) {
  res.render('index', { title: req.params.id });
});

/* POST */
router.put('/movies/', function(req, res, next) {
  res.render('index', { title: req.params.id });
});

module.exports = router;
