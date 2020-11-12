var express = require('express');
var router = express.Router();

let movies = [
    {
        id: 'tt1375666',
        movie: 'Inception',
    }
];

/* GET movie listing. */
router.get('/', (req, res) => {
    // Get List of user and return JSON
    res.status(200).json({ movies });
  });
  
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
