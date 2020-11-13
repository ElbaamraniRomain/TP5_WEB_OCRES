const { json } = require('express');
var express = require('express');
var router = express.Router();
const axios = require('axios').default;


let movies = [
    {
        id: 'tt1375666',
        movie: 'Inception',
    }
];

axios.get('/movies?ID=tt1375666')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

  
/* GET movies. */
router.get('/', (req, res) => {
    // Get List of user and return JSON
    res.status(200).json({ movies });
  });
  
  /* GET */
  router.get('/movies/:id', function(req, res, next) {
    res.render('index', { title: req.body });
  });

// Get movie by id
router.get('/:id', (req, res) => 
{
  const { id } = req.params;
  const movie = _.find(movie, ["id", id]);

  res.status(200).json(
    {
      message: "movie found", movie
    });
});

// Put new movie
router.put('/', (req, res) => 
{
  const{ movie } = req.body;
  const id = _.uniqueId();

  movie.push({movie, id});

  res.json(
    {
      message:`added ${id}`,
      movie: {movie, id}
    });
});

// Post
router.post('/:id', (req,res) => 
{
  const { id } = req.params;
  const{ movie } = req.body;

  const movieToUpdate = _.find(user, ["id, id"]);
  movieToUpdate.movie = movie;

  res.json(
    {
      message: `updated ${id} with ${movie}`
    });
});

//Delete
router.delete('/:id', (res,res) => 
{
  const { id } = req.params;

  _.remove(movie, ["id", id]);

  res.json(
    {
      message: `${id} deleted`;
    });
});

module.exports = router;
