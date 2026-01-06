const {signUp,logIn,logout,oauthSuccess,oauthFailure} = require('../controllers/authController')
const {createUserValidator} = require('../validators/userValidator')
const {verifyToken} = require('../middlewares/authMiddleware')
const {upload} = require('../middlewares/upload')
const passport = require('passport')
const router = require('express').Router()


router.post('/signup',upload.single('profileImage'),createUserValidator,signUp)
router.post('/login',logIn)
router.post('/logout',verifyToken,logout)

// Google OAuth routes
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/google/callback',passport.authenticate('google',{session:false,failureRedirect:'/api/auth/google/failure'}),oauthSuccess)
router.get('/google/failure',oauthFailure)

// Facebook OAuth routes
router.get('/facebook',passport.authenticate('facebook',{scope:['email']}))
router.get('/facebook/callback',passport.authenticate('facebook',{session:false,failureRedirect:'/api/auth/facebook/failure'}),oauthSuccess)
router.get('/facebook/failure',oauthFailure)


/**
 * @swagger
 * components:
 *   schemas:
 *     SignUp:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - password
 *         - dateOfBirth
 *         - fetalDateOfBirth
 *       properties:
 *         name:
 *           type: string
 *           example: Ahmed Ali
 *         email:
 *           type: string
 *           example: ahmed@example.com
 *         password:
 *           type: string
 *           example: P@ssw0rd123
 *         profileImage:
 *           type: string
 *           format: binary
 *           description: User profile image
 *         phone:
 *           type: string
 *           example: "+1234567890"
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           example: "1990-01-01"
 *         fetalDateOfBirth:
 *           type: string
 *           format: date
 *           example: "1990-01-01"
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: ahmed@example.com
 *         password:
 *           type: string
 *           example: P@ssw0rd123
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication & authorization
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create new user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Login using Google OAuth
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Google login page
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Google login successful
 *       401:
 *         description: Google authentication failed
 */

/**
 * @swagger
 * /auth/google/failure:
 *   get:
 *     summary: Google OAuth failure
 *     tags: [Authentication]
 *     responses:
 *       401:
 *         description: Google authentication failed
 */

/**
 * @swagger
 * /auth/facebook:
 *   get:
 *     summary: Login using Facebook OAuth
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Facebook login page
 */

/**
 * @swagger
 * /auth/facebook/callback:
 *   get:
 *     summary: Facebook OAuth callback
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Facebook login successful
 *       401:
 *         description: Facebook authentication failed
 */

/**
 * @swagger
 * /auth/facebook/failure:
 *   get:
 *     summary: Facebook OAuth failure
 *     tags: [Authentication]
 *     responses:
 *       401:
 *         description: Facebook authentication failed
 */



module.exports = router