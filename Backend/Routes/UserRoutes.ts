import express, { Router } from "express";
import {
  loginUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../Controllers/UserController";

const router: Router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get("/getUserProfile", getUserProfile);
router.put("/updateUserProfile", updateUserProfile);

export default router;
