const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    template: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    wasContacted: {
        type: String,
        default: 'NO'
    },
    dateContacted: {
        type: String,
        default: ''
    },
    didRespond: {
        type: String,
        default: 'NO'
    },
    resultedInWork: {
        type: String,
        default: 'NO'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Company', CompanySchema);