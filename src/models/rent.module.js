const { Schema, model } = require("mongoose");

const rentSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
    index: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  rented_at: {
    type: Date,
    default: Date.now,
  },
});

const Rent = model("Rent", rentSchema);

module.exports = Rent;
