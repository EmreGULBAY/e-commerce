import { createApp } from "./app";

export const main = async () => {
  try {
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
