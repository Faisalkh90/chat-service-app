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

router.post("/login", asyncHandler(loginUser));
router.post("/register", asyncHandler(registerUser));
router.post("/logout", asyncHandler(logoutUser));
router.get(
  "/getUserProfile",
  asyncHandler(protection),
  asyncHandler(getUserProfile)
);
router.put(
  "/updateUserProfile",
  asyncHandler(protection),
  asyncHandler(updateUserProfile)
);

export default router;
