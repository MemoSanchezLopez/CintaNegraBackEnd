const mongoose = require('mongoose'); //Paquete para MongoDB connector
const Schema = mongoose.Schema; //Instanciamos un esquem
const bcrypt = require('bcrypt');
/**
 * Creamos el esquema
 */
const User = new Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    img: {
        type: String,
        default: ''
    }
});

User.pre('save', function(next){
    const user = this;
    console.log(user);
    const SALT_ROUNDS = 10;
    bcrypt.genSalt(SALT_ROUNDS, function(err, salt){
        if(err)
            return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err)
                return(err);
            user.password = hash;
            console.log(user);
            next();
        })
    })
})
const user = mongoose.model('Users', User);
module.exports = user;