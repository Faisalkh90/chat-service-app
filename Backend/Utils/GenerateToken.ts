import { Response } from "express";
import jwt from "jsonwebtoken";

//create token inside cookie
export default function generateToken(res: Response, userID: string) {
  const token = jwt.sign({ userID }, process.env.ACESS_TOKEN_SECRET!, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
}
