import mongoose from "mongoose";

//when a new Message document is created, it must include a valid ObjectId value for the user field.

/*
  - store multiple user objects who are involved in the conversation.
   -message field with a text subfield allows you to store the text content of a message.
   -sender represents the user who sent the message.
 */
const messageSchema = new mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: [Object],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema);
