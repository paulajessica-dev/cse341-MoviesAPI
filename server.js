const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const routes = require('./routes');
const { initDatabase } = require('./database/database');
const swaggerUi = require('swagger-ui-express');
const setupSwagger = require('./swagger');



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, sameSite: 'lax' }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
}));
app.use('/', require('./routes/index'));


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET_ID,
    callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


routes.get('/', (req, res) => {
    const user = req.session.user;
    res.send(user 
        ? `Logged in as ${user.displayName || user.username}` 
        : 'Logged Out'
    );
});
app.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/api-docs'}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);
setupSwagger(app);

process.on('uncaughtException', (err, origin) => {
    console.error('Unhandled exception:', err);
    console.error('Origin:', origin);
});


app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);

    try {
        await initDatabase();
        console.log('Database connected');
    } catch (err) {
        console.error('Could not connect to DB. Running without DB.');
    }
});
