import { createServer } from "../core/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import { Paths } from "../routes";
import { setupMongoMemoryTestService } from "./test-utils";

const app = createServer();

describe("Health Check", () => {
  setupMongoMemoryTestService();

  describe("Check that the server is up", () => {
    it("should return code 200", async () => {
      await supertest(app).get(Paths.HEALTHCHECK).expect(200);
    });
  });
});
