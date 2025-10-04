const express = require('express');
const router = express.Router();
//controller
const genresController =  require('../controllers/genres');
const { isAuthenticated } = require('../middleware/authenticate');

//routes
router.get('/', genresController.getAll);
router.get('/:id', genresController.getById);

//CRUD
router.post('/', isAuthenticated, genresController.createGenre);
router.put('/:id', isAuthenticated, genresController.updateGenre);
router.delete('/:id', isAuthenticated, genresController.removeGenre);

module.exports = router;