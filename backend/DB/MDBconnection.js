const mongoose = require('mongoose')

const connectMongoDb = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('database connected');
    } catch (error) {
        console.log('error connecting to MongoDB' , error.message);
    }
}

module.exports = connectMongoDb;