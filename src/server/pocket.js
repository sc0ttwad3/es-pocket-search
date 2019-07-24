const axios = require("axios");
const chalk = require("chalk");
const fs = require("fs-extra");
require("dotenv").config();

const POCKET_DATA_FILE = process.env.POCKET_DATA_FILE;

module.exports = {
  // pull Pocket articles/items from JSON data file
  articles() {
    console.log(chalk.green(`Pulling Pocket articles/items from ${POCKET_DATA_FILE} ...`));

    let jsonData = {};
    try {
      jsonData = fs.readJsonSync(`${POCKET_DATA_FILE}`);
    } catch (error) {
      console.log(chalk.redBright(`Error pulling data from ${POCKET_DATA_FILE}\n`), error);
    }

    return jsonData;
  }
};
