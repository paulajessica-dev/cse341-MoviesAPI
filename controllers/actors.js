const mongodb = require('../database/database');
const { ObjectId } = require('mongodb');
const { getNextSequence } = require('../helper/helper');

const getAllActors = async (req, res) => {
    try {
        const database = await mongodb.getDatabase();
        const result = await database.collection('Actors').find();
        result.toArray().then((Actors) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(Actors);
        });
    } catch (err) {
            res.status(500).json(err.message || 'Some error occurred while retrieving the actors.');
    }
    
};   

const getActorById = async (req, res) => {
    try {
        const actorId = new ObjectId(req.params.id);
        const database = await mongodb.getDatabase();
        const result = await database.collection('Actors').find({_id: actorId});
        result.toArray().then((Actors) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(Actors[0]);
        });
    } catch (err) {
        res.status(500).json(err.message || 'Some error occurred while retrieving the actor.');
    }  
};

const getByField = async (req, res) => {//We can filter by any field with this same fuction
    console.log(req.query);
    try {
        const database = await mongodb.getDatabase();
        const result = await database.collection('Actors').find(req.query);  
        result.toArray().then((Actors) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(Actors);
        }); 
    } catch (err) {
        res.status(500).json(err.message || 'Some error occurred while retrieving the actor.');
    }  
}

//CRUD Operations
const createActor = async (req, res) => {
    //#swagger.tags = ['Actors']
    try {
        const database = await mongodb.getDatabase();        
        const nextId = await getNextSequence(database, 'Actors');
        const newActor = {
            actorId: nextId,  
            firstName: req.body.fistName,
            lastName: req.body.lastName, 
            birthdate: req.body.birthdate, 
            nationality: req.body.nationality
        };

        const result = await database.collection('Actors').insertOne(newActor);

        if (result.acknowledged === true) {
            res.status(201).json({ insertedId: result.insertedId });
        } else {
            res.status(500).json('Error inserting actor.');
        }

    } catch (err) {
        res.status(500).json(err.message || 'Some error occurred while creating the actor.');
    } 
};

const updateActor = async (req, res) => {
    //#swagger.tags = ['Actors']
    const actorId = new ObjectId(req.params.id);
    const updatedActor = {
        firstName: req.body.fistName,
        lastName: req.body.lastName, 
        birthdate: req.body.birthdate, //MM/DD/YYYY
        nationality: req.body.nationality
    };
    try {
        const database = await mongodb.getDatabase();
        const result = await database.collection('Actors').updateOne({_id: actorId}, {$set: updatedActor});
        if (result.modifiedCount !== 1) {
            throw err;
        } else {
            res.status(204).end();
        }
    } catch (err) {
        res.status(500).json(err.message || 'Some error occurred while updating the actor.');
    }
};
    
const removeActor = async (req, res) => {
    //#swagger.tags = ['Actors']
    try {
        const actorId = new ObjectId(req.params.id);
        const database = await mongodb.getDatabase();
        const result = await database.collection('Actors').deleteOne({_id: actorId});
        if (result.deletedCount !== 1) {
            throw err;
        } else {
            res.status(204).end();
        }
    } catch (err) {
        res.status(500).json(err.message || 'Some error occurred while deleting the actor.'); 
    }
};


//Exports
module.exports = { 
    getAllActors,
    getActorById,
    getByField,
    createActor,
    updateActor,
    removeActor
};


