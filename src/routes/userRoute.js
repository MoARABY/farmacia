const {createUser,getAllUsers,getUserById,updateUserById,deleteUserById} = require('../controllers/userController') 
const {createUserValidator,updateUserValidator,userIdValidator} = require('../validators/userValidator')
const {verifyToken,allowedTo} = require('../middlewares/authMiddleware')
const router = require('express').Router()

router.route('/')
    .post(verifyToken, allowedTo('admin'), createUserValidator, createUser)
    .get(verifyToken, allowedTo('admin'), getAllUsers)
router.route('/:id')
    .get(verifyToken, allowedTo('admin'), userIdValidator, getUserById)
    .put(verifyToken, allowedTo('admin'), userIdValidator, updateUserValidator, updateUserById)
    .delete(verifyToken, allowedTo('admin'), userIdValidator, deleteUserById)


module.exports = router