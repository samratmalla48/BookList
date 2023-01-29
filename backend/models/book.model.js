const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  authorname: { type: String, required: true },
  categoryname: { type: String, required: true },
  bookname : { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  image: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;