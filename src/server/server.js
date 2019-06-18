const chalk = require('chalk');
const dotenv = require('dotenv').config();
const fastify = require('fastify')({ logger: false })

const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || "unspecified";

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
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
