const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema, model, mongo } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    lastname: {
      type: String,
      required: [true, 'Lastname is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      required: true,
      default: 'USER_ROLE',
      enum: ['USER_ROLE', 'ADMIN_ROLE'],
    },
    birthdate: {
      type: Date,
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, {
  message: 'already exist in the DB',
});
userSchema.plugin(mongoosePaginate);

module.exports = model('User', userSchema);
