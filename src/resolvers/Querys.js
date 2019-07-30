const Report = require('../models/report');

const reporteByCat = (root, args) => {
    let reports = Report.findOne({category: args.name}).populate('users');
    return reports;
}

const getAllReports = async (root, args) => {
    let reports = await Report.find();
    return reports;
}

module.exports = {
    reporteByCat,
    getAllReports
}