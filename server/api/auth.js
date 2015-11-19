import express from 'express';
import passport from 'passport';
import PassportGoogle from 'passport-google-oauth';
import jwt from 'jsonwebtoken';

import {jwt_secret} from '../config';

import {getOrCreateUser} from '../db';

const {OAuth2Strategy: GoogleStrategy} = PassportGoogle;

passport.use(new GoogleStrategy({
    clientID: '980785067920-jttjljs1uqskekccbs9ofinh5380lup2.apps.googleusercontent.com',
    clientSecret: 'bmH4SF194Y5V_0UYTKBOTU5k',
    callbackURL: "https://nightlife-app-download13.c9users.io/callback/google"
    },
    (accessToken, refreshToken, profile, done) => {
        let email = profile.emails[0].value;
        
        getOrCreateUser(email).then(user => {
            done(null, user);
        });
    }
));


let router = express.Router();

router.get('/login', passport.authenticate('google', {scope: 'email', session: false}));

router.get('/callback/google', passport.authenticate('google', {
    session: false
}), (req, res) => {
    if(req.user) {
        let token = jwt.sign(req.user, jwt_secret, {algorithm: 'HS256', expiresIn: '90d'});
        
        res.send(`
            <script>
            localStorage.setItem('auth_token', '${token}');
            close();
            </script>
        `);
    } else {
        res.status(401).send('No valid token found');
    }
});


export default router;


export function authMw(req, res, next) {
    let token = req.headers.authorization || '';
    
    try {
        req.user = jwt.verify(token, jwt_secret, {algorithm: 'HS256'});
    } catch(e) {}
    
    if(!req.user) {
        res.status(401).send('Must be logged in to access this endpoint');
    } else {
        next();
    }
}