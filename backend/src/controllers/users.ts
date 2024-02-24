import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import UserModel from "../models/user";

interface SignupBody {
  username?: string;
  email?: string;
  password?: string;
}
export const signUp: RequestHandler<
  unknown,
  unknown,
  SignupBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Please fill in all fields");
    }

    const existingUsername = await UserModel.findOne({ username }).exec();

    if (existingUsername) {
      throw createHttpError(
        409,
        "Username already exist. please a new username"
      );
    }

    const existingEmail = await UserModel.findOne({ email }).exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email already exist. please use a new email"
      );
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHashed,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
