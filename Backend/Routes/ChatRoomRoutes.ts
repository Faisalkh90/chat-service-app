import express, { Router } from "express";
import asyncHandler from "express-async-handler";
import protection from "../Middleware/AuthMiddleware";
import {
  createChatRoom,
  getAllChatRooms,
} from "../Controllers/ChatRoomController";

const router: Router = express.Router();
//catch errors at runtime by using express-async-handler package instead of try catch blocks

//get all chat rooms
router.get(
  "/getChatRooms",
  asyncHandler(protection),
  asyncHandler(getAllChatRooms)
);
//create a chat room
router.post(
  "/createChatRoom",
  asyncHandler(protection),
  asyncHandler(createChatRoom)
);

export default router;
