import mongoose from "mongoose";
import { Schema, Types } from "mongoose";

export interface CardObject {
  _id: Types.ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const CardSchema = new Schema<CardObject>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Card = mongoose.model<CardObject>("card", CardSchema);
export default Card;
