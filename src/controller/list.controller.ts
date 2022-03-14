import { DocumentDefinition } from "mongoose";
import List, { ListObject } from "../model/list.model";
import { OmitMongoAutoKeys } from "../utils/general.types";
import { Request, Response } from "express";
import { createList, getLists } from "../service/list.service";

/** Request handler to create a new list */
export async function createListHandler(req: Request, res: Response) {
  const list = await createList(req.body);
  return res.send(list);
}
/** Request handler to retrieve all lists */
export async function getListsHandler(req: Request, res: Response) {
  const lists = await getLists();
  return res.send(lists);
}
