const { json } = require('express');
var express = require('express');
var router = express.Router();
const axios = require('axios').default;
var apiKey = '866970c9';


let movies = [
    {
      id: 'tt4154796',
      movie: 'Avengers : Endgame',
      yearOfRelease: 2019,
      duration: 181,
      actors: ["Robert Downey Jr", "Chris Evans"],
      poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
      boxOffice: "N/A",
      rottenTomatoesScore: 94,
    }
];


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
router.delete('/:id', (req,res) => 
{
  const { id } = req.params;

  _.remove(movie, ["id", id]);

  res.json(
    {
      message: `${id} deleted`,
    });
});

module.exports = router;
