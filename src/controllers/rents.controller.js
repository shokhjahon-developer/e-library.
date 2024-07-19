const Joi = require("joi");
const Rent = require("../models/rent.module");
const Book = require("../models/books.module");

const get = async (req, res) => {
  try {
    const rents = await Rent.find().populate("book").populate("user");
    res.json({ message: "Success", data: rents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const post = async (req, res) => {
  try {
    const { bookId } = req.body;
    const { id } = req.user;

    const check = Joi.object({
      bookId: Joi.string().min(10).required(),
    });

    const { error } = check.validate({ bookId });
    if (error) return res.status(400).json({ message: error.message });

    const book = await Book.findById(bookId);
    if (!book || !book.available) {
      return res
        .status(400)
        .json({ message: "This kind of book is not available!" });
    }

    const newRent = await Rent.create({
      book: bookId,
      user: id,
    });

    book.available = false;
    await book.save();

    res.status(201).json({ message: "Success!", data: newRent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const remove = async (req, res) => {
  try {
    const { rentId } = req.body;

    const rental = await Rent.findById(rentId).populate("book");

    if (!rental)
      return res
        .status(400)
        .json({ message: "This kind of rent does not exist!" });

    if (!rental.book)
      return res.status(400).json({ message: "Associated book not found!" });

    rental.book.available = true;
    await rental.book.save();

    await Rent.findByIdAndDelete(rentId);

    res.json({ message: "Book returned successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  get,
  post,
  remove,
};
