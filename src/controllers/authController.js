const userModel = require('../../DB/models/userModel')
const generateToken = require('../utils/generateToken')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const signUp = asyncHandler(async(req,res)=>{
    if(req.file) {
        req.body.profileImage = req.file.path
    }
    const {name,email,phone,password,dateOfBirth,fetalDateOfBirth} = req.body
    const user = await userModel.create({name,email,phone,password,dateOfBirth,fetalDateOfBirth,profileImage:req.body.profileImage})    
    const {password:pwd,...others} = user._doc
    user ? res.status(201).json({status:'success',message:'user created successfully',data:others}) : res.status(400).json({status:'fail',message:'user not created'})
})

const logIn = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password) return res.status(400).json({status:'fail',message:'in-valid credentials'})
    const user = await userModel.findOne({email})
    if(!user || ! await bcrypt.compare(password,user.password)) {
        return res.status(400).json({status:'fail',message:'in-valid credentials'})
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
    if(!token) return res.status(400).json({status:'fail',message:'token not generated'})
        const {password:Pass, ...others} = user._doc
        return res.cookie('token',token,{httpOnly:true}).status(200).json({status:'success',message:'Logged in successfully',data: others,token})
})

const logout = asyncHandler(async(req,res)=>{
    res.cookie('token','',{expires:new Date(0)}).status(200).json({status:'success',message:'Logged out successfully'})
})

const oauthSuccess = (req, res) => {
    if(!req.user) {
        return res.status(401).json({status:'fail',message:'OAuth authentication failed'})
    }
    const token = generateToken(req.user._id)
    token ? res.status(200).json({status:'success',message:'OAuth successful',user:req.user,token}) : res.status(400).json({message:"Token not generated"}) 
}

const oauthFailure = (req, res) => {
    res.status(401).json({status:'fail',message:'OAuth authentication failed'})
}

module.exports = {signUp,logIn,logout,oauthSuccess,oauthFailure}