import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useRegisterMutation } from "../slices/usersAPISlice";
import { toast } from "react-toastify";

export default function RegisterDialog({ open, handleClosing }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [register] = useRegisterMutation();

  useEffect(() => {
    if (
      email.length >= 6 &&
      password.length >= 6 &&
      email.includes("@") &&
      email.includes(".com")
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  async function handleRegistartion() {
    try {
      await register({ name, email, password }).unwrap();
      toast.success("User registered, Please login to continue");
      handleClosing();
    } catch (error) {
      toast.error("Registration error");
    }
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClosing}>
        <DialogTitle>Sign-Up</DialogTitle>
        <DialogContent>
          <DialogContentText>Chat-App : Telegram clone</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="passowrd"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosing}>Cancel</Button>
          <Button disabled={disabled} onClick={handleRegistartion}>
            Sign-Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
