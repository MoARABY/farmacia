const {createUser,getAllUsers,getUserById,updateUserById,deleteUserById,getLoggedUserProfile,updateLoggedUserProfile,deleteLoggedUserProfile} = require('../controllers/userController') 
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

router.route('/profile/me')
    .get(verifyToken, getLoggedUserProfile)
    .put(verifyToken, updateLoggedUserProfile)
    .delete(verifyToken, deleteLoggedUserProfile)



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - role
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
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           example: user
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         fetalDateOfBirth:
 *           type: string
 *           format: date
 *     UserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 673a44f42f389b8395754abb
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management (Admin only)
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create new user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden (Admin only)
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       403:
 *         description: Forbidden (Admin only)
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Logged-in user profile
 */

/**
 * @swagger
 * /users/profile/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged user profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/profile/me:
 *   put:
 *     summary: Update logged-in user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ahmed Updated
 *               email:
 *                 type: string
 *                 example: newemail@example.com
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /users/profile/me:
 *   delete:
 *     summary: Delete logged-in user account
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *       401:
 *         description: Unauthorized
 */




module.exports = router