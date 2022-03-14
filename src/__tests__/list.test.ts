import supertest from "supertest";
import { createServer } from "../core/server";
import { Paths } from "../routes";
import { createList, getLists } from "../service/list.service";
import { asJsonReturnObj } from "../utils/general";
import {
  commonFieldsAndTimestampsExpectation,
  setupMongoMemoryTestService,
} from "./test-utils";

const listPayload1 = { title: "Demo List" };
const listPayload2 = { title: "Demo List 2" };
const listExpectedResult1 = {
  ...listPayload1,
  ...commonFieldsAndTimestampsExpectation,
};

const setupForDelete = async () => {
  await createList(listPayload1).then(asJsonReturnObj);
  const listsWith1 = await getLists().then((arr) => arr.map(asJsonReturnObj));
  const list2 = await createList(listPayload2).then(asJsonReturnObj);
  const listsWithBoth = await getLists().then((arr) =>
    arr.map(asJsonReturnObj)
  );
  return { list2, listsWith1, listsWithBoth };
};

const app = createServer();

describe("Lists", () => {
  setupMongoMemoryTestService();

  describe("Get Lists route", () => {
    describe("given no lists have been created", () => {
      it("should return an empty array", async () => {
        const { statusCode, body } = await supertest(app).get(Paths.LISTS);

        expect(statusCode).toBe(200);
        expect(body).toEqual([]);
      });
    });
    describe("given a new List has been created", () => {
      it("should return a 1-long array with the created List", async () => {
        const list = await createList(listPayload1).then(asJsonReturnObj);

        const { statusCode, body } = await supertest(app).get(Paths.LISTS);

        expect(statusCode).toBe(200);
        expect(body).toEqual([list]);
      });
    });
  });

  describe("Find single List route", () => {
    describe("given no Lists have been created", () => {
      it("should return a 404 on any listId", async () => {
        await supertest(app).get(`${Paths.LIST_BY_ID}/12345`).expect(404);
      });
    });
    describe("given a List with known ID exists", () => {
      it("should return the requested List", async () => {
        const list = await createList(listPayload1).then(asJsonReturnObj);

        const { statusCode, body } = await supertest(app).get(
          `${Paths.LISTS}/${list._id}`
        );

        expect(statusCode).toBe(200);
        expect(body).toEqual(list);
      });
    });
  });

  describe("Create a new List route", () => {
    describe("given we make a POST request with correct body", () => {
      it("should create the new List and return it", async () => {
        const { statusCode, body } = await supertest(app)
          .post(Paths.LISTS)
          .send(listPayload1);

        expect(statusCode).toBe(200);
        expect(body).toEqual(listExpectedResult1);
      });
    });
    describe("given we make a POST request with missing title", () => {
      it("should error 400 and return correct error message", async () => {
        const { statusCode, body } = await supertest(app)
          .post(Paths.LISTS)
          .send({});

        expect(statusCode).toBe(400);
        expect(body).toEqual(["Title is required"]);
      });
    });
  });

  describe("Delete a list route", () => {
    describe("given we make a DELETE request on a non-existant id", () => {
      it("should error 404 and not affect the list array", async () => {
        const { listsWithBoth } = await setupForDelete();

        await supertest(app).delete(`${Paths.LIST_BY_ID}/12345`).expect(404);

        const newLists = await getLists().then((arr) =>
          arr.map(asJsonReturnObj)
        );

        expect(newLists).toEqual(listsWithBoth);
      });
    });
    describe("given we make a DELETE request on a real id", () => {
      it("should return 200, and list should be as before deleted item existed", async () => {
        const { list2, listsWith1 } = await setupForDelete();

        await supertest(app).delete(`${Paths.LISTS}/${list2._id}`).expect(200);

        const newLists = await getLists().then((arr) =>
          arr.map(asJsonReturnObj)
        );

        expect(newLists).toEqual(listsWith1);
      });
    });
  });
});
