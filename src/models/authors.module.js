const { Schema, model } = require("mongoose");

const authorsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  biography: {
    type: String,
    required: true,
  },
});

const Author = model("Author", authorsSchema);

module.exports = Author;
