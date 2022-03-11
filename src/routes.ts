import { Express } from "express";

export enum Paths {
  HEALTHCHECK = "/healthcheck",
}

export default function (app: Express) {
  app.get(Paths.HEALTHCHECK, (req, res) => {
    res.sendStatus(200);
  });
}
