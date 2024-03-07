import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import UserModel from "../models/user";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = await UserModel.findById(authenticatedUserId)
      .select("+email")
      .exec();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

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

    // Check if the username exist and return an error message if it does
    const existingUsername = await UserModel.findOne({ username }).exec();

    if (existingUsername) {
      throw createHttpError(
        409,
        "Username already exist. please use a new username"
      );
    }

    // Check if the user email already exists an return an error message if it does
    const existingEmail = await UserModel.findOne({ email }).exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email already exist. please use a new email"
      );
    }

    // If user does not exist, then hash the password and then create the user
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    // Create a new user
    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHashed,
    });

    // Establish a session for a user
    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Please fill in all fileds");
    }

    const user = await UserModel.findOne({ username })
      .select("+password +email")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }
    // Establish a session for a user
    req.session.userId = user._id;

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
