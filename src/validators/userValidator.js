const validatorMiddleware= require('../middlewares/validatorMiddleware');
const userModel = require('../../DB/models/userModel');
const apiError = require('../utils/apiError');
const { body,check } = require('express-validator')
const asyncHandler = require('express-async-handler')



const createUserValidator = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (value) => {
            const user =  await userModel.findOne({ email: value })
            if (user) {
                throw new apiError('This email is already registered', 400)
            }
            return true
        }),
    body('phone')
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone(['ar-EG']).withMessage('Invalid phone number')
        .custom(async (value) => {
            const user =  await userModel.findOne({ phone: value })
            if (user) {
                throw new apiError('This phone number is already registered', 400)
            }
            return true
        }),
    body('dateOfBirth')
        .notEmpty().withMessage('Date of Birth is required')
        .isISO8601().withMessage('Invalid date format'),
    body('fetalDateOfBirth')
        .notEmpty().withMessage('Fetal Date of Birth is required')
        .isISO8601().withMessage('Invalid date format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validatorMiddleware
]

const updateUserValidator = [
    check('email')
        .optional()
        .isEmail().withMessage('Invalid email format')
        .custom(async (value, { req }) => {
            const user =  await userModel.findOne({ email: value })
            if (user && user._id.toString() !== req.params.id) {
                throw new apiError('This email is already registered', 400)
            }
            return true
        }),
    check('phone')
        .optional()
        .isMobilePhone(['ar-EG']).withMessage('Invalid phone number')
        .custom(async (value, { req }) => {
            const user =  await userModel.findOne({ phone: value })
            if (user && user._id.toString() !== req.params.id) {
                throw new apiError('This phone number is already registered', 400)
            }
            return true
        }),
    check('dateOfBirth')
        .optional()
        .isISO8601().withMessage('Invalid date format'),
    check('fetalDateOfBirth')
        .optional()
        .isISO8601().withMessage('Invalid date format'),
    check('password')
        .optional()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validatorMiddleware
]

userIdValidator = [
    check('id')
        .isMongoId().withMessage('Invalid user ID format'),
    validatorMiddleware
]


module.exports = {createUserValidator,updateUserValidator,userIdValidator}