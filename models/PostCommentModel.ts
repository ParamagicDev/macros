import mongoose, { model, Schema } from "mongoose";

const CommentSchema: Schema = new Schema({
  user: {
    type: Object,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  commentDate: {
    type: Date,
    default: Date.now()
  }
});

export default model("comment", CommentSchema);