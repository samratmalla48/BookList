const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  authorname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;