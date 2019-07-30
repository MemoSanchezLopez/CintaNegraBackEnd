const Report = require('../models/report');

/**
 * Metodo para obtener los reportes por Categoria
 * @param {*} root 
 * @param {*} args 
 */
const reporteByCat = (root, args) => {
    let reports = Report.findOne({category: args.name}).populate('users');
    return reports;
}

/**
 * Metodo para obtener todos los reportes
 * @param {*} root 
 * @param {*} args 
 */
const getAllReports = async (root, args) => {
    let reports = await Report.find();
    return reports;
}

module.exports = {
    reporteByCat,
    getAllReports
}