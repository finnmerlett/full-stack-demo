import { object, string } from "yup";

const payload = {
  body: object({
    title: string()
      .required("Title is required")
      .max(100, "Title must be no more than than 100 characters"),
  }),
};

const params = {
  params: object({
    cardId: string().required("cardId is required"),
  }),
};

export const createCardSchema = object({
  ...payload,
});

export const updateCardSchema = object({
  ...params,
  ...payload,
});

export const deleteCardSchema = object({
  ...params,
});
