const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    birthdate: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
