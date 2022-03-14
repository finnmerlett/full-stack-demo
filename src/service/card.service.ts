import _ from "lodash";
import { DocumentDefinition, QueryOptions, FilterQuery } from "mongoose";
import { CardObject } from "../../frontend/src/core/interfaces/card.interface";
import Card from "../model/card.model";
import { OmitMongoAutoKeys } from "../utils/general.types";
import log from "../utils/log";

export async function createCard(
  input: DocumentDefinition<OmitMongoAutoKeys<CardObject>>
) {
  return Card.create(input);
}

export async function getCards() {
  return Card.find();
}

export async function getCard(
  query: FilterQuery<CardObject>,
  options: QueryOptions = { lean: true }
) {
  return Card.findOne(query, {}, options);
}

export async function deleteCard(query: FilterQuery<CardObject>) {
  return Card.deleteOne(query, {});
}
