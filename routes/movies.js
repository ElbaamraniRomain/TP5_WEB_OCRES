//const { json } = require('express');
const express = require('express');
const router = express.Router();
const axios = require('axios').default;
var _ = require('lodash');

const apikey = '866970c9';

/* BDD */
let movies = [
  {
     id: 'tt1375666',
     movie: 'Inception',
     yearOfRelease: 2010,
     duration: 148, // en minutes,
     actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"], 
     poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", // lien vers une image d'affiche,
     boxOffice: "N/A",// en USD$,
     rottenTomatoesScore: 87,
 }
]

  
/* GET all movies. */
router.get('/', (req, res) => {
    res.json(
    {
      message: "movies: ", movies
    });
  });
  
/* Get movie by id */
router.get('/:id', (req, res) => 
{
  const { id } = req.params;
  const movie = _.find(movies, ["id", id]);

  res.json(
    {
      message: "movie found", movie
    });
});

/* PUT a movie */
router.put('/', async(req, res) => 
{
  const movie = await getMovieByName(req.body.movieName);
  console.log(movie.id);
  const id = movie.id;

  movies.push( movie );

  res.json(
    {
      message:`added ${id}`,
      movie: {movie, id}
    });
});

/* POST a movie bu id */
router.post('/:id', (req,res) => 
{
  const { id } = req.params;
  const{ movie } = req.body;

  const movieToUpdate = _.find(movies, ["id", id]);
  movieToUpdate = movie;

  res.json(
    {
      message: `updated ${id} with ${movie}`
    });
});

/* DELET a user by id */
router.delete('/:id', (req,res) => 
{
  const { id } = req.params;

  _.remove(movies, ["id", id]);

  res.json(
    {
      message: `${id} deleted`,
    });
});


/* GET movie by name */
const getMovieByName = async (name) => {

  const response = await axios.get("http://www.omdbapi.com/", {
      params:{
          apikey: apikey,
          type: 'movie',
          t:name
      }
  });

  const data = await response.data;

  const movie = {
      id: data.imdbID,
      movie: data.Title,
      yearOfRelease: parseInt(data.Year),
      duration: parseInt(data.Runtime),
      actors: data.Actors.split(','),
      poster: data.Poster,
      boxOffice: data.BoxOffice,
      rottenTomatoesScore: parseInt(data.Ratings[1].Value)

  }

  return movie;
}

module.exports = router;
