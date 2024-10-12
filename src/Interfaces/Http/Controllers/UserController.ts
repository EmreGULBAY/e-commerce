import { DataSource } from "typeorm";
import { UserService } from "../../../Application/Services/UserService";
import { Request, Response } from "express";
import { AppDataSource } from "../../../Infrastructure/Database/Config/Config";
import { injectable, inject } from "tsyringe";

@injectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  register = async (req: Request, res: Response) => {
    try {
      const { username, password, passwordAgain, ownedShopIds } = req.body;
      if (!username || !password || !passwordAgain || !ownedShopIds) {
        return res.status(400).json({ message: "All fields are required" });
      }
      if (password !== passwordAgain) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      await this.userService.register({
        username,
        password,
        ownedShopIds: ownedShopIds || [],
      });
      res.status(200).json({ message: "User registered successfully" });
    } catch (e) {
      res.send("Error registering user");
    }
  };
}