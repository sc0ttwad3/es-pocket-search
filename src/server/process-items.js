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

const insertPocketItem_ES = itemObj => {
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

let searchById = async () => {
  await axios
    .get("http://localhost:9200/pocket/_search", {
      query: {
        terms: {
          _id: ["323752906", "325344783"]
        }
      }
    })
    .then(
      response => {
        console.log(response.data);
      },
      error => {
        console.log(error);
      }
    );
};

const search_es_pocket_item_Id = async (itemObj = {}) => {
  try {
    const result = await client.search({
      index: "pocket",
      body: {
        query: {
          terms: {
            //"_id": itemObj._id
            _id: "323752906"
          }
        }
      }
    });
    console.log(`result = ${result}`);
  } catch (err) {
    console.log("Error searching for _id: ", err);
  }
};

const updatePocketItem_ES = itemObj => {
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
    // insertPocketItem_ES(_v);
  });
};

module.exports = {
  getPocketItems,
  processPocketItems_ES,
  search_es_pocket_item_Id,
  searchById
};
