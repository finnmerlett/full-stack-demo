import { Types } from "mongoose";

export interface ListObject {
  _id: Types.ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
