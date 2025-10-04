const express = require('express');
const router = express.Router();
//controller
const actorsController =  require('../controllers/actors');
const { isAuthenticated } = require('../middleware/authenticate');

/**
 * @swagger
 * tags:
 *   name: Actors
 *   description: Endpoints para gerenciar atores
 */

/**
 * @swagger
 * /actors:
 *   get:
 *     summary: Lista todos os atores
 *     tags: [Actors]
 *     responses:
 *       200:
 *         description: Lista de atores
 */

//routes
router.get('/', actorsController.getAll);
router.get('/:id', actorsController.getById);

//CRUD
router.post('/', isAuthenticated, actorsController.createActor);
router.put('/:id', isAuthenticated, actorsController.updateActor);
router.delete('/:id', isAuthenticated, actorsController.removeActor);

module.exports = router;