const jwt = require('jsonwebtoken')

const generateTokenandCookie = (userId,res)=>{
    const token = jwt.sign({ userId }, process.env.jwt_secret, {
        expiresIn:"15d"
    })
    res.cookie('jwt', token, {
        maxAge: 15*24*60*60*1000,
        httpOnly: true,//prevent xss attacks cross site scripting
        sameSite:"strict",//csrf attacks  cross site forgery protection
        secure:process.env.Node_env !== 'development'
    })
  
}

module.exports = { generateTokenandCookie };