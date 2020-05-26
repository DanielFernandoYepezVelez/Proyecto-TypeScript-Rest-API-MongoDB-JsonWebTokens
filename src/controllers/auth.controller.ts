import { Request, Response } from "express";

import User from "../models/User";
import { IUser } from "../interface/User";

import jwt from "jsonwebtoken";

class AuthController {
  public async signup(req: Request, res: Response): Promise<Response<JSON>> {
    const { username, email, password } = req.body;

    /* user va a tener las propiedades de la interface */
    const user: IUser = new User({
      username,
      email,
      password,
    });

    user.password = await user.encryptPassword(password);
    const userSave = await user.save();

    const token: string = jwt.sign(
      { _id: userSave._id },
      process.env.TOKEN_SECRET || "tokentest"
    );

    return res.header("auth-token", token).json({
      message: "Registered Successfuly!",
      userSave,
    });
  }

  public async signin(req: Request, res: Response): Promise<Response<JSON>> {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("Email No Existe");

    const validateUser: boolean = await user.validatePassword(password);
    if (!validateUser) return res.status(400).json("Invalid Password");

    const token: string = jwt.sign(
      { _id: user._id },
      process.env.TOKEN_SECRET || "tokentest",
      {
        expiresIn: "48h",
      }
    );

    return res.header("auth-token", token).json(user);
  }

  public async profile(req: Request, res: Response): Promise<Response<JSON>> {
    // Para No Mostrarle Al Usuario El Password
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(401).json("No User Found");

    return res.json({
      user,
    });
  }
}

export const authContoller = new AuthController();
