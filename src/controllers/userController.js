const userModel = require('../../DB/models/userModel')
const asyncHandler = require('express-async-handler')


// admin operations
const createUser = asyncHandler(async (req, res) => {
    if (req.file) {
        // req.body.profileImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        req.body.profileImage = req.file.path
    }
    const { name, email, phone, dateOfBirth, fetalDateOfBirth, password, profileImage } = req.body

    if (!name || !email || !phone || !dateOfBirth || !fetalDateOfBirth || !password) {
        return res.status(400).json({ status: 'fail', message: 'All fields are required' })
    }
    const user = await userModel.create({
        name,
        email,
        phone,
        dateOfBirth,
        fetalDateOfBirth,
        password,
        profileImage
    })
    const {password: pwd, ...userData} = user._doc
    user ? res.status(201).json({ status: 'success', message: 'User created successfully', data: userData }) : res.status(500).json({ status: 'fail', message: 'User creation failed' })  
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userModel.find()
    res.status(200).json({ status: 'success', message: 'Users retrieved successfully', results: users.length, data: users })    
})

const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = await userModel.findById(id)
    user ? res.status(200).json({ status: 'success', message: 'User retrieved successfully', data: user }) : res.status(404).json({ status: 'fail', message: 'User not found' })    
})

const updateUserById = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (req.file) {
        // req.body.profileImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        req.body.profileImage = req.file.path
    }
    const {name, email, phone, dateOfBirth, fetalDateOfBirth, password, profileImage} = req.body
    const user = await userModel.findById(id)
    if (!user) {
        return res.status(404).json({ status: 'fail', message: 'User not found' })
    }
    user.name = name || user.name
    user.email = email || user.email
    user.phone = phone || user.phone
    user.dateOfBirth = dateOfBirth || user.dateOfBirth
    user.fetalDateOfBirth = fetalDateOfBirth || user.fetalDateOfBirth
    user.password = password || user.password
    user.profileImage = profileImage || user.profileImage
    await user.save()
    res.status(200).json({ status: 'success', message: 'User updated successfully', data: user })
})

const deleteUserById = asyncHandler(async (req, res) => { 
    const { id } = req.params
    const deletedUser = await userModel.findByIdAndDelete(id)
    deletedUser ? res.status(200).json({ status: 'success', message: 'User deleted successfully' }) : res.status(404).json({ status: 'fail', message: 'User not found' })   
})


// loggedUser operations
const getLoggedUserProfile = asyncHandler(async (req, res) => {
    req.params.id = req.user._id
    getUserById(req, res)
})

const updateLoggedUserProfile = asyncHandler(async (req, res) => {
    req.params.id = req.user._id
    updateUserById(req, res)
})

const deleteLoggedUserProfile = asyncHandler(async (req, res) => {
    req.params.id = req.user._id
    deleteUserById(req, res)
})

module.exports = {createUser,getAllUsers,getUserById,updateUserById,deleteUserById,getLoggedUserProfile,updateLoggedUserProfile,deleteLoggedUserProfile}    