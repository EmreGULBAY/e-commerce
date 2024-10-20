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
      const { username, password, passwordAgain, email, phone, firstName, lastName } = req.body;
      if (!username || !password || !passwordAgain || !email || !phone || !firstName || !lastName) {
        return res.status(400).json({ message: "All fields are required" });
      }
      if (password !== passwordAgain) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      await this.userService.register({
        username,
        password,
        email,
        phone,
        firstName,
        lastName,
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

  deactivateUser = async (req: Request, res: Response) => {
    try {
      const tokenCredentials = req.body.user;
      const userId = req.body.userId;
      if (!tokenCredentials) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      await this.userService.deactivateUser(tokenCredentials.userId, userId);
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).send("Error deactivating user");
    }
  };
}
