const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn : '5d'})
}

//login
const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.connection(email, password)

        const token = createToken( user._id )

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error : error.message })
    }
}

//signup
const signup = async(req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.inscription(email, password)

        const token = createToken( user._id )

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error : error.message })
    }
}

module.exports = {
    login,
    signup 
}