const scanModel = require('../../DB/models/scanModel')
const {sendScanToModel} = require('../services/modelService')
const asyncHandler = require('express-async-handler')


const createScan = asyncHandler(async (req, res) => {
    if(!req.file) return  res.status(400).json({status: 'fail', message: 'Scan image is required'})
    req.body.scanImage = req.file.path
    const {scanType, scanImage} = req.body
    const scan = await scanModel.create({scanType, scanImage, user: req.user.id,status: 'pending'})

    // Send scan to ML model for prediction
    try {
        const result = await sendScanToModel(scanImage)
        scan.status = 'reviewed'
        scan.diagnosis = result.diagnosis
        scan.confidenceScore = result.confidenceScore
        await scan.save()
    } catch (error) {
        scan.status = 'failed'
        scan.error = error.message
        await scan.save()
    }
    res.status(201).json({status: 'success', message: 'Scan created successfully', scan})
})

const getScans = asyncHandler(async (req, res) => {
    const scans = await scanModel.find()
    res.status(200).json({ status: 'success', results: scans.length, scans })
})

const getMyScans = asyncHandler(async (req, res) => {
    const scans = await scanModel.find({user: req.user.id})
    scans.length > 0 ? res.status(200).json({ status: 'success', results: scans.length, scans }) : res.status(404).json({status: 'fail', message: 'No scans found for this user'})  
})

const getScanById = asyncHandler(async (req, res) => {
    const {id} = req.params
    const scan =  await scanModel.findById(id)
    scan ? res.status(200).json({ status: 'success', scan }) : res.status(404).json({status: 'fail', message: 'Scan not found'})    
})

const updateScanById = asyncHandler(async (req, res) => {
    const {id} = req.params
    if(req.file){
        req.body.scanImage = req.file.path
    }
    const scan = await scanModel.findByIdAndUpdate(id, req.body, {new: true})
    scan ? res.status(200).json({ status: 'success', message: 'Scan updated successfully', scan }) : res.status(404).json({status: 'fail', message: 'Scan not found'})  
})

const deleteScanById = asyncHandler(async (req, res) => {
    const {id} = req.params
    const scan = await scanModel.findByIdAndDelete(id)
    scan ? res.status(200).json({ status: 'success', message: 'Scan deleted successfully' }) : res.status(404).json({status: 'fail', message: 'Scan not found'})
})

module.exports = {createScan,getScans,getMyScans,getScanById,updateScanById,deleteScanById}