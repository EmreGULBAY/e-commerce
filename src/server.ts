import { createApp } from "./app";
import { AppDataSource } from "./Infrastructure/Database/Config/Config";
import dotenv from "dotenv";

export const main = async () => {
  try {
    dotenv.config();
    await AppDataSource.initialize()
      .then(() => {
        console.log("Database connected");
      })
      .catch((e) => {
        console.log("db connection error");
        throw e;
      });
    const app = createApp();

    app.listen(3000, () => {
      console.log(`Server running on port ${3000}`);
    });
  } catch (e) {
    throw e;
  }
};

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
