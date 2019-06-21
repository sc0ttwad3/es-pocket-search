const chalk = require('chalk');
const dotenv = require('dotenv').config();
const { dd, du } = require('dumper');
const fastify = require('fastify')({ logger: false });
const GetPocket = require('node-getpocket');

const port = process.env.PORT || 8888;
const mode = process.env.NODE_ENV || "unspecified";

/**
 * OAuth 2.0 Authentication
 *
 * Using: node-getpocket module
 *
 * Will eventually use AXIOS directly.
 */

const POCKET_CONSUMER_KEY = process.env.POCKET_CONSUMER_KEY;
const POCKET_REDIRECT_URI = 'http://localhost:3000/redirect';
let   POCKET_REQUEST_TOKEN = '';
let   POCKET_ACCESS_TOKEN = '';

 /** HOME PAGE */
fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    // request needs to have a querystring with a `name` parameter
 //   querystring: {
 //     name: { type: 'string' }
 //   },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return { hello: 'world' }
  }
});

/** LOGIN */
fastify.route({
  method: 'GET',
  url: '/login',
  handler: async (request, reply) => {

    const pocket = new GetPocket({
      consumer_key: POCKET_CONSUMER_KEY,
      redirect_uri: POCKET_REDIRECT_URI
    });

    //
    //
    // MAYBE replace all this with AXIOS directly
    // in a external function?
    //
    //

    pocket.getRequestToken({ redirect_uri: POCKET_REDIRECT_URI}, (err, resp, body) => {
      if (err) {
        console.log(chalk.redBright('[ X ] ERROR gettomg RequestToken...\n', err));
      } else {
        const json = JSON.parse(body)
        POCKET_REQUEST_TOKEN = json.code;
        console.log(`Request_Token:  ${POCKET_REQUEST_TOKEN}`);
      }
    });

    pocket.getAuthorizeURL({ consumer_key: POCKET_CONSUMER_KEY, request_token: POCKET_REQUEST_TOKEN});

    pocket.getAccessToken({ request_token: POCKET_REQUEST_TOKEN}, (err, resp, body) => {
      if (err) {
        console.log(chalk.redBright('[ X ] ERROR gettomg AccessToken...\n', err));
      } else {
        const json = JSON.parse(body)
        POCKET_ACCESS_TOKEN = json.access_token;
        console.log(`Access_Token:  ${POCKET_ACCESS_TOKEN}`);
      }
    })


    return { this_is: 'login' }
  }
});

/** LOGOUT */
fastify.route({
  method: 'GET',
  url: '/logout',
  handler: async (request, reply) => {
    return { this_is: 'logout' }
  }
});

/** Callback from PocketAPI */
fastify.route({
  method: 'GET',
  url: '/redirect',
  handler: async (request, reply) => {
    return { this_is: 'redirect' }
  }
});

// Boostrap server!
const start = async () => {
  try {
    await fastify.listen(port);
    //fastify.log.info(`server listening on ${fastify.server.address().port}`);
    console.log(chalk.green(`[ ✓ ] server in ${mode} mode listening on ${fastify.server.address().port}`));
    console.log(chalk.greenBright('[Press CTRL-C to stop]'));
  } catch (err) {
    // fastify.log.error(err);
    console.log(chalk.redBright(`[ ✗ ] ${err}`));
    process.exit(1);
  }
};

// Start the server!
start();
