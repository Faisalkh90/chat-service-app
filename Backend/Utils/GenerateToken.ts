import jwt from "jsonwebtoken";
import { Response } from "express";

//create token inside cookie
export default function generateToken(res: Response, userID: string) {
  const token = jwt.sign({ userID }, process.env.ACESS_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
  console.log(`token from the generate function: , ${token}`);

  return token;

  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== "development",
  //   sameSite: "strict",
  //   maxAge: 1 * 24 * 60 * 60 * 1000,
  // });
}
