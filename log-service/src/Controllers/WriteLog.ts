import { Request, Response } from "express";

export enum LogLevel {
  info = 10,
  log = 20,
  warn = 30,
  error = 40,
}

export interface LogData {
  level?: LogLevel;
  source: string;
  timeStamp: string;
  message?: string;
  data: any;
}

export const writeLog = (req: Request, res: Response) => {
  try {
    const logData: LogData = req.body;
  } catch (e) {
    res.status(500).send(e);
  }
};
