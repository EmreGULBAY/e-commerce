import express, { Request, Response, Router } from "express";
import { v1Router } from "./Routers/v1Router";

export const createApp = () => {
  try {
    const app = express();

    const v1RouterObj = v1Router();

    app.use("/v1", v1RouterObj);

    app.get("*", (req: Request, res: Response) => {
      res.status(404).send("Not Found");
    });

    return app;
  } catch (e) {
    throw e;
  }
};
