import express, { Request, Response, Router } from "express";

export const v1Router = () => {
  try {
    const router = Router();

    
    router.get("/", (req: Request, res: Response) => {
      res.send("success");
    });

    return router;
  } catch (e) {
    throw e;
  }
};
