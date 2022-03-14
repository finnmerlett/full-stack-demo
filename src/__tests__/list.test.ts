import { createServer } from "../core/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import { Paths } from "../routes";
import { setupMongoMemoryTestService } from "./test-utils";
import { createList } from "../service/list.service";
import { asJsonReturnObject } from "../utils/general";
import log from "../utils/log";

const listPayload = { title: "Demo List" };

const app = createServer();

describe("Lists", () => {
  setupMongoMemoryTestService();

  describe("Get list route", () => {
    describe("given no lists have been created", () => {
      it("should return an empty list", async () => {
        await supertest(app).get(Paths.LISTS).expect(200).expect([]);
      });
    });
    describe("given a new list has been created", () => {
      it("should return a 1-long array with the created list", async () => {
        const list = await createList(listPayload).then(asJsonReturnObject);
        await supertest(app).get(Paths.LISTS).expect(200).expect([list]);
      });
    });
  });
});
