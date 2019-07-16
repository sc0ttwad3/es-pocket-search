const chalk = require("chalk");
const axios = require("axios");
const fs = require("fs-extra");
const {dump, dd} = require("dumper.js");
require("dotenv").config();

const ES_INDEX = process.env.ES_INDEX;

const getPocketArticlesFromFile = () => {
  console.log(chalk.blueBright("Reading articles data from file..."));
  try {
    // only the data inside .list property of pocket exported .json
    jsonData = fs.readJsonSync("../../data/<need a file>");
    return Object.values(jsonData);
  } catch (error) {
    console.log(chalk.red(`Failed to read data:\n ${error}`));
  }
};

// TODO: Add argument checking to make sure ID is string
// Default hard-coded until then
let searchElasticByArticleId = (id = "325344783") => {
  axios.get(`http://localhost:9200/pocket/_doc/${id}`).then(
    response => {
      console.log(response.data);
      console.log("\n\n");
      dump(response.data);
    },
    error => {
      console.log(error);
    }
  );
};

module.exports = {
  getPocketArticlesFromFile,
  searchElasticByArticleId
};
