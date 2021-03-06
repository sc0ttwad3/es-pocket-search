const chalk = require("chalk");
const axios = require("axios");
const fs = require("fs-extra");
const {dump, dd} = require("dumper.js");
require("dotenv").config();

const {client} = require("./es-connection");
/**
 * Manual curl to pull Pocket items.
 *
  $ curl -X POST -H "Content-Type:application/json" -d '{ "consumer_key": "86512-8d937c9f54e5b56cdfada556", "access_token": "623cee3a-f07c-0695-5ebe-bf053f", "detailType": "complete", "state": "all", "sort": "oldest", "count": 2 }' https://getpocket.com/v3/get | jq '.list'

 *
 */

const ES_INDEX = process.env.ES_INDEX;

const getPocketItems = () => {
  console.log(chalk.blueBright("Reading data..."));
  try {
    // only the data inside .list
    jsonData = fs.readJsonSync("./data/pocket-two-compressed.json");
    // console.log(chalk.blueBright("done.\n"));
    return Object.values(jsonData);
  } catch (error) {
    console.log(chalk.red(`Failed to read data:\n ${error}`));
  }
};

const indexArticle = itemObj => {
  try {
    console.log(`{ id: ${itemObj.item_id}, index: ${ES_INDEX}, body: ${itemObj} }`);
    //    client.create({
    //      id: itemObj.item_id,
    //      index: ES_INDEX,
    ///      body: itemObj
    //    });
  } catch (err) {
    console.log(chalk.red("Failed to insert pocket item:"), err);
  }
};

const updateArticle = itemObj => {
  if (client.indices.exists({index: ES_INDEX})) {
    try {
      console.log(`{ id: ${itemObj.item_id}, index: ${ES_INDEX}, body: ${itemObj} }`);
      //  client.update({
      //    id: itemObj.item_id,
      //    index: ES_INDEX,
      //    body: itemObj
      //  });
    } catch (err) {
      console.log(chalk.red("Failed to update pocket item:"), err);
    }
  }
};

const processPocketItems_ES = (arr = []) => {
  arr.forEach((_v, i) => {
    // check if Item exists already in ES
    // insert or update item in ES
    //console.log(`arr_index: ${i}: ${_v}`);
    // indexArticle(_v);
  });
};

module.exports = {
  getPocketItems,
  processPocketItems_ES
};
