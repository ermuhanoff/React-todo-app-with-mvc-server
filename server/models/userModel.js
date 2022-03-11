const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  secondname: {
    type: String,
    required: true
  },
});

module.exports = new model('User', userSchema);
