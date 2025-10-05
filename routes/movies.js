const express = require('express');
const router = express.Router();
//controller
const moviesController =  require('../controllers/movies');
const { isAuthenticated } = require('../middleware/authenticate');

//routes
router.get('/', moviesController.getAllMovies);
router.get('/findByTittle', moviesController.getMovieByField);
router.get('/findByActor', moviesController.getMovieByField);
router.get('/findByGenre', moviesController.getMovieByField);
router.get('/findByDirector', moviesController.getMovieById);
router.get('/:id', moviesController.getMovieById);

//CRUD
router.post('/', isAuthenticated, moviesController.createMovie);
router.put('/:id', isAuthenticated, moviesController.updateMovie);
router.delete('/:id', isAuthenticated, moviesController.removeMovie);

module.exports = router;