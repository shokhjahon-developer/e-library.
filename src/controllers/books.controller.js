const Joi = require("joi");
const Book = require("../models/books.module");

const get = async (req, res) => {
  try {
    const books = await Book.find({ available: true }).populate("author");
    console.log(books);
    res.json({ message: "Success", books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const post = async (req, res) => {
  try {
    const { title, author, isbn } = req.body;

    const schema = Joi.object({
      title: Joi.string().min(3).max(64).required(),
      author: Joi.required(),
      isbn: Joi.string().min(10).required(),
    });

    const { error } = schema.validate({ title, author, isbn });
    if (error) return res.status(400).json({ message: error.message });

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: "ISBN must be unique!" });
    }

    const newBook = await Book.create({
      title: title,
      author: author,
      isbn: isbn,
    });

    res.status(201).json({ message: "Success!", data: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        $set: { title: title, author: author, isbn: isbn },
      },
      { new: true }
    );

    if (!updatedBook) {
      return res
        .status(404)
        .json({ message: "This kind of ID has not been found!" });
    }

    res.json({ message: "Success", data: updatedBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);

    if (!deleteBook) {
      return res
        .status(404)
        .json({ message: "This kind of ID has not been found!" });
    }

    res.json({ message: "Success", deletedAuthor: deleteBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  get,
  post,
  put,
  remove,
};
