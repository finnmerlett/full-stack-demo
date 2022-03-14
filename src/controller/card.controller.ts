import { DocumentDefinition } from "mongoose";
import Card, { CardObject } from "../model/card.model";
import { OmitMongoAutoKeys } from "../utils/general.types";
import { Request, Response } from "express";
import {
  createCard,
  deleteCard,
  getCard,
  getCards,
} from "../service/card.service";

/** Request handler to create a new card */
export async function createCardHandler(req: Request, res: Response) {
  const card = await createCard(req.body);
  return res.send(card);
}
/** Request handler to retrieve all cards */
export async function getAllCardsHandler(req: Request, res: Response) {
  const cards = await getCards();
  return res.send(cards);
}
/** Request handler to find a specific card */
export async function getCardHandler(req: Request, res: Response) {
  const cardId = req?.params?.cardId;
  const card = await getCard({ _id: cardId });

  if (!card) {
    return res.status(404);
  }
  return res.send(card);
}
/** Request handler to delete a card */
export async function deleteCardHandler(req: Request, res: Response) {
  const cardId = req?.params?.cardId;
  const card = await getCard({ _id: cardId });

  if (!card) {
    return res.status(404);
  }

  await deleteCard({ _id: cardId });
  return res.sendStatus(200);
}
