const chalk = require("chalk");
const fs = require("fs-extra");
const {dump, dd} = require("dumper.js");
const R = require("ramda");

/**
 * Manual process
 *
 *
  $ curl -X POST -H "Content-Type:application/json" -d '{ "consumerRkey": "86512-8d937c9f54e5b56cdfada556", "accessRtoken": "623cee3a-f07c-0695-5ebe-bf053f", "detailType": "complete", "state": "all", "sort": "oldest", "count": 2 }' https://getpocket.com/v3/get | jq '.list'

 *
 */
// const bulkIndex = `{index: {_index: "pocket", _id: ${itemObj.item_id}}}`;
// const bulkIndexLine = `{index: {_index: "pocket", _id: ${x}}}`;

// console.log(chalk.blueBright("Reading data..."));
jsonData = fs.readJsonSync("./data/pocket-export.json"); // only the data inside .list

// Elasticsearch Bulk API takes DNJSON where \n is the delimeter
//_.map(x => console.log(jsonData[x]), Object.keys(jsonData));
const bulkOpTemplate = key =>
  `
  {"index": {"_index": "pocket", "_id": "${key}"}}
  `.trim();

const printOps = key => {
  const articleObjAtKey = R.view(R.lensProp(key), jsonData);
  console.log(bulkOpTemplate(key));
  console.log(articleObjAtKey);
};

R.map(key => printOps(key), Object.keys(jsonData));

const pullArticles = ({detailType = "complete", state = "all", sort = "oldest", count = 2, since}) => {
  return [];
};

module.exports = {
  pullArticles
};
