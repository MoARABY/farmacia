const userModel = require('../../DB/models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const signUp = asyncHandler(async(req,res)=>{
    if(req.file) {
        req.body.profileImage = req.file.path
    }
    const user = await userModel.create(req.body)
    const {password,...others} = user._doc
    user ? res.status(201).json({status:'success',msg:'user created successfully',others}) : res.status(400).json({status:'fail',msg:'user not created'})
})

const logIn = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password) return res.status(400).json('all fields are required')
    const user = await userModel.findOne({email})
    if(!user || ! await bcrypt.compare(password,user.password)) {
        return res.status(400).json('Invalid email or password')
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
    if(!token) return res.status(400).json({message:"Token not generated"})
        const {password:Pass, ...others} = user._doc
        return res.cookie('token',token,{httpOnly:true}).status(200).json({status:'success',message:'Logged in successfully',...others,token})
})

const logout = asyncHandler(async(req,res)=>{
    res.cookie('token','',{expires:new Date(0)}).status(200).json({status:'success',message:'Logged out successfully'})
})

module.exports = {signUp,logIn,logout}