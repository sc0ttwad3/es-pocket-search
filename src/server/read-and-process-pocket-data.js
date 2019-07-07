const chalk = require("chalk");
const fs = require("fs-extra");
const {dump, dd} = require("dumper.js");
const _ = require("rambdax");

console.log(chalk.blueBright("Reading data..."));
// only the data inside .list
jsonData = fs.readJsonSync("./data/pocket-two-list.json");
console.log(chalk.blueBright("done.\n"));

_.map(x => console.log(jsonData[x]), Object.keys(jsonData));
