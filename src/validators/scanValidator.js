const validatorMiddleware= require('../middlewares/validatorMiddleware')
const scanModel = require('../../DB/models/scanModel')
const apiError = require('../utils/apiError')
const { check } = require('express-validator')


const createScanValidator = [
    check('scanType')
        .optional()
        .isIn(['X-Ray', 'MRI', 'CT-Scan', 'Ultrasound', 'Other']).withMessage('Invalid scan type'),
    check('confidenceScore')
        .optional()
        .isFloat({ min: 0, max: 100 }).withMessage('Confidence score must be between 0 and 100'),
    check('status')
        .optional()
        .isIn(['pending', 'reviewed', 'failed']).withMessage('Invalid status value'),
    validatorMiddleware
]

const updateScanValidator = [
    check('scanType')
        .optional()
        .isIn(['X-Ray', 'MRI', 'CT-Scan', 'Ultrasound', 'Other']).withMessage('Invalid scan type'),
    check('confidenceScore')
        .optional()
        .isFloat({ min: 0, max: 100 }).withMessage('Confidence score must be between 0 and 100'),
    check('status')
        .optional()
        .isIn(['pending', 'reviewed', 'failed']).withMessage('Invalid status value'),
    validatorMiddleware
]

const scanIdValidator = [
    check('id')
        .isMongoId().withMessage('Invalid user ID format'),
    validatorMiddleware
]


module.exports = {createScanValidator, updateScanValidator, scanIdValidator}