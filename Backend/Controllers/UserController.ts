import express, { Request, Response, NextFunction } from "express";
import UserModel from "../Models/UserModel";
import generateToken from "../Utils/GenerateToken";
import { userType } from "../Interface/UserTypes";

async function loginUser(req: Request, res: Response, next: NextFunction) {
  console.log("authUser");
  next();
}

async function registerUser(req: Request, res: Response, next: NextFunction) {
  const { name, email, password }: userType = req.body;
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
  console.log("registerUser");
  next();
}

async function getUserProfile(req: Request, res: Response, next: NextFunction) {
  console.log("registerUser");
  next();
}

async function updateUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("registerUser");
  next();
}

export {
  loginUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
};
