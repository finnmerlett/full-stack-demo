import { CardObject } from "./interfaces/card.interface";
import { ListObject } from "./interfaces/list.interface";
import { Types } from "mongoose";

const API_ROOT = `http://localhost:1337`;
export enum Path {
  HEALTHCHECK = "healthcheck",
  LISTS = "lists",
  CARDS = "cards",
}

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

type ApiResponse<T> = Promise<{
  [K in keyof T]: T[K] extends Types.ObjectId ? string : T[K];
}>;

export const getLists = () => {
  const path = Path.LISTS;
  return [
    path,
    () =>
      fetch(`${API_ROOT}/${path}`).then(
        (res) => res.json() as ApiResponse<ListObject[]>
      ),
  ] as const;
};

export const createList = () => {
  const path = Path.LISTS;
  return [
    path,
    (data: { title: string }) =>
      fetch(`${API_ROOT}/${path}`, {
        headers,
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json() as ApiResponse<ListObject>),
  ] as const;
};

export const getCards = () => {
  const path = Path.CARDS;
  return [
    path,
    () =>
      fetch(`${API_ROOT}/${path}`).then(
        (res) => res.json() as ApiResponse<CardObject[]>
      ),
  ] as const;
};
