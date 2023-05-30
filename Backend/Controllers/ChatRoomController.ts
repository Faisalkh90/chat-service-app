import { Request, Response } from "express";
import ChatRoomModel from "../Models/ChatRoomModel";
import { chatRoom } from "../Interface/ChatRoomTypes";

async function createChatRoom(req: Request, res: Response) {
  const { name } = req.body;

  //check if the name field is present and not empty
  if (!name || name.trim().length === 0) {
    res.status(400).json({
      message: "Chatroom name is required",
    });
  }

  //check if the chatroom name already exists
  const chatRoomExists: chatRoom | null = await ChatRoomModel.findOne({ name });
  if (chatRoomExists) {
    res.status(400).json({
      message: "Chatroom name already exists",
    });
  }
  try {
    const chatRoom: chatRoom = await ChatRoomModel.create({ name });
    res.status(201).json({
      message: "Chatroom created successfully",
      chatRoom,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create chat room",
    });
  }
}

export { createChatRoom };
