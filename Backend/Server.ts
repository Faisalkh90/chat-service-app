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

//** CONFIG **/
const app: Application = express();
connectDB();
dotenv.config();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "*"] }));
app.use(coockieParser());

//** SSL_SERVER **//
const SSL_SERVER = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "Cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "Cert", "cert.pem")),
  },
  app
);

// routes config
app.use("/users", UserRoutes);
app.use("/chatroom", ChatRoomRoutes);

//** SOCKET_SERVER **//
const io = new Server(SSL_SERVER, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the chat-service");
});

//** ERROR_MIDDLEWARE **//
app.use(notFound);
app.use(errorHandler);

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callended");
  });

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", ({ to, signal }) => {
    io.to(to).emit("callaccepted", signal);
  });
});

SSL_SERVER.listen(process.env.PORT, () => {
  console.log(`secure server on port ${process.env.PORT}`);
});
