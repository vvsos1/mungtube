import express from "express";
import { editPassword, editProfile, userDetail } from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.editPassword,editPassword);
userRouter.get(routes.userDetail(), userDetail);
export default userRouter;
