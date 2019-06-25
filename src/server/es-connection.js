const chalk = require('chalk');
const { Client } = require('@elastic/elasticsearch');
const dotenv = require('dotenv').config();


const client = new Client({
  // node: 'http://localhost:9200',
  node: process.env.ES_HOST,
});

/** Check the ES connection status */
const checkEsConnection = async () => {
  console.log('--------------------------------------------');
  console.log('Connecting to ES...');
  try {
    const health = await client.cluster.health({});
    console.log(health);
    console.log(chalk.greenBright('\n[✓] Connected to ES index...'));
  } catch (err) {
    console.log(chalk.red('\n[ ] Connection failed.'), err);
  } finally {
    console.log('--------------------------------------------');
  }
}

// If running this file directly use this
// checkEsConnection();


module.exports = {
  checkEsConnection,
  client,
  // resetIndex
};

