const express = require('express');
const router = express.Router();
//controller
const moviesController =  require('../controllers/movies');
const { isAuthenticated } = require('../middleware/authenticate');

//routes
router.get('/', moviesController.getAll);
router.get('/findByTittle', moviesController.getByField);
router.get('/findByActor', moviesController.getByField);
router.get('/findByGenre', moviesController.getByField);
router.get('/findByDirector', moviesController.getByField);
router.get('/:id', moviesController.getById);

//CRUD
router.post('/', isAuthenticated, moviesController.createMovie);
router.put('/:id', isAuthenticated, moviesController.updateMovie);
router.delete('/:id', isAuthenticated, moviesController.removeMovie);

module.exports = router;