import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      console.log(req.user);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Token Failed");
    }
  } else {
    res.status(401);
    throw new Error("No Token");
  }
});

const authAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not Authorized Admin");
  }
};

export { authenticate, authAdmin };
