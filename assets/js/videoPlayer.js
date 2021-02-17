const videoContainer = document.querySelector("#jsVideoPlayer");
const videoPlayer = videoContainer?.querySelector("video");

const playBtn = videoContainer?.querySelector("#jsPlayButton");
const playIcon = playBtn?.querySelector(".play-icon");
const pauseIcon = playBtn?.querySelector(".pause-icon");

const volumeBtn = videoContainer?.querySelector("#jsVolumeButton");
const mutedIcon = volumeBtn?.querySelector(".muted-icon");
const unmutedIcon = volumeBtn?.querySelector(".unmuted-icon");

function toggleVideoPlay() {
  if (videoPlayer?.paused) {
    videoPlayer?.play();
  } else {
    videoPlayer?.pause();
  }
  playIcon?.classList?.toggle("invisible");
  pauseIcon?.classList?.toggle("invisible");
}

function toggleVideoMute() {
  videoPlayer.muted = !videoPlayer.muted;
  mutedIcon?.classList?.toggle("invisible");
  unmutedIcon?.classList?.toggle("invisible");
}

playBtn?.addEventListener("click", toggleVideoPlay);
volumeBtn?.addEventListener("click", toggleVideoMute);
