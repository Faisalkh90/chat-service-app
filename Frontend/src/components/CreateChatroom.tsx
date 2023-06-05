import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ListItem, List, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";
import { useNavigate, createSearchParams } from "react-router-dom";

export default function MediaCard() {
  const [chatroomName, setChatroomName] = useState("");
  const [chatroomList, setChatroomList] = useState([{}] as any);

  const nav = useNavigate();

  async function getChatroomList() {
    const acessToken = JSON.parse(localStorage.getItem("userInfo")!)[
      "authToken"
    ];

    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer" + " " + acessToken,
    };
    const url = "http://localhost:8080/chatroom/getChatRooms";
    const result = await axios.get(url, { headers });

    console.log(result.data);
    setChatroomList(result.data);
  }

  useEffect(() => {
    getChatroomList();
  }, []);

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", marginTop: 25 }}>
      <CardMedia
        sx={{ height: 250 }}
        image="https://9to5mac.com/wp-content/uploads/sites/6/2023/02/Telegram.jpg?quality=82&strip=all&w=1600"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Create Chat Room
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="chatroomName"
          label="Name"
          name="chatroomName"
          autoFocus
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChatroomName(e.target.value)
          }
        />
      </CardContent>
      <CardActions>
        <Button size="small">Create</Button>
      </CardActions>
      {chatroomList ? (
        chatroomList.map((chatroom: any) => {
          return (
            <List>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      nav({
                        pathname: "/chatroom",
                        search: createSearchParams({
                          id: chatroom._id,
                        }).toString(),
                      });
                    }}
                  >
                    <ChatIcon />
                  </IconButton>
                }
              >
                {chatroom.name}
              </ListItem>
            </List>
          );
        })
      ) : (
        <h1>s</h1>
      )}
    </Card>
  );
}
