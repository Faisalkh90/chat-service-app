import express, { Router } from "express";
import {
  loginUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../Controllers/UserController";
import asyncHandler from "express-async-handler";
import protection from "../Middleware/AuthMiddleware";

const router: Router = express.Router();
//catch errors at runtime by using express-async-handler package instead of try catch blocks

//login user
router.post("/login", asyncHandler(loginUser));
//register user
router.post("/register", asyncHandler(registerUser));
//logout user
router.post("/logout", asyncHandler(logoutUser));
//get user profile
router.get(
  "/getUserProfile",
  asyncHandler(protection),
  asyncHandler(getUserProfile)
);
//update user profile
router.put(
  "/updateUserProfile",
  asyncHandler(protection),
  asyncHandler(updateUserProfile)
);

export default router;
