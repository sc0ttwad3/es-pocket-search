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

console.log(chalk.blueBright("Reading data..."));
// only the data inside .list
jsonData = fs.readJsonSync("./data/pocket-two-list.json");
console.log(chalk.blueBright("done.\n"));

let tempMap = new Map();
// _.map(k => itemsMap.set(k, jsonData[k]), Object.keys(jsonData));
let itemsMap = _.uniq(_.map(k => tempMap.set(k, jsonData[k]), Object.keys(jsonData)));

console.log(itemsMap);

const transformItems = itemsObj => {
  const itemsMap = new Map();

  return itemsMap;
};

module.exports = {
  transformItems
};
