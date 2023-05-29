import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel";
import { NextFunction, Request, Response } from "express";

async function protection(req: any, res: Response, next: NextFunction) {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.ACESS_TOKEN_SECRET!);
      req.user = await UserModel.findById(decoded.userID).select("-password");
      next();
    } catch (error) {
      res.status(401);
      console.log("invalid token");
    }
  } else {
    res.status(401);
    console.log("not authorized : no token");
  }
}

export default protection;
