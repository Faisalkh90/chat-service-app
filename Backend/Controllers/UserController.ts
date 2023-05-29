import { Request, Response, NextFunction } from "express";
import UserModel from "../Models/UserModel";
import generateToken from "../Utils/GenerateToken";
import { userRegistration, userLogin } from "../Interface/UserTypes";

async function loginUser(req: Request, res: Response) {
  const { email, password }: userLogin = req.body;

  const user: any = await UserModel.findOne({ email });
  try {
    if (user && (await user.matchPasswords(password))) {
      generateToken(res, user.id);

      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
    throw new Error("Invalid email or password");
  }
}

async function registerUser(req: Request, res: Response) {
  const { name, email, password }: userRegistration = req.body;
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(404);
    throw new Error("User Already Exists");
  }

  const user = await UserModel.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user.id);

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
}

async function logoutUser(req: Request, res: Response, next: NextFunction) {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });

  next();
}

async function getUserProfile(req: Request, res: Response) {
  res.send("update profile");
}

async function updateUserProfile(req: Request, res: Response) {
  res.send("update profile");
}

export {
  loginUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
};
