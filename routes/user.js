const express = require('express')

const router = express.Router()

const {
    login,
    signup 
} = require('../controllers/userControllers')

//login
router.post('/login', login )

//sign up
router.post('/inscription', signup)

module.exports = router