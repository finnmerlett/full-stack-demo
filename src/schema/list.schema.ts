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
    listId: string().required("listId is required"),
  }),
};

export const createListSchema = object({
  ...payload,
});

export const updateListSchema = object({
  ...params,
  ...payload,
});

export const deleteListSchema = object({
  ...params,
});
