import express from "express";
import routes from "../routes";

/**
 * Create an express app, set up middleware and add routes (via routes function)
 * @returns the express app
 */
export function createServer() {
  const app = express();

  // Parses incoming requests with JSON payloads
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  routes(app);

  return app;
}
