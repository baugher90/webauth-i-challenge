const express = require("express");
const helmet = require("helmet");
const userRouter = require("./users/users-router");

const server = express();

server.use(express.json(),helmet());
server.use("/api/users",userRouter);

// sanity check route
server.get('/', (req, res) => {
    res.status(200).json({ hello: 'World!' });
  });

module.exports = server;