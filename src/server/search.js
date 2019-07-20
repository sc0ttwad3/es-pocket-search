const axios = require("axios");
require("dotenv").config();

const ES_HOST = process.env.ES_HOST;
const ES_PORT = process.env.ES_PORT || 9200;
const ES_INDEX = process.env.ES_INDEX;

module.exports = {
  /** Query ES index for the provided term */
  queryTerm(term, offset = 0) {
    const body = {
      from: offset,
      query: {
        match: {
          word_count: term
        }
      },
      highlight: {fields: {excerpt: {}}}
    };

    return axios.post(`http://${ES_HOST}:${ES_PORT}/${ES_INDEX}/_search`, body).then(
      response => {
        console.log(`Searching index for ${term}...`);
        return response.data;
      },
      error => {
        console.log(error);
      }
    );
    // return client.search({index, type, body});
  }
};
