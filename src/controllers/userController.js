import passport from "passport";
import User from "../models/User";
import routes from "../routes";

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  failureFlash: "Can't log in. Check email and/or password",
  successRedirect: routes.home,
  successFlash: "Welcome",
});

export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time",
});

export const githubLoginCallback = async (
  _accessToken,
  _refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id: githubId, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = githubId;
      user.avatarUrl = avatarUrl;
      await user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({ githubId, avatarUrl, name, email });
      return cb(null, newUser);
    }
  } catch (err) {
    return cb(err);
  }
};

export const postGithubLogin = (req, res) => res.redirect(routes.home);

export const facebookLogin = passport.authenticate("facebook", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time",
});

export const facebookLoginCallback = async (
  _accessToken,
  _refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id: facebookId, name, email },
  } = profile;
  const avatarUrl = `https://graph.facebook.com/${facebookId}/picture?type=large`;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = facebookId;
      user.avatarUrl = avatarUrl;
      await user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        facebookId,
        name,
        email,
        avatarUrl,
      });
      return cb(null, newUser);
    }
  } catch (err) {
    return cb(err);
  }
};

export const postFacebookLogin = (req, res) => res.redirect(routes.home);

export const kakaotalkLogin = passport.authenticate("kakao", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time",
});

export const kakaotalkLoginCallback = async (
  _accessToken,
  _refreshToken,
  profile,
  cb
) => {
  const {
    _json: {
      id: kakaoId,
      properties: { nickname: name, profile_image: avatarUrl },
      kakao_account: { email },
    },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.kakaoId = kakaoId;
      user.avatarUrl = avatarUrl;
      await user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        kakaoId,
        name,
        email,
        avatarUrl,
      });
      return cb(null, newUser);
    }
  } catch (err) {
    return cb(err);
  }
};

export const postKakaotalkLogin = (req, res) => res.redirect(routes.home);

export const logout = (req, res) => {
  req.flash("info", "Logged out, see you later");
  req.logout();
  res.redirect(routes.home);
};
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { name, email, password, password2 } = req.body;

  if (password !== password2) {
    req.flash("error", "Password don't match");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = new User({
        name,
        email,
      });
      await User.register(user, password);
    } catch (error) {
      console.log(error);
    }
  }
};

export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const postEditProfile = async (req, res) => {
  const { id } = req.user;
  const { name, email } = req.body;
  const avatarUrl = req.file?.location || req.user.avatarUrl;
  try {
    await User.findByIdAndUpdate(id, { name, email, avatarUrl });
    res.redirect(routes.myProfile);
  } catch (error) {
    res.redirect(routes.users + routes.editProfile);
  }
};

export const getEditPassword = (req, res) => {
  res.render("editPassword", { pageTitle: "Edit Password" });
};

export const postEditPassword = async (req, res) => {
  const { oldPassword, newPassword, newPassword1 } = req.body;
  try {
    if (newPassword !== newPassword1)
      return res
        .status(400)
        .render("editPassword", { pageTitle: "Edit Password" });
    await req.user.changePassword(oldPassword, newPassword);
    return res.redirect(routes.myProfile);
  } catch (error) {
    return res.redirect(routes.users + routes.editPassword);
  }
};

export const myProfile = async (req, res) => {
  try {
    await User.populate(req.user, "videos");
    res.render("userDetail", { pageTitle: "User Detail", user: req.user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const userDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    req.flash("error", "User not found");
    res.redirect(routes.home);
  }
};
