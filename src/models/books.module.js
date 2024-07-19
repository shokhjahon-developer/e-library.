const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  isbn: {
    type: String,
    unique: true,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Book = model("Book", bookSchema);

module.exports = Book;
