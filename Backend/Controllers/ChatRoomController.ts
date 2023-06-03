import { Request, Response } from "express";
import ChatRoomModel from "../Models/ChatRoomModel";
import { chatRoom } from "../Interface/ChatRoomTypes";

// Create a new chat room
async function createChatRoom(req: Request, res: Response) {
  //get the name of the chatroom from the request body
  const { name } = req.body;

  //check if the name field is present and not empty
  if (!name || name.trim().length === 0) {
    res.status(400).json({
      message: "Chatroom name is required",
    });
  }

  //regex to check if the chatroom name contains only alphabets and spaces
  const nameRegex = /^[A-Za-z\s]+$/;

  //check if the chatroom name contains only alphabets and spaces
  if (!nameRegex.test(name)) {
    res.status(400).json({
      message: "Chatroom name can contain only alphabets",
    });
    throw new Error("Chatroom name can contain only alphabets");
  }

  // check if the chatroom name is already present in the database
  const chatRoomExists: chatRoom | null = await ChatRoomModel.findOne({ name });
  //if chatroom name is already present in the database, throw an error
  if (chatRoomExists) {
    res.status(400).json({
      message: "Chatroom name already exists",
    });
    throw new Error("Chatroom name already exists");
  }
  try {
    //create a new chatroom
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

// Get all chat rooms
async function getAllChatRooms(req: Request, res: Response) {
  try {
    //get all chatrooms from the database
    const chatRooms: chatRoom[] = await ChatRoomModel.find({});
    res.json(chatRooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get chat rooms",
    });
  }
}

export { createChatRoom, getAllChatRooms };
