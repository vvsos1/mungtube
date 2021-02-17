const videoContainer = document.querySelector("#jsVideoPlayer");
const videoPlayer = videoContainer?.querySelector("video");
const playBtn = videoContainer?.querySelector("#jsPlayButton");

function handlePlayClick() {
  if (videoPlayer?.paused) {
    videoPlayer?.play();
  } else {
    videoPlayer?.pause();
  }
}

playBtn?.addEventListener("click", handlePlayClick);
