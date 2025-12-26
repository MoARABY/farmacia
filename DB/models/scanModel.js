const mongoose = require('mongoose')


const scanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Scan must belong to a user']
    },
    scanImage: {
        type: String,
        required: [true, 'Scan image is required']
    },
    scanType: {
        type: String,
        enum: ['X-Ray', 'MRI', 'CT-Scan', 'Ultrasound', 'Other'],
        default: 'Other'
    },
    diagnosis: {
        type: String,
        trim: true
    },
    scanDate: {
        type: Date,
        default: Date.now
    },
    confidenceScore: {
        type: Number,
        min: 0,
        max: 100
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'failed'],
        default: 'pending'
    },
    error: {
        type: String,
        trim: true
    }
}, {timestamps: true})


module.exports = mongoose.model('Scan', scanSchema)