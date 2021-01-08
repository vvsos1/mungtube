import Video from "../models/Video";
import routes from "../routes";

export const home = async (req, res) => {
    const videos = await Video.find({});
    try {
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.error(error);
        res.render("home", { pageTitle: "Home", videos:[] });        
    }
};
export const search = (req, res) => {
    const { term: searchingFor } = req.query;
    res.render("search", { pageTitle: "Search", searchingFor, videos: [] });
};
export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
    const { title, description } = req.body;
    const {path} = req.file;
    
    const newVideo = await Video.create({
      fileUrl : path,
      title,
      description
    });

    console.log(newVideo);
    
    res.redirect(routes.videoDetail(newVideo.id));
};
export const videoDetail = async (req, res) => {
    const {id} = req.params;
    try {
        const video = await Video.findById(id);
        res.render('videoDetail',{pageTitle:"Video Detail", video});
    } catch(erorr) {
        res.redirect(routes.home);
    }
};
export const editVideo = (req, res) => {
    res.render("editVideo", { pageTitle: "Edit Video" });
};
export const deleteVideo = (req, res) => {
    res.render("deleteVideo", { pageTitle: "Delete Video" });
};
