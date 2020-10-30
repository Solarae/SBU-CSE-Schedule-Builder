const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const courses = require('./routes/api/courses')
const schedule = require('./routes/api/schedule')

dotenv.config({path: './config/config.env'})

connectDB()

const app = express()

app.use(express.json())
app.use('/api/courses', courses)
app.use('/api/schedule', schedule)
const PORT =  process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server running on port ${PORT}`)
)

