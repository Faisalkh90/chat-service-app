import React from "react";
import io from "socket.io-client";

export default function Chatroom({ match }: any) {
  const chatRoomID = match.params.id;
  const socket = io("https://localhost:8080", {
    query: {
      token: localStorage.getItem("userInfo"),
    },
  });

  return <div>Chatroom</div>;
}
