import mongoose from "mongoose";

type message = {
  message: {
    text: string;
  };
  users: object[];
  sender: mongoose.Schema.Types.ObjectId;
};

export default message;
