const chalk = require("chalk");
const fs = require("fs-extra");
const {dump, dd} = require("dumper.js");

/**
 * Manual curl to pull Pocket items.
 *
  $ curl -X POST -H "Content-Type:application/json" -d '{ "consumer_key": "86512-8d937c9f54e5b56cdfada556", "access_token": "623cee3a-f07c-0695-5ebe-bf053f", "detailType": "complete", "state": "all", "sort": "oldest", "count": 2 }' https://getpocket.com/v3/get | jq '.list'

 *
 */

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

module.exports = {
  getPocketItems
};
