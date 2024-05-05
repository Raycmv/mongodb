const mongoose = require('mongoose');

const customerSchemas = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    active: {
        type: Number,
        required: true
    }
  });
  
const Customers = mongoose.model('Customers', customerSchemas);

module.exports = Customers;