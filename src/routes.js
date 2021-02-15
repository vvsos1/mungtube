// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const MY_PROFILE = "/me";
const SEARCH = "/search";

// Users

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const EDIT_PASSWORD = "/edit-password";

// Videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Facebook

const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

// Kakaotalk

const KAKAOTALK = "/auth/kakaotalk";
const KAKAOTALK_CALLBACK = "/auth/kakaotalk/callback";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  myProfile: MY_PROFILE,
  search: SEARCH,
  users: USERS,
  userDetail: (id) => {
    if (id) return `${USERS}${USER_DETAIL.replace(":id", id)}`;
    else return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  editPassword: EDIT_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: (id) => {
    if (id) return `${VIDEOS}${VIDEO_DETAIL.replace(":id", id)}`;
    else return VIDEO_DETAIL;
  },
  editVideo: (id) => {
    if (id) return `${VIDEOS}${EDIT_VIDEO.replace(":id", id)}`;
    else return EDIT_VIDEO;
  },
  deleteVideo: (id) => {
    if (id) return `${VIDEOS}${DELETE_VIDEO.replace(":id", id)}`;
    else return DELETE_VIDEO;
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  kakaotalk: KAKAOTALK,
  kakaotalkCallback: KAKAOTALK_CALLBACK,
};

export default routes;
