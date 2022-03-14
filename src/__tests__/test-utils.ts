import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

/** Add a beforeEach method to create and connect to a simulated MongoDB (run
 * in memory), and an afterEach method to to disconnect and close the connection
 * after the test has completed. */
export function setupMongoMemoryTestService() {
  beforeEach(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  afterEach(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
}

/** The common fields found on any database object, when timestamps === true */
export const commonFieldsAndTimestampsExpectation = {
  __v: 0,
  _id: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};
