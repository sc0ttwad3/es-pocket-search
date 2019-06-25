const chalk = require('chalk');
const {Client} = require('@elastic/elasticsearch');
const dotenv = require('dotenv').config();

const index = process.env.ES_INDEX;
const client = new Client({node: process.env.ES_HOST});

/** Check the ES connection status */
const checkEsConnection = async () => {
  console.log('--------------------------------------------');
  console.log(chalk.blue('Connecting to elasticsearch...'));
  try {
    const health = await client.cluster.health({});
    console.log(health);
    console.log(chalk.greenBright('\n[✓] Connected to ES index...'));
  } catch (err) {
    console.log(chalk.red('\n[ ] Connection failed.'), err);
  } finally {
    console.log('--------------------------------------------');
  }
};

// DOES NOT WORK!
/** Create index and mappings */
const createIndexWithMappings = () => {
  if (client.indices.exists({index: index})) {
    console.log(chalk.red(`Index: ${index} already exists`));
  } else {
    console.log(chalk.blue(`Creating ${index} index...`));
    try {
      client.indices.create({
        index: index,
        body: index_mappings
      });
    } catch (err) {
      console.log(chalk.red('Failed to create index.'), err);
    } finally {
      console.log('--------------------------------------------');
    }
  }
};

// If running this file directly use this
// checkEsConnection();

const index_mappings = {
  mappings: {
    properties: {
      excerpt: {
        type: 'text'
      },
      favorite: {
        type: 'integer'
      },
      given_title: {
        type: 'text'
      },
      given_url: {
        type: 'text'
      },
      has_image: {
        type: 'integer'
      },
      image: {
        properties: {
          height: {
            type: 'integer'
          },
          item_id: {
            type: 'text'
          },
          src: {
            type: 'text'
          },
          width: {
            type: 'integer'
          }
        }
      },
      is_article: {
        type: 'integer'
      },
      is_index: {
        type: 'integer'
      },
      item_id: {
        type: 'text'
      },
      lang: {
        type: 'text'
      },
      resolved_id: {
        type: 'text'
      },
      resolved_title: {
        type: 'text'
      },
      resolved_url: {
        type: 'text'
      },
      sort_id: {
        type: 'integer'
      },
      status: {
        type: 'integer'
      },
      time_added: {
        type: 'date'
      },
      time_favorited: {
        type: 'date'
      },
      time_read: {
        type: 'date'
      },
      time_to_read: {
        type: 'integer'
      },
      time_updated: {
        type: 'date'
      },
      top_image_url: {
        type: 'text'
      },
      word_count: {
        type: 'integer'
      }
    }
  }
};

module.exports = {
  checkEsConnection,
  client,
  createIndexWithMappings
  // resetIndex
};
