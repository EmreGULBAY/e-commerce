import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  synchronize: true,
  logging: false,
  options: {
    encrypt: Boolean(process.env.DB_ENCRYPT === "true"),
    connectTimeout: Number(process.env.DB_CONNECTION_TIMEOUT),
  },
  entities: ["src/Domain/Entities/**/*.ts"],
  
});
