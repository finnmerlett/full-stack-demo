import mongoose from "mongoose";
import { Schema, Types } from "mongoose";
import List, { ListObject } from "./list.model";

export interface CardObject {
  _id: Types.ObjectId;
  listId: ListObject["_id"];
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const CardSchema = new Schema<CardObject>(
  {
    listId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: List,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Card = mongoose.model<CardObject>("card", CardSchema);
export default Card;
