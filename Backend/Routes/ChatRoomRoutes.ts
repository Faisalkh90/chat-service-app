import express, { Router } from "express";
import asyncHandler from "express-async-handler";
import protection from "../Middleware/AuthMiddleware";
import { createChatRoom } from "../Controllers/ChatRoomController";
const router: Router = express.Router();
//catch errors at runtime by using express-async-handler package instead of try catch blocks
router.post(
  "/createChatRoom",
  asyncHandler(protection),
  asyncHandler(createChatRoom)
);
export default router;
