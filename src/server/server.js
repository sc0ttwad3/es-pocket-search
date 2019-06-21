const chalk = require('chalk');
const dotenv = require('dotenv').config();
const fastify = require('fastify')({ logger: false });
const pocket = require('node-getpocket');

const port = process.env.PORT || 8888;
const mode = process.env.NODE_ENV || "unspecified";

// token value assigned upon successful authentication/authorization
const POCKET_CONSUMER_KEY = process.env.POCKET_CONSUMER_KEY;
let   ACCESS_TOKEN = '';

/**
 * OAuth 2.0 Authentication
 *
 * Using: node-getpocket module
 */


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
