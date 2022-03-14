import mongoose, { Schema } from "mongoose";
import { CardObject } from "../../frontend/src/core/interfaces/card.interface";
import List from "./list.model";

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
