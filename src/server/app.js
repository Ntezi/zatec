const express = require('express');
const bodyParser = require('body-parser');
const redisClient = require('./utils/redis_client');

const serverTerminationHandler = require('./utils/server_exception_handler');

require('http-shutdown').extend();

const entrypoint = require('./middlewares/entrypoint');

const { logger } = require('./utils/logging')(module);
const request_error = require('./middlewares/request_error');
const chuck = require('./routes/chuck');
const swapi = require('./routes/swapi');
const search = require('./routes/search');
const path = require("path");
const OpenApiValidator = require("express-openapi-validator");
const swaggerUiAssetPath = require('swagger-ui-dist').getAbsoluteFSPath();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

entrypoint.init(app);
redisClient.init()
    .then(() => logger.info(`The Redis Client connected`))
    .catch(error => logger.error(`Error in Redis Client ${error}`));

const apiSpec = path.join(__dirname, '/swagger/swagger.yaml')
const swaggerFolder = apiSpec.split(path.sep).slice(0, -1).join(path.sep);

app.use(`/`, express.static(swaggerFolder));
app.use(`/dist`, express.static(swaggerUiAssetPath));
app.use(OpenApiValidator.middleware({
        apiSpec,
        validateApiSpec: false,
        validateRequests: true,
        validateResponses: false
    })
);

app.use('/chuck', chuck);
app.use('/swapi', swapi);
app.use('/search', search);

app.use(request_error);
const port = process.env.SERVER_PORT;
const server = app.listen(port, () => {
    logger.info(`The Server listening on port: ${port}`);
}).withShutdown();

serverTerminationHandler(server);
