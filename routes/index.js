const express = require('express');
const passport = require('passport');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');


router.use('/', require('./swagger'));
router.use('/actors', isAuthenticated, require('./actors'));
// router.use('/directors', require('./directors'));
// router.use('/genres', require('./genres'));
// router.use('/movies', require('./movies'));

// router.get('/login', (req, res) => {
//     try {
//         const user = req.session.user; 

//         if (user) {
//             res.send(`
//                 <h1>Welcome, ${user.displayName || user.username}!</h1>`);
//         } else {
//             res.send(`
//                 <h1>You’re not signed in.</h1>                
//             `);
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });


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