const mongodb = require('../database/database');
const { ObjectId } = require('mongodb');

const getAllDirectors = async (req, res) => {
    try {
        const database = await mongodb.getDatabase();
        const result = await database.collection('Directors').find();
        result.toArray().then((directors) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(directors);
        });
    } catch (err) {
            res.status(500).json(result.error || 'Some error occurred while retrieving the directors.');
    }
    
};   

const getDirectorById = async (req, res) => {
    try {
        const directorId = new ObjectId(req.params.id);
        const database = await mongodb.getDatabase();
        const result = await database.collection('Directors').find({_id: directorId});
        result.toArray().then((directors) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(directors[0]);
        });
    } catch (err) {
        res.status(500).json(result.error || 'Some error occurred while retrieving the director.');
    }  
};

const getDirectorByField = async (req, res) => {//We can filter by any field with this same fuction
    console.log(req.query);
    try {
        const database = await mongodb.getDatabase();
        const result = await database.collection('Directors').find(req.query);  
        result.toArray().then((directors) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(directors);
        }); 
    } catch (err) {
        res.status(500).json(result.error || 'Some error occurred while retrieving the director.');
    }  
}

//CRUD Operations
const createDirector = async (req, res) => {
    //#swagger.tags = ['Directors']
    const newDirector = {
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        birthdate: req.body.birthdate, //MM/DD/YYYY
        nationality: req.body.nationality
    };
    try {
        const database = await mongodb.getDatabase();
        const result = await database.collection('Directors').insertOne(newDirector);
        if (result.acknowledged !== 1) {
            res.status(201).json(result.insertedId);
        } 
    } catch (err) {
        res.status(500).json(result.error || 'Some error occurred while creating the director.');
    } 
};

const updateDirector = async (req, res) => {
    //#swagger.tags = ['Directors']
    const directorId = new ObjectId(req.params.id);
    const updatedDirector = {
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        birthdate: req.body.birthdate, //MM/DD/YYYY
        nationality: req.body.nationality
    };
    try {
        const database = await mongodb.getDatabase();
        const result = await database.collection('Directors').updateOne({_id: directorId}, {$set: updatedDirector});
        if (result.modifiedCount !== 1) {
            throw err;
        } else {
            res.status(204).end();
        }
    } catch (err) {
        res.status(500).json(result.error || 'Some error occurred while updating the director.');
    }
};
    
const removeDirector = async (req, res) => {
    //#swagger.tags = ['Directors']
    try {
        const directorId = new ObjectId(req.params.id);
        const database = await mongodb.getDatabase();
        const result = await database.collection('Directors').deleteOne({_id: directorId});
        if (result.deletedCount !== 1) {
            throw err;
        } else {
            res.status(204).end();
        }
    } catch (err) {
        res.status(500).json(result.error || 'Some error occurred while deleting the director.'); 
    }
};


//Exports
module.exports = { 
    getAllDirectors,
    getDirectorById,
    getDirectorByField,
    createDirector,
    updateDirector,
    removeDirector
};