import express, { Application, Request, Response } from "express";
import cors from "cors";
import https from "https";
import { Server } from "socket.io";
import fs from "fs";
import path from "path";
import coockieParser from "cookie-parser";
import * as dotenv from "dotenv";
import { notFound, errorHandler } from "./Middleware/ErrorMiddleware";
import connectDB from "./Config/Database";

import UserRoutes from "./Routes/UserRoutes";
import ChatRoomRoutes from "./Routes/ChatRoomRoutes";

//** MODELS **/
import User from "./Models/UserModel";
import Message from "./Models/MessageModel";
import ChatRoom from "./Models/ChatRoomModel";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//** CONFIG **/
const app: Application = express();
connectDB();
dotenv.config();
app.use(coockieParser());
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "*"] }));

//** SSL_SERVER **//
// const SSL_SERVER = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname, "Cert", "key.pem")),
//     cert: fs.readFileSync(path.join(__dirname, "Cert", "cert.pem")),
//   },
//   app
// );

// routes config
app.use("/users", UserRoutes);
app.use("/chatroom", ChatRoomRoutes);
const server = app.listen(process.env.PORT, () => {
  console.log(`secure server on port ${process.env.PORT}`);
});

//** SOCKET_SERVER **//
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the chat-service");
});

//** ERROR_MIDDLEWARE **//
app.use(notFound);
app.use(errorHandler);

const message = mongoose.model("Message");
const user = mongoose.model("User");

// middleware function is used to authenticate Socket.IO connections by verifying JWT tokens
io.use(async (socket, next) => {
  try {
    const token: any = socket.handshake.query.token;
    const payload: any = jwt.verify(token, process.env.ACESS_TOKEN_SECRET!);
    socket.data.userId = payload.id;
    next();
  } catch (error) {
    console.log("invalid token");
  }
});

//event listener that listens for the connection event, which is emitted when a new client connects to the server
io.on("connection", (socket) => {
  console.log(`connected ${socket.id}`);
  //event listener is triggered when a client disconnects from the server
  socket.on("disconnect", () => {
    console.log(`disconnected ${socket.id}`);
  });

  //event listener is triggered when a client wants to join a chat room.
  socket.on("joinRoom", ({ chatRoomID }) => {
    //join the room
    socket.join(chatRoomID);
    console.log(`A user joined chatroom: ${chatRoomID}`);
  });

  //event listener is triggered when a client wants to leave a chat room
  socket.on("leaveRoom", ({ chatRoomID }) => {
    //leave the room
    socket.leave(chatRoomID);
    console.log(`A user left chatroom: ${chatRoomID}`);
  });

  //event listener is triggered when a client sends a new chat message.
  socket.on("chatroomMessage", async ({ chatRoomID, message }) => {
    //check if the message not empty then emit the new message event to clients in the specified chat room
    if (message.trim().length > 0) {
      //find the user by id
      const user = await User.findById({ _id: socket.data.userId });
      //create a new message document
      const newMessage = new Message({
        chatroom: chatRoomID,
        user: socket.data.userId,
        message: message,
      });
      //check if the user not found then throw an error
      if (!user) throw new Error("User not found");
      //Sends a new message event to all clients in the specified chat room
      io.to(chatRoomID).emit("newMessage", {
        message,
        name: user.name,
        userID: socket.data.userId,
      });
      //Saves a new document to the database
      await newMessage.save();
    }
  });
});
