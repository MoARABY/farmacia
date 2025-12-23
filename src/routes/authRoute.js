const {signUp,logIn,logout,oauthSuccess,oauthFailure} = require('../controllers/authController')
const {createUserValidator} = require('../validators/userValidator')
const {verifyToken} = require('../middlewares/authMiddleware')
const passport = require('passport')
const router = require('express').Router()


router.post('/signup',createUserValidator,signUp)
router.post('/login',logIn)
router.get('/logout',verifyToken,logout)

// Google OAuth routes
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/google/callback',passport.authenticate('google',{session:false,failureRedirect:'/api/auth/google/failure'}),oauthSuccess)
router.get('/google/failure',oauthFailure)

// Facebook OAuth routes
router.get('/facebook',passport.authenticate('facebook',{scope:['email']}))
router.get('/facebook/callback',passport.authenticate('facebook',{session:false,failureRedirect:'/api/auth/facebook/failure'}),oauthSuccess)
router.get('/facebook/failure',oauthFailure)


module.exports = router