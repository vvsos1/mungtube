import multer from "multer";
import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "MungTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) res.redirect(routes.home);
  else next();
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) next();
  else res.redirect(routes.home);
};

const videoFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video")) cb(null, true);
  else cb(null, false);
};

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(null, false);
};

const multerVideo = multer({
  dest: "uploads/videos/",
  fileFilter: videoFileFilter,
});
const multerAvatar = multer({
  dest: "uploads/avatars/",
  fileFilter: imageFileFilter,
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
