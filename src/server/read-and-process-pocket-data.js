const chalk = require("chalk");
const fs = require("fs-extra");
const {dump, dd} = require("dumper.js");
const _ = require("rambdax");

console.log(chalk.blueBright("Reading data..."));
const items = fs.readJsonSync("./data/pocket-sorted-keys.json");
console.log(chalk.blueBright("done.\n"));
dump(items);
