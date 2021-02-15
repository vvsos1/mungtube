import express from "express";
import {
  editPassword,
  getEditProfile,
  userDetail,
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.get(routes.editPassword, onlyPrivate, editPassword);
userRouter.get(routes.userDetail(), userDetail);
export default userRouter;
