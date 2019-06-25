const chalk = require('chalk');
const { Client } = require('@elastic/elasticsearch');


const client = new Client({
  // node: 'http://localhost:9200',
  node: process.env.ES_HOST,
});

/** Check the ES connection status */
async function checkConnection() {
  let isConnected = false;
  while (!isConnected) {
    console.log('--------------------------------------------');
    console.log('Connecting to ES...');
    try {
      const health = await client.cluster.health({});
      console.log(health);
      isConnected = true;
      console.log(chalk.greenBright('\n[✓] Connected to ES index...'));
    } catch (err) {
      console.log(chalk.red('\n[ ] Connection failed.'), err);
    } finally {
      console.log('--------------------------------------------');
      break;
    }
  }
}

checkConnection();


module.exports = {
  client,
  // resetIndex
};

