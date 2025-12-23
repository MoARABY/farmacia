const {signUp,logIn,logout} = require('../controllers/authController')
const {createUserValidator} = require('../validators/userValidator')
const {verifyToken} = require('../middlewares/authMiddleware')
const router = require('express').Router()


router.post('/signup',createUserValidator,signUp)
router.post('/login',logIn)
router.get('/logout',verifyToken,logout)


module.exports = router