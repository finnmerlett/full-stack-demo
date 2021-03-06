/** Keys of properties that will be auto-populated by MongoDB */
type MongoAutoKeys = "createdAt" | "updatedAt" | "_id";
/** Omit all properties from type `T` that will be auto-populated by MongoDB */
export type OmitMongoAutoKeys<T> = Omit<T, MongoAutoKeys>;
