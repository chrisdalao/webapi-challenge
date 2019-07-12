const express = require('express');
const helmet = require('helmet');
const projectRouter = require('./routers/projectRouter.js');
const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/projects', projectRouter);

module.exports = server;
