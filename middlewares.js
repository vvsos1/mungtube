import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "MungTube";
  res.locals.routes = routes;
  next();
};
