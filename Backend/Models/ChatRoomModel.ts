import mongoose from "mongoose";
//used to store the name of the chat room so that users can identify and join the chat room later.
const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("ChatRoom", chatroomSchema);
