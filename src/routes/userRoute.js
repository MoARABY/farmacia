const {createUser,getAllUsers,getUserById,updateUserById,deleteUserById} = require('../controllers/userController') 
const {createUserValidator,updateUserValidator,userIdValidator} = require('../validators/userValidator')
const router = require('express').Router()

router.route('/')
    .post(createUserValidator, createUser)
    .get(getAllUsers)
router.route('/:id')
    .get(userIdValidator, getUserById)
    .put(userIdValidator, updateUserValidator, updateUserById)
    .delete(userIdValidator, deleteUserById)


module.exports = router