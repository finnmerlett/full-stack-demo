import mongoose from "mongoose";
import { Schema, Types } from "mongoose";
import { ListObject } from "../../frontend/src/core/interfaces/list.interface";

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
