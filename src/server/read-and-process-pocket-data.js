const chalk = require("chalk");
const fs = require("fs-extra");
const {dump, dd} = require("dumper.js");
const _ = require("rambdax");

const showProps = (obj, objName) => {
  var result = ``;
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      result += `${objName}.${i} = ${obj[i]}\n`;
    }
  }
  return result;
};

console.log(chalk.blueBright("Reading data..."));
// only the data inside .list
//const items = fs.readJsonSync("./data/pocket-two-list.json");
const jsonData = fs.readJsonSync("./data/pocket-two-list.json");
console.log(chalk.blueBright("done.\n"));

//dump(jsonData);
console.log(Object.entries(jsonData));
/*
for (let myKey in items) {
  console.log("key:" + myKey + ", value:" + items[myKey]);
}
*/
