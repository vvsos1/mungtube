import "../scss/style.scss";
import "./videoPlayer";
import "./videoRecorder";
import "./addComment";

const searchBtn = document.getElementById("search-btn");
const searchSubmit = document.getElementById("search-submit");

searchBtn.onclick = () => {
  searchSubmit.click();
};
