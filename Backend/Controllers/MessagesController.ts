import { Request, Response, NextFunction } from "express";
import MessageModel from "../Models/MessageModel";
import message from "../Interface/MessageTypes";

//retrieves all message documents from the database such as the id, message, users,etc.. of the the message.

async function getMessages(req: Request, res: Response) {
  try {
    const messages: message[] = await MessageModel.find({});
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

//message is the text of the message ex "hello world"
//users is the array of users in the conversation ex ["Faisal", "user2"]
//sender is the user who sent the message ex "Faisal" but in the form of an ObjectId
async function createMessage(req: Request, res: Response) {
  const { message, users, sender }: message = req.body;
  try {
    const newMessage = await MessageModel.create({
      message: { text: message },
      users: [users, sender],
      sender: sender,
    });
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

export { getMessages, createMessage };
