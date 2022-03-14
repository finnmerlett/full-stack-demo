import _ from "lodash";
import { DocumentDefinition, QueryOptions, FilterQuery } from "mongoose";
import List, { ListObject } from "../model/list.model";
import { OmitMongoAutoKeys } from "../utils/general.types";
import log from "../utils/log";

export async function createList(
  input: DocumentDefinition<OmitMongoAutoKeys<ListObject>>
) {
  return List.create(input);
}

export async function getLists() {
  return List.find();
}

export async function getList(
  query: FilterQuery<ListObject>,
  options: QueryOptions = { lean: true }
) {
  return List.findOne(query, {}, options);
}

export async function deleteList(query: FilterQuery<ListObject>) {
  return List.deleteOne(query, {});
}
