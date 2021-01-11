import mongoose, { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: String,
  githubId: String,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

export default mongoose.model("User", UserSchema);
