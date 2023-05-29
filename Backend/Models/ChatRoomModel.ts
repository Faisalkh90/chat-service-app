import mongoose from "mongoose";

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("ChatRoom", chatroomSchema);
