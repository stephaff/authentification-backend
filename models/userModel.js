const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')
const validator = require('validator')

const userModel = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

userModel.statics.inscription = async function(email, password){

    //faire les vérifications
    if(!email || !password){
        throw Error("veuillez remplir tous les champs") 
    }

    if(!validator.isEmail(email)){
        throw Error("email invalide")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("format du mot de passe incorrect")
    }

    //récupérer l'email
    const emailExistant = await this.findOne({ email })

    //vérifier si l'email existe déjà
    if(emailExistant){
        throw Error("L'email est déjà utilisé")
    }

    //crypter le mot de passe
    // const salt = bcrypt.genSalt(10)

    // const hashPassword = bcrypt.hash(password, salt)

    // const user = await this.create({ email, hashPassword })

    //si l'email n'existe pas ajouter l'utilisateur
    const user = await this.create({ email, password })

    return user
}

userModel.statics.connection = async function(email, password){

    //faire les vérifications
    if(!email || !password){
        throw Error("veuillez remplir tous les champs") 
    }

    //récupérer l'email
    const user = await this.findOne({ email })

    //vérifier si l'email existe déjà
    if(!user){
        throw Error("email incorect")
    }

    //comparer les mots de passes

    if(password === user.password){
        return user
    }
    else{
        throw Error("mot de passe incorect")
    }
}

module.exports = mongoose.model('User', userModel)