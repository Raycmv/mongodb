const mongoose = require('mongoose');

const animalSchemas = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
  });
  
const Animals = mongoose.model('Animal', animalSchemas);

module.exports = Animals;