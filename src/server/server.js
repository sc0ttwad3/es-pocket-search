const chalk = require("chalk");
const fastify = require("fastify")({logger: false});
require("dotenv").config();

const {searchById, deleteById} = require("./controllers/articles-controller");
const search = require("./search");
const pocket = require("./pocket");

const port = process.env.PORT || 8888;
const mode = process.env.NODE_ENV || "unspecified";

// Routing

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

fastify.route({
  method: "GET",
  url: "/pocket",
  handler: async (request, reply) => {
    console.log(chalk.blue("Pulling Pocket articles/items data..."));
    const jsonData = pocket.articles();
    console.log(jsonData);
    return {this_is: "pocket"};
  }
});

/** POCKET */
fastify.route({
  method: "GET",
  url: "/search",
  handler: async (request, reply) => {
    //   console.log(chalk.grey("Search for Pocket article by Id..."));
    //   const foundArticle = await searchById();

    console.log(chalk.green("Searching: word_count for: 1221..."));
    const results = await search.queryTerm("1221");
    console.log(results);

    // console.log(chalk.redBright("Deleting article..."));
    //const result = await deleteById("323752906");

    return {
      this_is: "pocket"
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

// TODO: Add checks for working es server and "pocket" index
if (process.env.NODE_ENV == "development") {
}

// Start the server!
start();
