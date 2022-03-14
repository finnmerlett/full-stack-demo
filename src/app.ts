import config from "config";
import mongoose from "mongoose";
import { createServer } from "./core/server";
import log from "./utils/log";

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
