const express = require('express');
const router = express.Router();
//controller
const actorsController =  require('../controllers/actors');
const { isAuthenticated } = require('../middleware/authenticate');

/**
 * @swagger
 * tags:
 *   name: Actors
 *   description: Endpoints to manager actors
 */

/**
 * @swagger
 * /actors:
 *   get:
 *     summary: get all actors
 *     tags: [Actors]
 *     responses:
 *       200:
 *         description: actors list
 */

//routes
router.get('/', actorsController.getAllActors);
router.get('/:id', actorsController.getActorById);

//CRUD
router.post('/', isAuthenticated, actorsController.createActor);
router.put('/:id', isAuthenticated, actorsController.updateActor);
router.delete('/:id', isAuthenticated, actorsController.removeActor);

module.exports = router;