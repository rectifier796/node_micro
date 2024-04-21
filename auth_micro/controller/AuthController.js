import bcrypt from "bcrypt";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export class AuthController {
  static async register(req, res) {
    try {
      const payload = req.body;

      const salt = bcrypt.genSaltSync(10);

      payload.password = await bcrypt.hash(payload.password, salt);

      const user = await prisma.user.create({
        data: payload,
      });

      return res.json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user) {
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({ message: "Invalid Credentials" });
        }

        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "365d",
        });

        return res.json({
          message: "Logged In Successfully",
          access_token: `Bearer ${token}`,
        });
      }

      res.status(401).json({ message: "Invalid Credentials" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async user(req,res){
    const user = req.user;
    return res.status(200).json({user});
  }
}
