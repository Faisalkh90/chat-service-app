import express, { Request, Response, NextFunction } from "express";

async function loginUser(req: Request, res: Response, next: NextFunction) {
  console.log("authUser");
  next();
}

async function registerUser(req: Request, res: Response, next: NextFunction) {
  console.log("registerUser");
  next();
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
