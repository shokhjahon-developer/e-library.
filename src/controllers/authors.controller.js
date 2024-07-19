const Joi = require("joi");
const Author = require("../models/authors.module");

const get = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json({ message: "Success", data: authors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const post = async (req, res) => {
  try {
    const { name, biography } = req.body;

    const check = Joi.object({
      name: Joi.string().min(6).max(64).required(),
      biography: Joi.string().min(16).max(1024).required(),
    });

    const { error } = check.validate({ name, biography });
    if (error) return res.status(400).json({ message: error.message });

    const newAuthor = await Author.create({
      name: name,
      biography: biography,
    });

    res.status(201).json({ message: "Success!", data: newAuthor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, biography } = req.body;

    const check = Joi.object({
      name: Joi.string().min(6).max(64).required(),
      biography: Joi.string().min(16).max(1024).required(),
    });

    const { error } = check.validate({ name, biography });
    if (error) return res.status(400).json({ message: error.message });

    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      {
        $set: { name: name, biography: biography },
      },
      { new: true }
    );

    if (!updatedAuthor) {
      return res
        .status(404)
        .json({ message: "This kind of task has not been found!" });
    }

    res.json({ message: "Success", data: updatedAuthor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAuthor = await Author.findByIdAndDelete(id);

    if (!deleteAuthor) {
      return res
        .status(404)
        .json({ message: "This kind of ID has not been found!" });
    }

    res.json({ message: "Success", deletedAuthor: deleteAuthor });
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
