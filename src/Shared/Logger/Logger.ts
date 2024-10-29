import { inspect } from "util";
import dotenv from "dotenv";

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

export class Logger {
  public readonly logEndpoint;
  constructor(logEndpoint: string) {
    dotenv.config();
    this.logEndpoint = process.env.LOG_ENDPOINT!;
  }
  logMessage = (logData: LogData) => {
    try {
      console.log(JSON.stringify(logData));
    } catch (e) {
      console.log(
        JSON.stringify({
          message: "error on logging",
          error: inspect(e),
        })
      );
    }
  };

  warn = (logData: LogData) => {
    logData.level = LogLevel.warn;
    this.logMessage(logData);
  };

  info = (logData: LogData) => {
    logData.level = LogLevel.info;
    this.logMessage(logData);
  };

  error = (logData: LogData) => {
    logData.level = LogLevel.error;
    this.logMessage(logData);
  };

  log = (logData: LogData) => {
    logData.level = LogLevel.log;
    this.logMessage(logData);
  };

  insertLog = async (logData: LogData) => {
    try {
      const basicAuth = process.env.LOG_BASIC_AUTH;
      const bearerAuth = process.env.LOG_BEARER_AUTH;

      if (!basicAuth && !bearerAuth) {
        throw new Error("No authentication method provided");
      }

      const authorization = basicAuth
        ? "Basic " + Buffer.from(basicAuth).toString("base64")
        : `${bearerAuth}`;

      await fetch(this.logEndpoint, {
        method: "POST",
        body: JSON.stringify(logData),
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error("Error on inserting log", e);
    }
  };
}
