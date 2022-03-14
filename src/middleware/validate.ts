import { NextFunction, Response, Request } from "express";
import _ from "lodash";
import { AnySchema, ValidationError } from "yup";

/**
 * Validate requests against a schema. Curry with a schema to get a request
 * handler function for use with Express
 * @param schema schema against which to validate the request
 * @returns the validation function (request handler)
 */
export const validateReq =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      res.status(400).send(_.get(err as ValidationError, "errors"));
    }
  };
