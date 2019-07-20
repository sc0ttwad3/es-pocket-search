const chalk = require("chalk");
const axios = require("axios");
const fs = require("fs-extra");
const humanizeDuration = require("humanize-duration");

const {dump, dd} = require("dumper.js");
require("dotenv").config();

const ES_HOST = process.env.ES_HOST;
const ES_PORT = process.env.ES_PORT || 9200;
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
const searchById = (id = "325344783") => {
  axios.get(`http://${ES_HOST}:${ES_PORT}/${ES_INDEX}/_doc/${id}`).then(
    response => {
      console.log("Found article");
      console.log(response.data);
      console.log("\n\n");
    },
    error => {
      console.log(error);
    }
  );
};

const deleteById = id => {
  axios.delete(`http://${ES_HOST}:${ES_PORT}/${ES_INDEX}/_doc/${id}`).then(
    response => {
      console.log("Article deleted.");
      console.log(response.data);
      console.log("\n\n");
    },
    error => {
      console.log(error);
    }
  );
};

const indexById = (article = {}) => {
  // use _create instead of _doc endpoint so if Id already exists this will fail
  axios.put(`http://${ES_HOST}:${ES_PORT}/${ES_INDEX}/_doc/${article.item_id}`, article).then(
    response => {
      console.log("Article indexed.");
      console.log(response.data);
      console.log("\n\n");
    },
    error => {
      console.log(error);
    }
  );
};

module.exports = {
  getPocketArticlesFromFile,
  searchById,
  deleteById,
  indexById
};
