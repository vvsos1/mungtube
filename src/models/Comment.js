import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Comment", CommentSchema);
