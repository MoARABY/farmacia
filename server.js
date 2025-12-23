const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const passport = require('passport')
const app = express()



// built-in middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))

// Passport (initialize)
require('./src/config/passport')
app.use(passport.initialize())

// calling middlewares
const connectDB = require('./DB/dbConnection')
const globalError = require('./src/middlewares/errorMiddlewares')


// calling routes
const userRoute = require('./src/routes/userRoute')
const authRoute = require('./src/routes/authRoute')
const scanRoute = require('./src/routes/scanRoute')

// middlewares
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/scans', scanRoute)

// test route
app.get('/api', (req, res) => {
    res.status(200).json({ message: 'Welcome to farmacia APIs' })
})
app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to farmacia APIs</h1>')
})

app.use((req, res, next) => {
    res.status(404).json({ message: `Page not found - ${req.originalUrl}` })
})
app.use(globalError)


// server listening
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})

process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(() => {
        console.error(`Shutting down....`);
        process.exit(1);
    });
});