const express = require('express');
const router = express.Router();
//controller
const directorsController =  require('../controllers/directors');
const { isAuthenticated } = require('../middleware/authenticate');

//routes
router.get('/', directorsController.getAllDirectors);
router.get('/:id', directorsController.getDirectorById);

//CRUD
router.post('/', isAuthenticated, directorsController.createDirector);
router.put('/:id', isAuthenticated, directorsController.updateDirector);
router.delete('/:id', isAuthenticated, directorsController.removeDirector);

module.exports = router;