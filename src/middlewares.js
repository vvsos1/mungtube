import multer from "multer";
import multerS3 from "multer-s3";
import { S3 } from "aws-sdk";
import routes from "./routes";

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    expired: false,
  },
  region: "ap-northeast-2",
});

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
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "mungtube/video",
  }),
  fileFilter: videoFileFilter,
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "mungtube/avatar",
  }),
  fileFilter: imageFileFilter,
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
