const chalk = require("chalk");
const fs = require("fs-extra");
const {dump, dd} = require("dumper.js");
const _ = require("rambdax");

/**
 * Manual curl to pull Pocket items.
 *
  $ curl -X POST -H "Content-Type:application/json" -d '{ "consumer_key": "86512-8d937c9f54e5b56cdfada556", "access_token": "623cee3a-f07c-0695-5ebe-bf053f", "detailType": "complete", "state": "all", "sort": "oldest", "count": 2 }' https://getpocket.com/v3/get | jq '.list'

 *
 */

const getPocketItemsMap = (map = new Map()) => {
  console.log(chalk.blueBright("Reading data..."));
  try {
    // only the data inside .list
    jsonData = fs.readJsonSync("./data/pocket-two-compressed.json");
    dump(jsonData);
    console.log(chalk.blueBright("done.\n"));
    let createPocketItemsMap = _.uniq(_.map(k => map.set(k, jsonData[k]), Object.keys(jsonData)));
    console.log(createPocketItemsMap);
  } catch (error) {
    console.log(chalk.red(`Failed to read data:\n ${error}`));
  }
};

// If running this file directly use this
getPocketItemsMap();

module.exports = {
  getPocketItemsMap
};
