import "../scss/style.scss";
import "./videoPlayer";

const searchBtn = document.getElementById("search-btn");
const searchSubmit = document.getElementById("search-submit");

searchBtn.onclick = () => {
  searchSubmit.click();
};
