import { Request, Response, NextFunction } from "express";
import UserModel from "../Models/UserModel";
import generateToken from "../Utils/GenerateToken";
import {
  userRegistration,
  userLogin,
  userLogin2,
} from "../Interface/UserTypes";
import validator from "validator";

// Login user
async function loginUser(req: Request, res: Response) {
  // Get email and password from request body
  const { email, password }: userLogin = req.body;

  try {
    // Find user by email
    const user: userLogin2 | null = await UserModel.findOne({ email });
    console.log(user);
    // Check if user exists and password is correct
    if (user && (await user.matchPasswords(password))) {
      // Generate JWT token
      await generateToken(res, user.id);
      console.log("User logged in");

      // Send response
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      // Unauthorized or bad request
      res.sendStatus(401);
      console.error("Invalid email or password");
    }
  } catch (error) {
    // Server error
    res.sendStatus(500);
    console.error(error);
  }
}

// Register user
async function registerUser(req: Request, res: Response) {
  // Get name, email and password from request body
  const { name, email, password }: userRegistration = req.body;
  // Check if user exists
  const userExists: userLogin2 | null = await UserModel.findOne({ email });
  if (userExists) {
    res.status(404);
    throw new Error(`User already exists
    email: ${email},
    name: ${name}
    `);
  }

  // Validate email
  // if (!validator.isEmail(email)) {
  //   res.status(400);
  //   throw new Error("Invalid email address format ");
  // }

  // Create user
  const user = await UserModel.create({
    name,
    email,
    password,
  });

  // Check if user was created
  if (user) {
    console.log(user);
    // Generate JWT token
    generateToken(res, user.id);

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
    console.log("User created");
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
}

// Logout user
async function logoutUser(req: Request, res: Response, next: NextFunction) {
  // Clear cookie and reset token for authentication purposes
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });

  next();
}

// Get user profile
async function getUserProfile(req: Request, res: Response) {
  res.send("update profile");
}

// Update user profile
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
