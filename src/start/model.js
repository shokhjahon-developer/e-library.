require("dotenv/config");
const cookie = require("cookie-parser");

const cors = require("cors");

const authRoute = require("../routes/auth.route");
const authorsRoute = require("../routes/authors.route");
const booksRoute = require("../routes/books.route");
const rentsRoute = require("../routes/rents.route");

const modules = async (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookie());

  app.use("/api/auth", authRoute);
  app.use("/api/authors", authorsRoute);
  app.use("/api/books", booksRoute);
  app.use("/api/rents", rentsRoute);
};

module.exports = modules;
