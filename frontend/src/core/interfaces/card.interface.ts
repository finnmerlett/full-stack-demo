import { Types } from "mongoose";
import { ListObject } from "./list.interface";

export interface CardObject {
  _id: Types.ObjectId;
  listId: ListObject["_id"];
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
