const chalk = require("chalk");
const fs = require("fs-extra");
const {dump, dd} = require("dumper.js");
const _ = require("rambdax");

/**
 * Manual process
 *
 *
  $ curl -X POST -H "Content-Type:application/json" -d '{ "consumer_key": "86512-8d937c9f54e5b56cdfada556", "access_token": "623cee3a-f07c-0695-5ebe-bf053f", "detailType": "complete", "state": "all", "sort": "oldest", "count": 2 }' https://getpocket.com/v3/get | jq '.list'

 *
 */
const bulkIndex = `{index: {_index: "pocket", _id: ${itemObj.item_id}}}`;

console.log(chalk.blueBright("Reading data..."));
// only the data inside .list
jsonData = fs.readJsonSync("./data/pocket-two-list.json");
console.log(chalk.blueBright("done.\n"));

// TODO:  Create a function to zip? the buildIndex line first, then map the jsonData line
_.map(x => console.log(jsonData[x]), Object.keys(jsonData));

const pullArticles = ({detailType = "complete", state = "all", sort = "oldest", count = 2, since}) => {
  return [];
};

module.exports = {
  pullArticles
};
