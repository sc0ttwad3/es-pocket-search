const chalk = require("chalk");
const {checkEsConnection, client, createIndexWithMappings} = require("./es-connection");
const {dd, du} = require("dumper.js");
const fastify = require("fastify")({logger: false});
require("dotenv").config();

const {getPocketItems, processPocketItems_ES, search_es_pocket_item_Id, searchById} = require("./process-items");
const port = process.env.PORT || 8888;
const mode = process.env.NODE_ENV || "unspecified";

// Routing
// --------------------------------------------------
/** HOME PAGE */
fastify.route({
  method: "GET",
  url: "/",
  schema: {
    // Examples of schema use
    // request needs to have a querystring with a `name` parameter
    //   querystring: {
    //     name: { type: 'string' }
    //   },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: "object",
        properties: {
          hello: {type: "string"}
        }
      }
    }
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return {hello: "world"};
  }
});

/** POCKET */
fastify.route({
  method: "GET",
  url: "/pocket",
  handler: async (request, reply) => {
    console.log(chalk.grey("Getting Pocket items..."));
    const pocketItems = await getPocketItems();
    console.log(`number_of_Pocket_items: ${pocketItems.length}\n`);

    console.log(chalk.grey("Processing Pocket items..."));
    //processPocketItems_ES(pocketItems);

    console.log(chalk.grey("Search for Pocket item..."));
    //search_es_pocket_item_Id();
    searchById();

    return {
      this_is: "pocket",
      pocketItems: pocketItems
    };
  }
});

/** LOGIN */
fastify.route({
  method: "GET",
  url: "/login",
  handler: async (request, reply) => {
    return {this_is: "login"};
  }
});

/** LOGOUT */
fastify.route({
  method: "GET",
  url: "/logout",
  handler: async (request, reply) => {
    return {this_is: "logout"};
  }
});

/** Callback from PocketAPI */
fastify.route({
  method: "GET",
  url: "/redirect",
  handler: async (request, reply) => {
    return {this_is: "redirect"};
  }
});

// Boostrap server!
// --------------------------------------------------
const start = async () => {
  try {
    await fastify.listen(port);
    //fastify.log.info(`server listening on ${fastify.server.address().port}`);;
    console.log(chalk.green(`[ ✓ ] server in ${mode} mode listening on ${fastify.server.address().port}`));
    console.log(chalk.greenBright("[Press CTRL-C to stop]"));
  } catch (err) {
    // fastify.log.error(err);
    console.log(chalk.redBright(`[ ✗ ] ${err}`));
    process.exit(1);
  }
};

if (process.env.NODE_ENV == "development") {
  checkEsConnection();
  createIndexWithMappings("pocket");
}

// Start the server!
start();
