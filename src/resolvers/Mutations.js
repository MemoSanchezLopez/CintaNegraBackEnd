const Report = require('../models/report');
const Users = require('../models/Users');
const authenticated = require('../utils/authenticated');
const storage = require('../utils/storage')

const createReport = async (root, args) => {
  let newReport = new Report({
    category: args.data.category,
    description: args.data.category,
    location: args.data.location,
    createdAt: args.data.createdAt,
    user: args.data.user
  });
  const myReport = await newReport.save();
  const report = await Report.find({_id:myReport._id}).populate('user');

  return report;
}

const createUsers = async (root, args) => {
  let newUser = new Users({
    ...args.data
  });
  const myUser = await newUser.save();
  return myUser;
}

const login = async(root, args) => {
  const token = await authenticated(args).catch((err) => {
    return err.message
  });

  return {
    token,
    message: 'OK'
  };
}

const addPhoto = async(root, args) => {
  console.log(args);
  if(args.photo){
    const { createReadStream } = await args.photo;
    const stream = createReadStream();
    console.log('stream ===> ',stream);
    const url = await storage({stream});
    await Users.findByIdAndUpdate(args.id, {img: url.url});
    return url.url;
  }
}

module.exports = {
    createReport,
    createUsers,
    login,
    addPhoto
}