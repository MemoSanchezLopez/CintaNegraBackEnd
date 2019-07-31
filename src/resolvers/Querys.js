const Report = require('../models/report');
const User = require('../models/Users');

/**
 * Metodo para obtener los reportes por Categoria
 * @param {*} root 
 * @param {*} args 
 */
const reporteByCat = async (root, args) => {
    let reports = await Report.find({category: args.name}).populate('user');
    return reports;
}

/**
 * Metodo para obtener los reportes por ID
 * @param {*} root 
 * @param {*} args 
 */
const reporteById = async (root, args) => {
    let reports = await Report.findById(args.id).populate('user');
    return reports;
}

/**
 * Metodo para obtener los usuarios por nombre
 * @param {*} root 
 * @param {*} args 
 */
const userByEmail = async (root, args) => {
    let user = await User.find({email: args.email});
    return user;
}

/**
 * Metodo para obtener los usuarios por ID
 * @param {*} root 
 * @param {*} args 
 */
const userById = async (root, args) => {
    let user = await User.findById(args.id);
    return user;
}

/**
 * Metodo para obtener todos los reportes
 * @param {*} root 
 * @param {*} args 
 */
const getAllReports = async (root, args) => {
    let reports = await Report.find().populate('user');
    return reports;
}

module.exports = {
    reporteByCat,
    reporteById,
    getAllReports,
    userByEmail,
    userById
}