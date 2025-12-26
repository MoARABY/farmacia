const {createScan,getScans,getMyScans,getScanById,updateScanById,deleteScanById} = require('../controllers/scanController');   
const {createScanValidator, updateScanValidator, scanIdValidator} = require('../validators/scanValidator');
const {verifyToken,allowedTo} = require('../middlewares/authMiddleware')
const { upload } = require('../middlewares/upload');
const router = require('express').Router()


router.route('/')
    .post(verifyToken, allowedTo('admin','user'), upload.single('scanImage'), createScanValidator, createScan)
    .get(verifyToken, allowedTo('admin'), getScans)
router.route('/my-scans')
    .get(verifyToken, allowedTo('user','admin'), getMyScans)
router.route('/:id')
    .get(verifyToken, allowedTo('admin','user'), scanIdValidator, getScanById)
    .put(verifyToken, allowedTo('admin','user'), scanIdValidator, upload.single('scanImage'), updateScanValidator, updateScanById)
    .delete(verifyToken, allowedTo('admin'), scanIdValidator, deleteScanById)



module.exports = router