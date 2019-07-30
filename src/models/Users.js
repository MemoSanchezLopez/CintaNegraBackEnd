const mongoose = require('mongoose'); //Paquete para MongoDB connector
const Schema = mongoose.Schema; //Instanciamos un esquem

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

const user = mongoose.model('Users', User);
module.exports = user;