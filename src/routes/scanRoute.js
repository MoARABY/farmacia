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



/**
 * @swagger
 * components:
 *   schemas:
 *     Scan:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         scanImage:
 *           type: string
 *           format: binary
 *           description: Uploaded scan image
 *     ScanResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 673a44f42f389b8395754abb
 *         scanImage:
 *           type: string
 *         scanDate:
 *           type: string
 *         scanType:
 *           type: string
 *         diagnosis:
 *           type: string
 *         confidenceScore:
 *           type: number
 *         status:
 *           type: string
 *         error:
 *           type: string
 *         user:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Scans
 *   description: Medical scans management
 */

/**
 * @swagger
 * /scans:
 *   post:
 *     summary: Create a new scan
 *     tags: [Scans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Scan'
 *     responses:
 *       201:
 *         description: Scan created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /scans:
 *   get:
 *     summary: Get all scans (Admin only)
 *     tags: [Scans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of scans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ScanResponse'
 *       403:
 *         description: Forbidden (Admin only)
 */

/**
 * @swagger
 * /scans/my-scans:
 *   get:
 *     summary: Get logged-in user scans
 *     tags: [Scans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User scans retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ScanResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /scans/{id}:
 *   get:
 *     summary: Get scan by ID
 *     tags: [Scans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Scan ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Scan data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScanResponse'
 *       404:
 *         description: Scan not found
 */

/**
 * @swagger
 * /scans/{id}:
 *   put:
 *     summary: Update scan by ID
 *     tags: [Scans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Scan ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Scan'
 *     responses:
 *       200:
 *         description: Scan updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Scan not found
 */

/**
 * @swagger
 * /scans/{id}:
 *   delete:
 *     summary: Delete scan by ID (Admin only)
 *     tags: [Scans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Scan ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Scan deleted successfully
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Scan not found
 */



module.exports = router