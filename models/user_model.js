const mongoose = require('mongoose');

const userSchemas = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: String,
    password: String
  });
  
const Users = mongoose.model('User', userSchemas);

module.exports = Users;