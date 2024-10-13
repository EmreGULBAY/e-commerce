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
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).send("Error registering user");
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const token = await this.userService.login({ username, password });

      res.status(200).json({
        success: true,
        token,
      });
    } catch (e) {
      res.status(500).send("Error logging in");
    }
  };

  updateUserPassword = async (req: Request, res: Response) => {
    try {
      const tokenCredentials = req.body.user;
      if (!tokenCredentials) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }
      await this.userService.updateUserPassword(
        tokenCredentials.userId,
        oldPassword,
        newPassword
      );
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).send("Error updating user password");
    }
  };
}
