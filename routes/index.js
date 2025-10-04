const express = require('express');
const passport = require('passport');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');


router.use('/', require('./swagger'));
router.use('/actors', isAuthenticated, require('./actors'));
// router.use('/directors', require('./directors'));
// router.use('/genres', require('./genres'));
// router.use('/movies', require('./movies'));


router.get('/login', passport.authenticate('github'));

router.get('/logout', (req, res, next) => {  
  req.logout(err => {
    if (err) return next(err);  
    req.session.destroy(() => { 
      res.clearCookie('connect.sid', {
        path: '/', 
        httpOnly: true, 
        sameSite: 'lax'
      });    
      res.redirect('/');
    });
  });
});




module.exports = router;