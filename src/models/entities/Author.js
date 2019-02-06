const mongoose = require('mongoose');

const { Schema } = mongoose;

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  profilePicture: String,
  key: String,
});

AuthorSchema.pre('save', function () {
  if (!this.profilePicture) {
    this.profilePicture = `${process.env.APP_URL}/files/${this.key}`;
  }
});

module.exports = mongoose.model('Author', AuthorSchema);
