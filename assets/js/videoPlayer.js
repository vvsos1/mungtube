const videoContainer = document.querySelector("#jsVideoPlayer");
const videoPlayer = videoContainer?.querySelector("video");

const playBtn = videoContainer?.querySelector("#jsPlayButton");
const playIcon = playBtn?.querySelector(".play-icon");
const pauseIcon = playBtn?.querySelector(".pause-icon");

const volumeBtn = videoContainer?.querySelector("#jsVolumeButton");
const mutedIcon = volumeBtn?.querySelector(".muted-icon");
const unmutedIcon = volumeBtn?.querySelector(".unmuted-icon");

const fullScreenBtn = videoContainer?.querySelector("#jsFullScreenButton");
const expandIcon = fullScreenBtn?.querySelector(".expand-icon");
const compressIcon = fullScreenBtn?.querySelector(".compress-icon");

const currentTime = videoContainer?.querySelector("#currentTime");
const totalTime = videoContainer?.querySelector("#totalTime");

async function toggleVideoPlay() {
  if (videoPlayer.paused) {
    await videoPlayer.play();
  } else {
    await videoPlayer.pause();
  }
  playIcon.classList.toggle("invisible");
  pauseIcon.classList.toggle("invisible");
}

function toggleVideoMute() {
  videoPlayer.muted = !videoPlayer.muted;
  mutedIcon.classList.toggle("invisible");
  unmutedIcon.classList.toggle("invisible");
}

function isFullScreen(domElement) {
  return document.fullscreenElement === domElement;
}

async function toggleVideoFullScreen() {
  if (isFullScreen(videoContainer)) {
    await document.exitFullscreen();
  } else {
    await videoContainer.requestFullscreen();
  }
}

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
}

function setCurrentTime() {
  const currentTimeString = formatDate(videoPlayer.currentTime);
  currentTime.innerHTML = currentTimeString;
}

videoContainer?.addEventListener("fullscreenchange", () => {
  expandIcon.classList.toggle("invisible");
  compressIcon.classList.toggle("invisible");
});
playBtn?.addEventListener("click", toggleVideoPlay);
volumeBtn?.addEventListener("click", toggleVideoMute);
fullScreenBtn?.addEventListener("click", toggleVideoFullScreen);

videoPlayer?.addEventListener("loadedmetadata", setTotalTime);
if (videoPlayer?.readyState >= 1) {
  // readyState가 1보다 높으면 메타데이터가 이미 준비된 상태
  setTotalTime();
}

videoPlayer?.addEventListener("timeupdate", setCurrentTime);
