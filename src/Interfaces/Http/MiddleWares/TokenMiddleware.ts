import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
    userId: string;
    role: string;
  }
  
  export const extractTokenMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      req.body.token = authHeader.split("Bearer ")[1];
      next();
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  };
  
  export const verifyTokenMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as TokenPayload;
      req.body.user = decoded;
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  };