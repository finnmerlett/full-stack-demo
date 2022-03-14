import { NextFunction, Response, Request } from "express";
import _ from "lodash";
import { AnyZodObject, ZodError } from "zod";

/**
 * Validate requests against a schema. Curry with a schema to get a request
 * handler function for use with Express
 * @param schema schema against which to validate the request
 * @returns the validation function (request handler)
 */
export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      res.status(400).send(_.get(err as ZodError, "errors"));
    }
  };
