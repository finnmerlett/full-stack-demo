import { createServer } from "../core/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import { Paths } from "../routes";
import { setupMongoMemoryTestService } from "./test-utils";

const app = createServer();

describe("Lists", () => {
  setupMongoMemoryTestService();

  describe("Get list route", () => {
    describe("given no lists have been created", () => {
      it("should return an empty list", async () => {
        await supertest(app).get(Paths.LISTS).expect(200).expect([]);
      });
    });
  });
});
