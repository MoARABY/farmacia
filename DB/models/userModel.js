const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


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
        
    },
    dateOfBirth: {
        type: Date
    },
    fetalDateOfBirth: {
        type: Date
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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('User', userSchema)