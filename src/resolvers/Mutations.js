const Report = require('../models/report');
const Users = require('../models/Users');

const createReport = async (root, args) => {
  let newReport = new Report({
    category: args.data.category,
    description: args.data.category,
    location: args.data.location,
    createdAt: args.data.createdAt,
    user: args.data.user
  });
  const myReport = await newReport.save();
  const report = await Report.findOne({_id:myReport._id}).populate('user');

  return report;
}

const createUsers = async (root, args) => {
  let newUser = new Users({
    ...args.data
  });
  const myUser = await newUser.save();
  return myUser;
}

module.exports = {
    createReport,
    createUsers
}