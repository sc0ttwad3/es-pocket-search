const axios = require("axios");
require("dotenv").config();

const ES_HOST = process.env.ES_HOST;
const ES_PORT = process.env.ES_PORT || 9200;
const ES_INDEX = process.env.ES_INDEX;

module.exports = {
  /** Query ES index for the provided term */
  indexArticle(itemObj) {
    console.log(`{ id: ${itemObj.item_id}, index: ${ES_INDEX}, body: ${itemObj} }`);

    /*
    return axios.post(`http://${ES_HOST}:${ES_PORT}/${ES_INDEX}/_doc/${itemObj.item_id}`, itemObj).then(
      response => {
        console.log(`Successfully indexed article: ${itemObj.item_id}`);
        return response.data;
      },
      error => {
        console.log(chalk.red(`Failed to index/insert article: ${itemObj.item_id}\n`, error));
      }
    );
    */
  }
};
