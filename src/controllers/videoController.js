import routes from "../routes";
import { videos } from "../db";

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home" ,videos});
};
export const search = (req, res) => {
  const { term: searchingFor } = req.query;
  res.render("search", { pageTitle: "Search", searchingFor, videos });
};
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = (req, res) => {
  const {file, title, description} = req.body;

  res.redirect(routes.videoDetail(324393));
}
export const videoDetail = (req, res) => {
  res.render("videoDetail", { pageTitle: "Video Detail" });
};
export const editVideo = (req, res) => {
  res.render("editVideo", { pageTitle: "Edit Video" });
};
export const deleteVideo = (req, res) => {
  res.render("deleteVideo", { pageTitle: "Delete Video" });
};