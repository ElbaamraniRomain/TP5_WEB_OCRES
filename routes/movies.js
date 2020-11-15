const { json } = require('express');
const express = require('express');
const router = express.Router();
const axios = require('axios').default;
var _ = require('lodash');

const apikey = '866970c9';
const apiUrl = 'http://www.omdbapi.com/';



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
]

  
/* GET movies. */
router.get('/', (req, res) => {
    res.json(
    {
      message: "movies: ", movies
    });
  });
  
// Get movie by id
router.get('/:id', (req, res) => 
{
  const { id } = req.params;
  const movie = _.find(movies, ["id", id]);

  res.json(
    {
      message: "movie found", movie
    });
});

// Put new movie
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

// Post
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

//Delete
router.delete('/:id', (req,res) => 
{
  const { id } = req.params;

  _.remove(movies, ["id", id]);

  res.json(
    {
      message: `${id} deleted`,
    });
});



const getMovieById = async (id) => {

  const response = await axios.get(apiUrl, {
      params:{
        apikey: apikey,
        type: 'movie',
        i:id
      }
  });

  const data = await response.data; //Get the data

  //Create a movie object with the data fetched => convert all string
  const movie = {
      id: id,
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

//Function that return a movie by its name
const getMovieByName = async (name) => {

  const response = await axios.get(apiUrl, {
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
