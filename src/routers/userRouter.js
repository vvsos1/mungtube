import express from "express";
import {
  editPassword,
  editProfile,
  userDetail,
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.editPassword, onlyPrivate, editPassword);
userRouter.get(routes.userDetail(), userDetail);
export default userRouter;
