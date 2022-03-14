import { Express } from "express";
import {
  createListHandler,
  deleteListHandler,
  getAllListsHandler,
  getListHandler,
} from "./controller/list.controller";
import { validateReq } from "./middleware/validate";
import { createListSchema, deleteListSchema } from "./schema/list.schema";

export enum Paths {
  HEALTHCHECK = "/healthcheck",
  LISTS = "/lists",
  LIST_BY_ID = "/lists/:listId",
}

export default function (app: Express) {
  app.get(Paths.HEALTHCHECK, (...[, res]) => res.sendStatus(200));
  app.get(Paths.LISTS, getAllListsHandler);
  app.get(Paths.LIST_BY_ID, getListHandler);
  app.post(Paths.LISTS, validateReq(createListSchema), createListHandler);
  app.delete(
    Paths.LIST_BY_ID,
    validateReq(deleteListSchema),
    deleteListHandler
  );
}
