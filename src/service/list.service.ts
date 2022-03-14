import _ from "lodash";
import { DocumentDefinition } from "mongoose";
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
