import supertest from "supertest";
import { createServer } from "../core/server";
import { Paths } from "../routes";
import { createCard, getCards } from "../service/card.service";
import { createList } from "../service/list.service";
import { asJsonReturnObj } from "../utils/general";
import {
  commonFieldsAndTimestampsExpectation,
  setupMongoMemoryTestService,
} from "./test-utils";

let listId = "";

const cardPayload1 = () => ({ listId, title: "Demo Card" });
const cardPayload2 = () => ({ listId, title: "Demo Card 2" });
const cardExpectedResult1 = () => ({
  ...cardPayload1(),
  ...commonFieldsAndTimestampsExpectation,
});

const createTheList = async () => {
  const list = await createList({ title: "Demo List" }).then(asJsonReturnObj);
  listId = list._id;
};

const setupForDelete = async () => {
  await createTheList();
  await createCard(cardPayload1()).then(asJsonReturnObj);
  const cardsWith1 = await getCards().then((arr) => arr.map(asJsonReturnObj));
  const card2 = await createCard(cardPayload2()).then(asJsonReturnObj);
  const cardsWithBoth = await getCards().then((arr) =>
    arr.map(asJsonReturnObj)
  );
  return { card2, cardsWith1, cardsWithBoth };
};

const app = createServer();

describe("Cards", () => {
  setupMongoMemoryTestService();

  describe("Get Cards route", () => {
    describe("given no cards have been created", () => {
      it("should return an empty array", async () => {
        const { statusCode, body } = await supertest(app).get(Paths.CARDS);

        expect(statusCode).toBe(200);
        expect(body).toEqual([]);
      });
    });
    describe("given a new Card has been created", () => {
      it("should return a 1-long array with the created Card", async () => {
        await createTheList();
        const card = await createCard(cardPayload1()).then(asJsonReturnObj);

        const { statusCode, body } = await supertest(app).get(Paths.CARDS);

        expect(statusCode).toBe(200);
        expect(body).toEqual([card]);
      });
    });
  });

  describe("Find single Card route", () => {
    describe("given no Cards have been created", () => {
      it("should return a 404 on any cardId", async () => {
        await supertest(app).get(`${Paths.CARD_BY_ID}/12345`).expect(404);
      });
    });
    describe("given a Card with known ID exists", () => {
      it("should return the requested Card", async () => {
        await createTheList();
        const card = await createCard(cardPayload1()).then(asJsonReturnObj);

        const { statusCode, body } = await supertest(app).get(
          `${Paths.CARDS}/${card._id}`
        );

        expect(statusCode).toBe(200);
        expect(body).toEqual(card);
      });
    });
  });

  describe("Create a new Card route", () => {
    describe("given we make a POST request with correct body", () => {
      it("should create the new Card and return it", async () => {
        const { statusCode, body } = await supertest(app)
          .post(Paths.CARDS)
          .send(cardPayload1());

        expect(statusCode).toBe(200);
        expect(body).toEqual(cardExpectedResult1());
      });
    });
    describe("given we make a POST request with missing title", () => {
      it("should error 400 and return correct error message", async () => {
        await createTheList();
        const { statusCode, body } = await supertest(app)
          .post(Paths.CARDS)
          .send({ listId });

        expect(statusCode).toBe(400);
        expect(body).toEqual(["Title is required"]);
      });
    });
    describe("given we make a POST request with missing listId", () => {
      it("should error 400 and return correct error message", async () => {
        const { statusCode, body } = await supertest(app)
          .post(Paths.CARDS)
          .send({ title: "Card with no list!" });

        expect(statusCode).toBe(400);
        expect(body).toEqual(["Must specify which list to add card to"]);
      });
    });
  });

  describe("Delete a card route", () => {
    describe("given we make a DELETE request on a non-existant id", () => {
      it("should error 404 and not affect the card array", async () => {
        const { cardsWithBoth } = await setupForDelete();

        await supertest(app).delete(`${Paths.CARD_BY_ID}/12345`).expect(404);

        const newCards = await getCards().then((arr) =>
          arr.map(asJsonReturnObj)
        );

        expect(newCards).toEqual(cardsWithBoth);
      });
    });
    describe("given we make a DELETE request on a real id", () => {
      it("should return 200, and card should be as before deleted item existed", async () => {
        const { card2, cardsWith1 } = await setupForDelete();

        await supertest(app).delete(`${Paths.CARDS}/${card2._id}`).expect(200);

        const newCards = await getCards().then((arr) =>
          arr.map(asJsonReturnObj)
        );

        expect(newCards).toEqual(cardsWith1);
      });
    });
  });
});
