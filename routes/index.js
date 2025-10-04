const express = require('express');
const router = express.Router();

router.use('/actors', require('./actors'));
router.use('/directors', require('./directors'));
router.use('/genres', require('./genres'));
router.use('/movies', require('./movies'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Welcome to the Library API']
    try {
        res.send('<h1>Welcome to the Library API</h1><p>Use the /books endpoint to manage books collection.</p><p>Use the /customers endpoint to manage customers collection.</p>');
        res.status(200);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
       
});

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
    req.lo(function(err) {
        if(err){ return next(err); }
        res.redirect('/');
    });
});


module.exports = router;