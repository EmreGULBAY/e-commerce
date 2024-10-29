import express, { Request, Response, Router } from "express";
import { AppDataSource } from "../Infrastructure/Database/Config/Config";
import { container } from "tsyringe";
import { UserController } from "../Interfaces/Http/Controllers/UserController";

export const v1Router = () => {
  try {
    const router = Router();
    container.registerInstance("DataSource", AppDataSource);
    const userController = container.resolve(UserController);

    router.get("/", (req: Request, res: Response) => {
      res.send("success");
    });

    router.put("/update-password", userController.updateUserPassword);

    return router;
  } catch (e) {
    throw e;
  }
};
