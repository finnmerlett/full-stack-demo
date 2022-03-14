import _ from "lodash";
import mongoose, { Types } from "mongoose";
import { Merge } from "type-fest";

/** Turns mongoose object `T` into the return type of its `.toJSON` method */
type ToJson<T> = mongoose.FlattenMaps<mongoose.LeanDocument<T>>;
/** Base properties on a Mongoose object which need to be converted to string
 * (to match the type they return as from an api call) */
type BeforeProperties = {
  _id: Types.ObjectId;
  createdAt?: Date;
  modifiedAt?: Date;
};
/** Converted properties on a Mongoose object after the conversion. This is
 * how they will look when they return from the api call */
type AfterProperties<T extends BeforeProperties> = {
  [K in keyof T]: T[K] extends Date | Types.ObjectId ? string : never;
};

/** Convert a mongoose object to the type expected as an api call return. This
 * means calling the `.toJSON()` method, and converting the `_id` and any
 * Date-type properties to strings. */
export const asJsonReturnObj = <T extends mongoose.Document & BeforeProperties>(
  object: T
): Merge<ToJson<T>, AfterProperties<T>> => {
  const jsonObj = object.toJSON();
  return {
    ..._.mapValues(jsonObj, (value) =>
      _.isDate(value)
        ? value.toISOString()
        : typeof value === "number"
        ? value
        : mongoose.isValidObjectId(value)
        ? value?.toString()
        : value
    ),
  } as Merge<ToJson<T>, AfterProperties<T>>;
};
