import express, { Request, Response, Router } from "express";
import { v1Router } from "./Routers/v1Router";
import bodyParser from "body-parser";
import {
  extractTokenMiddleware,
  verifyTokenMiddleware,
} from "./Interfaces/Http/MiddleWares/TokenMiddleware";
import { AppDataSource } from "./Infrastructure/Database/Config/Config";
import { container } from "tsyringe";
import { UserController } from "./Interfaces/Http/Controllers/UserController";

export const createApp = () => {
  try {
    const app = express();

    container.registerInstance("DataSource", AppDataSource);
    const userController = container.resolve(UserController);

    const v1RouterObj = v1Router();
    app.use(bodyParser.json());
    app.post("/register", userController.register);
    app.post("/login", userController.login);
    app.use("/v1", extractTokenMiddleware, verifyTokenMiddleware, v1RouterObj);

    app.get("*", (req: Request, res: Response) => {
      res.status(404).send("Not Found");
    });

    return app;
  } catch (e) {
    throw e;
  }
};
