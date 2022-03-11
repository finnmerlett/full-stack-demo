import express from "express";
import routes from "../routes";

export function createServer() {
  const app = express();

  // Parses incoming requests with JSON payloads
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  routes(app);

  return app;
}
