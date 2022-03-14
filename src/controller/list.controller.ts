import { DocumentDefinition } from "mongoose";
import List, { ListObject } from "../model/list.model";
import { OmitMongoAutoKeys } from "../utils/general.types";
import { Request, Response } from "express";
import {
  createList,
  deleteList,
  getList,
  getLists,
} from "../service/list.service";

/** Request handler to create a new list */
export async function createListHandler(req: Request, res: Response) {
  const list = await createList(req.body);
  return res.send(list);
}
/** Request handler to retrieve all lists */
export async function getAllListsHandler(req: Request, res: Response) {
  const lists = await getLists();
  return res.send(lists);
}
/** Request handler to find a specific list */
export async function getListHandler(req: Request, res: Response) {
  const listId = req?.params?.listId;
  const list = await getList({ _id: listId });

  if (!list) {
    return res.status(404);
  }
  return res.send(list);
}
/** Request handler to delete a list */
export async function deleteListHandler(req: Request, res: Response) {
  const listId = req?.params?.listId;
  const list = await getList({ _id: listId });

  if (!list) {
    return res.status(404);
  }

  await deleteList({ _id: listId });
  return res.sendStatus(200);
}
