const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'this email is already registered']
    },
    provider : {
        type: String,
        enum: ['local','google','facebook'],
        default: 'local'
    },
    providerId: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: [true, 'this phone number is already registered']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of Birth is required']
    },
    fetalDateOfBirth: {
        type: Date,
        required: [true, 'Fetal Date of Birth is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    profileImage: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKnkcldvTLRKwVmiqfMYdxuK04cx_OiBQnQ&s'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},{ timestamps: true }) 


module.exports = mongoose.model('User', userSchema)