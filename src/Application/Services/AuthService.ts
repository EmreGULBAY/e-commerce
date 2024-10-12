import { injectable } from "tsyringe";
import jwt from "jsonwebtoken";
import { User } from "../../Infrastructure/Database/Entities/User";
import dotenv from "dotenv";

dotenv.config();

@injectable()
export class AuthService {
  private readonly secret: string;
  constructor() {
    this.secret = process.env.JWT_SECRET!;
  }

  generateToken = async (user: User) => {
    try {
      return jwt.sign({ userId: user.id, role: user.role }, this.secret, {
        expiresIn: "1d",
      });
    } catch (e) {
      throw e;
    }
  };
}
