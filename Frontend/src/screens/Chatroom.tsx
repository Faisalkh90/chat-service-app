import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import Header from "../components/Header";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { ListItem, List, IconButton } from "@mui/material";
import { Padding } from "@mui/icons-material";

type message = {
  message: string;
  name: string;
  userID: string;
};

export default function Chatroom() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState();

  const [socket, setSocket] = useState() as any;

  const newSocket = io("http://localhost:8080", {
    query: {
      token: JSON.parse(sessionStorage.getItem("userInfo")!)["authToken"],
    },
  });

  function sendMessage() {
    newSocket.emit("chatroomMessage", {
      chatroomId: searchParams.get("id"),
      message: newMessage,
      userId: JSON.parse(sessionStorage.getItem("userInfo")!)["id"],
    });
  }

  newSocket.on("disconnect", () => {
    setSocket(null);
  });

  newSocket.on("connection", () => {
    toast.success("Socket Connection");
    setSocket(newSocket);
  });

  useEffect(() => {
    newSocket.emit("joinRoom", {
      chatroomId: searchParams.get("id"),
    });

    newSocket.on("newMessage", (message) => {
      setMessages((prev: any) => [...prev, message] as any);
    });

    return () => {
      newSocket.emit("leaveRoom", {
        chatroomId: searchParams.get("id"),
      });
    };
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <>
      <Header />
      <Box
        sx={{
          position: "relative",
          margin: "auto",
          marginTop: 15,
          width: "50%",
          height: "70vh",
          backgroundColor: "#F9F5F8",
          borderRadius: 5,
          padding: 2,
          overflow: "auto",
        }}
      >
        {messages.length > 0 &&
          messages.map((message: any) => (
            <Box
              sx={{
                backgroundColor: "#DBDFEA",
                borderRadius: 2,
                opacity: 0.9,
                maxHeight: 150,
              }}
            >
              <p style={{ padding: 10 }}>
                name:{message.name}
                <br />
                Content:{message.message}
              </p>
              {/* <h5>Name: {message.name}</h5>
              <h5>Content: {message.message}</h5> */}
            </Box>
          ))}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            display: "flex",
            alignItems: "center",
            padding: 5,
            width: "100%",
          }}
        >
          <TextField
            required
            name="message"
            label="message"
            sx={{ width: "80%" }}
            onChange={(e: any) => {
              setNewMessage(e.target.value);
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4F709C",
              marginLeft: 1,
              height: 55,
              width: 100,
            }}
            onClick={() => {
              sendMessage();
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
}
