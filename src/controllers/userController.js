import passport from "passport";
import User from "../models/User";
import routes from "../routes";

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { name, email, password, password2 } = req.body;

  if (password !== password2) {
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

export const editProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit Profile" });
};
export const editPassword = (req, res) => {
  res.render("editPassword", { pageTitle: "Edit Password" });
};
export const userDetail = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail" });
};
