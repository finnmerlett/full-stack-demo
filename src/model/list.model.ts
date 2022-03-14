import mongoose from "mongoose";
import { Schema, Types } from "mongoose";

export interface ListObject {
  _id: Types.ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const ListSchema = new Schema<ListObject>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const List = mongoose.model<ListObject>("list", ListSchema);
export default List;
