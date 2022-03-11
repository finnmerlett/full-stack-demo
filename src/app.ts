import express from "express";
import config from "config";
import mongoose from "mongoose";
import log from "./utils/log";
import routes from "./routes";
import { createServer } from "./core/server";

const port = config.get<number>("port");
const host = config.get<string>("host");
const dbUri = config.get<string>("dbUri");

const app = createServer();

// Connect to MongoDB and start server listening
mongoose
  .connect(dbUri)
  .then(() => {
    log.info("Database connected!");
  })
  .then(() => {
    app.listen(port, host, () => {
      log.info(`Server listing at http://${host}:${port}`);
    });
  });
