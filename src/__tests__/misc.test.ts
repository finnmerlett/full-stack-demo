import { createServer } from "../core/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import { Paths } from "../routes";

const app = createServer();

describe("health check", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("check that the server is up", () => {
    it("should return code 200", async () => {
      await supertest(app).get(Paths.HEALTHCHECK).expect(200);
    });
  });
});
