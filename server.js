const express = require('express')
require('dotenv').config()
const app = express()


// Database connection
const connectDB = require('./DB/dbConnection')





const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})