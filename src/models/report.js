const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    createdAt: {
        type: String,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

const Report = mongoose.model ('Report', reportSchema);
module.exports = Report;