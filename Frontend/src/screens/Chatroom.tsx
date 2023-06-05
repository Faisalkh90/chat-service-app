import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import Header from "../components/Header";
import { Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

import SendIcon from "@mui/icons-material/Send";

const Message = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(1),
  padding: theme.spacing(1),
}));

export default function Chatroom() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("id"));

  const messageList = [{ text: "asd" }, { text: "asdasdasd" }];

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
        }}
      >
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
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#30A2FF",
              marginLeft: 1,
              height: 55,
              width: 100,
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
}
