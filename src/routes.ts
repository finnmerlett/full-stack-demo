import { Express } from "express";
import { getListsHandler } from "./controller/list.controller";

export enum Paths {
  HEALTHCHECK = "/healthcheck",
  LISTS = "/lists",
}

export default function (app: Express) {
  app.get(Paths.HEALTHCHECK, (...[, res]) => res.sendStatus(200));
  app.get(Paths.LISTS, getListsHandler);
}
