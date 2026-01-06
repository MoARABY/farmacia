const axios = require('axios')
const asyncHandler = require('express-async-handler')


const ML_API_URL = process.env.MODEL_API_ENDPOINT || 'http://127.0.0.1:8000/predict'

const sendScanToModel = asyncHandler(async (image_url) => {
    const response = await axios.post(ML_API_URL, {image_url})
    return response.data
})
        
module.exports = {sendScanToModel}