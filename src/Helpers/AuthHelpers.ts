import { createHash } from "crypto";

export const comparePassword = async (
  hashedPassword: string,
  password: string
) => {
  try {
    const newHashedPassword = createHash("md5").update(password).digest("hex");
    return newHashedPassword === hashedPassword;
  } catch (e) {
    throw e;
  }
};
