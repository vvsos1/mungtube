import express from "express";
import passport from "passport";
import {
  facebookLogin,
  getJoin,
  getLogin,
  githubLogin,
  kakaotalkLogin,
  logout,
  myProfile,
  postFacebookLogin,
  postGithubLogin,
  postJoin,
  postKakaotalkLogin,
  postLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPrivate, onlyPublic } from "../middlewares";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.myProfile, myProfile);

globalRouter.get(routes.search, search);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: routes.login }),
  postGithubLogin
);

globalRouter.get(routes.facebook, facebookLogin);

globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: routes.login }),
  postFacebookLogin
);

globalRouter.get(routes.kakaotalk, kakaotalkLogin);
globalRouter.get(
  routes.kakaotalkCallback,
  passport.authenticate("kakao", { failureRedirect: routes.login }),
  postKakaotalkLogin
);

export default globalRouter;
