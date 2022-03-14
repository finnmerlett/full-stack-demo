import _ from "lodash";
import mongoose from "mongoose";
import { Merge } from "type-fest";

/** Turns mongoose object `T` into the return type of its `.toJSON` method */
type ToJson<T> = mongoose.FlattenMaps<mongoose.LeanDocument<T>>;
/** Properties on a Mongoose object which need to be converted (to match the
 * type they return as from an api call) */
type BeforeProperties = {
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  modifiedAt?: Date;
};
/** Converted properties on a Mongoose object after the conversion. This is
 * how they will look when th)ye return from the api call */
type AfterProperties = { [x in keyof BeforeProperties]: string };

/** Convert a mongoose object to the type expected as an api call return. This
 * means calling the `.toJSON()` method, and converting the `_id` and any
 * Date-type properties to strings. */
export const asJsonReturnObj = <T extends mongoose.Document & BeforeProperties>(
  object: T
): Merge<ToJson<T>, AfterProperties> => {
  const jsonObj = object.toJSON();
  return {
    ..._.mapValues(jsonObj, (value) =>
      _.isDate(value) ? value.toISOString() : value
    ),
    _id: jsonObj._id.toString(),
  } as Merge<ToJson<T>, AfterProperties>;
};
