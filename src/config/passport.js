const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const userModel = require('../../DB/models/userModel')




// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userModel.findOne({ provider: 'google', providerId: profile.id });
        if (!user) {
            user = await userModel.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                profileImage: profile.photos[0].value,
                provider: 'google',
                providerId: profile.id,
                // password: Math.random().toString(36).slice(-8), // generate a random password
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
    }
))


// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails', 'photos']
},
    async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userModel.findOne({ provider: 'facebook', providerId: profile.id });
        if (!user) {
            user = await userModel.create({
                name: profile.displayName,
                email: profile.emails?.[0]?.value || `fb_${profile.id}@facebook.com`,
                profileImage: profile.photos[0].value,
                provider: 'facebook',
                providerId: profile.id,
                // password: Math.random().toString(36).slice(-8), // generate a random password
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
    }
))