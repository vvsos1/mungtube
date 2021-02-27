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

const currentTimeText = videoContainer?.querySelector("#currentTime");
const totalTimeText = videoContainer?.querySelector("#totalTime");

const volumeRange = videoContainer?.querySelector("#jsVolume");

const progressRange = videoContainer?.querySelector("#jsProgress");

function registerView() {
  const [, videoId] = window.location.href.split("/videos/");
  fetch(`/api/${videoId}/view`, {
    method: "POST",
  });
}
async function toggleVideoPlay() {
  if (videoPlayer.paused) {
    await videoPlayer.play();
  } else {
    await videoPlayer.pause();
  }
}

function toggleVideoMute() {
  videoPlayer.muted = !videoPlayer.muted;
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
  console.log(videoPlayer.duration);
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTimeText.innerHTML = totalTimeString;
}

function setCurrentTime() {
  const currentTimeString = formatDate(Math.floor(videoPlayer.currentTime));
  currentTimeText.innerHTML = currentTimeString;
}

async function handleVideoEnd() {
  registerView();
  videoPlayer.currentTime = 0;
  await videoPlayer.pause();
}

function handleVolumeDrag({ target: { value: volume } }) {
  videoPlayer.volume = volume;
}

function syncProgressBar({ target: { currentTime, duration: totalTime } }) {
  const { max } = progressRange;
  const currentValue = max * (currentTime / totalTime);
  progressRange.value = currentValue;
}

function syncVideoPlayer({ target: { value, max } }) {
  const { duration: totalTime } = videoPlayer;
  const currentTime = totalTime * (value / max);
  videoPlayer.currentTime = currentTime;
}

videoContainer?.addEventListener("fullscreenchange", () => {
  expandIcon.classList.toggle("invisible");
  compressIcon.classList.toggle("invisible");
});
playBtn?.addEventListener("click", toggleVideoPlay);
volumeBtn?.addEventListener("click", toggleVideoMute);
fullScreenBtn?.addEventListener("click", toggleVideoFullScreen);

videoPlayer?.addEventListener("play", () => {
  playIcon.classList.add("invisible");
  pauseIcon.classList.remove("invisible");
});
videoPlayer?.addEventListener("pause", () => {
  playIcon.classList.remove("invisible");
  pauseIcon.classList.add("invisible");
});
videoPlayer?.addEventListener("volumechange", () => {
  console.log(videoPlayer.volume);
  const isMuted = videoPlayer.volume === 0 || videoPlayer.muted;
  mutedIcon.classList.toggle("invisible", isMuted);
  unmutedIcon.classList.toggle("invisible", !isMuted);
});
videoPlayer?.addEventListener("loadedmetadata", setTotalTime);
if (videoPlayer?.readyState >= 1) {
  // readyState가 1보다 높으면 메타데이터가 이미 준비된 상태
  setTotalTime();
}

videoPlayer?.addEventListener("timeupdate", setCurrentTime);
videoPlayer?.addEventListener("ended", handleVideoEnd);

volumeRange?.addEventListener("input", handleVolumeDrag);

videoPlayer?.addEventListener("timeupdate", syncProgressBar);
progressRange?.addEventListener("input", syncVideoPlayer);
