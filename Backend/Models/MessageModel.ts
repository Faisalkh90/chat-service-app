import mongoose from "mongoose";

//when a new Message document is created, it must include a valid ObjectId value for both the chatroom and user fields.
const messageSchema = new mongoose.Schema({
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
});

export default mongoose.model("Message", messageSchema);
