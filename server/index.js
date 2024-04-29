const express = require('express')
const { db } = require('./config/db')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to CodeKart visitor db')
})

const userRoute = require('./routes/user.routes')
const entryRequestRoute = require('./routes/entryRequest.routes')

app.use('/user', userRoute)
app.use('/request', entryRequestRoute)

app.listen(4500, async () => {
    try {
        await db
        console.log('connected to db');
    } catch (err) {
        console.log('not connected to db');
    }
    console.log('Server is runing in port 4500');
})