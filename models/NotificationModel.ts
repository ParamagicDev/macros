import mongoose, { model, Schema } from "mongoose";

// const mongoose = require("mongoose");

const NotificationSchema: any = new Schema({
  actionDate: {
    type: Date,
    default: Date.now()
  },
  actionUserName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  as: {
    type: String,
    required: true
  }
});

export default model("notification", NotificationSchema);
