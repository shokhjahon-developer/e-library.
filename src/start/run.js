const config = require("../../config");
const port = config.PORT;

const runner = async (app) => {
  app.listen(port, () => {
    console.log("This server is listening on port: ", port);
  });
};

module.exports = runner;
