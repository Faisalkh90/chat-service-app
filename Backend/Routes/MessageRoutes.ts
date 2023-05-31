import asyncHandler from "express-async-handler";
import protection from "../Middleware/AuthMiddleware";
import express, { Router } from "express";
import { getMessages, createMessage } from "../Controllers/MessagesController";

const router: Router = express.Router();

router.get("/getMessages", asyncHandler(protection), asyncHandler(getMessages));
router.post(
  "/createMessage",
  asyncHandler(protection),
  asyncHandler(createMessage)
);

export default router;
