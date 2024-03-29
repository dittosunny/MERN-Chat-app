const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')

const protectedRoute = async (req, res, next) => {
    try {
        const token =req.cookies.jwt
       

        if(!token){
            return res.status(401).json({error :"Unauthorized - no token provided for this request"})
        }
        const decoded = jwt.verify(token, process.env.jwt_secret)
           
        if (!decoded){
            return res.status(401).json({error :"Unauthorized - Invalid token"})
        }
        const user = await User.findById(decoded.userId).select("-password")
           
        if(!user){
            return res.status(401).json({error :"User not found"})
        }
        req.user = user
        next()


    } catch (error) {
        console.log('error in protectedRoute middleware:',error.message);
        res.status(500).json({error :"An unexpected error occurred while processing your request"})
    }
}   

module.exports = {protectedRoute};