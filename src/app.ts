import express from "express";
import config from "config";
import mongoose from "mongoose";
import log from "./utils/log";
import routes from "./routes";

const port = config.get<number>("port");
const host = config.get<string>("host");
const dbUri = config.get<string>("dbUri");

const app = express();

// Parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB and start server listening
mongoose
  .connect(dbUri)
  .then(() => {
    log.info("Database connected!");
  })
  .then(() => {
    routes(app);
    app.listen(port, host, () => {
      log.info(`Server listing at http://${host}:${port}`);
    });
  });
