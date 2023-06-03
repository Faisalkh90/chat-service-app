import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel";
import { NextFunction, Request, Response } from "express";

//ensure that only authenticated users can access certain routes in an Express.js application.
async function protection(req: any, res: Response, next: NextFunction) {
  //get token from header
  let token;
  token = req.cookies.jwt;

  //check if token exists
  if (token) {
    try {
      //verify token
      const decoded: any = jwt.verify(token, process.env.ACESS_TOKEN_SECRET!);
      //get user from db (-password) to not send password to client side (to exclude the password)
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
