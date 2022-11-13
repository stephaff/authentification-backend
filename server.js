require('dotenv').config({ path : 'config/.env' })

const express = require('express')
const app = express()

const mongoose = require('mongoose')

const userRoutes = require('./routes/user')

app.use(express.json())

app.use('/api/users', userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`serveur en marche sur le port ${ process.env.PORT }`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

