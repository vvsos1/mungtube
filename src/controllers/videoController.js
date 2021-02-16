import Video from "../models/Video";
import routes from "../routes";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  const { term: searchingFor } = req.query;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingFor, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingFor, videos });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const { title, description } = req.body;
  const { path } = req.file;
  const { id: creator } = req.user;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator,
  });

  req.user.videos.push(newVideo.id);
  await req.user.save();

  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id).populate("creator");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (erorr) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id)
      throw new Error("Not Allowed");
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id)
      throw new Error("Not Allowed");
    video.title = title;
    video.description = description;
    await video.save();
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id)
      throw new Error("Not Allowed");
    await video.remove();
    res.redirect(routes.home);
  } catch (error) {
    res.redirect(routes.home);
  }
};
