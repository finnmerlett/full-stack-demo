import { Express } from "express";
import {
  createListHandler,
  deleteListHandler,
  getAllListsHandler,
  getListHandler,
} from "./controller/list.controller";
import {
  createCardHandler,
  deleteCardHandler,
  getAllCardsHandler,
  getCardHandler,
} from "./controller/card.controller";
import { validateReq } from "./middleware/validate";
import { createListSchema, deleteListSchema } from "./schema/list.schema";
import { createCardSchema, deleteCardSchema } from "./schema/card.schema";

export enum Paths {
  HEALTHCHECK = "/healthcheck",
  LISTS = "/lists",
  LIST_BY_ID = "/lists/:listId",
  CARDS = "/cards",
  CARD_BY_ID = "/cards/:cardId",
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

  app.get(Paths.CARDS, getAllCardsHandler);
  app.get(Paths.CARD_BY_ID, getCardHandler);
  app.post(Paths.CARDS, validateReq(createCardSchema), createCardHandler);
  app.delete(
    Paths.CARD_BY_ID,
    validateReq(deleteCardSchema),
    deleteCardHandler
  );
}
