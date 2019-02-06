require('dotenv').config();
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  key: String,
  active: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', function () {
  if (!this.avatar) {
    this.avatar = `${process.env.APP_URL}/files/${this.key}`;
  }
});

module.exports = mongoose.model('Users', UserSchema);
