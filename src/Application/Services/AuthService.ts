import { injectable } from "tsyringe";
import jwt from "jsonwebtoken";
import { User } from "../../Domain/Entities/User";
import dotenv from "dotenv";
import { Customer } from "../../Domain/Entities/Customer";

dotenv.config();

@injectable()
export class AuthService {
  private readonly secret: string;
  constructor() {
    this.secret = process.env.JWT_SECRET!;
  }

  generateToken = async (user: User | Customer) => {
    try {
      return jwt.sign(
        {
          userId: user.id,
          role: user instanceof User ? user.role : "customer",
        },
        this.secret,
        {
          expiresIn: "1d",
        }
      );
    } catch (e) {
      throw e;
    }
  };
}
