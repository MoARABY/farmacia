const axios = require('axios')
const asyncHandler = require('express-async-handler')


const ML_API_URL = process.env.MODEL_API_ENDPOINT || 'http://127.0.0.1:8000/predict'

const sendScanToModel = asyncHandler(async (scanImageUrl) => {
    const response = await axios.post(ML_API_URL, {image_url: scanImageUrl})
    console.log(scanImageUrl)
    console.log('ML Model Response:', response.data)
    return response.data
})
        
module.exports = {sendScanToModel}