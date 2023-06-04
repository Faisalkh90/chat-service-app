import mongoose from "mongoose";

//when a new Message document is created, it must include a valid ObjectId value for the user field.

//The message field is used to store the actual message that the user sends in the chat room.
const messageSchema = new mongoose.Schema(
  {
    chatroom: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ChatRoom",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema);
