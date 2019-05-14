const express = require("express");
const helmet = require("helmet");
const cors = require('cors')
const session = require('express-session');
const sessionConfig = require(`../database/sessionConfig`);
const userRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router")

const server = express();

server.use(express.json(), helmet(), cors());
server.use(session(sessionConfig))

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

//====================================== Sanity check route
server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

module.exports = server;
