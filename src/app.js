const express = require("express");
const { connect } = require("mongoose");
const app = express();

require("./start/model")(app, express);

async function connectToDb() {
  try {
    connect("mongodb://localhost:27017/library");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

connectToDb();

require("./start/run")(app);
