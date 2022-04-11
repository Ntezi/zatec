const { logger } = require('./logging')(module);

function gracefulShutdown(server) {

  if (!server.listening) {
    return;
  }

  server.shutdown((err) => {
    if (err) {
      logger.error(`Server shutdown error:${err.toString()}`);
      process.exit(1);
    }

    logger.info('Server shutdown successfully');
    process.exit(0);
  });
}

process.on('unhandledRejection', (reason) => {
  logger.error(`Received Unhandled Rejection, reason: ${reason}`);
});

process.on('exit', (code) => {
  logger.info(`Exit app with code: ${code}`);
});

module.exports = (server) => {
  process.on('uncaughtException', (error) => {
    logger.error(`Received Uncaught Exception, reason: ${error.message}`);
    gracefulShutdown(server);
  });

  process.on('SIGINT', () => {
    logger.info('Received SIGINT signal');
    gracefulShutdown(server);
  });

  process.on('SIGTERM', () => {
    logger.info('Received SIGTERM signal');
    gracefulShutdown(server);
  });

  server.on('error', (error) => {
    logger.error(`Failed to start the server, reason: ${error}`);
    gracefulShutdown(server);
  });
};
