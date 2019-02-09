const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  authors: [
    {
      author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
      },
    },
  ],
  banner: String,
  key: String,
  permalink: {
    type: String,
    required: true,
    unique: true,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      commentedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    },
  ],
});

ArticleSchema.pre('save', function () {
  if (!this.banner) {
    this.banner = `${process.env.APP_URL}/files/${this.key}`;
  }
});

module.exports = mongoose.model('Article', ArticleSchema);
