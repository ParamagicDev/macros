// import express, { Router, Request, Response } from "express";
// import mongoose, { Schema, model } from "mongoose";
// import FoodPostModel from "../models/FoodPostModel";
// import UserModel from "../models/UserModel";
// import CommentModel from "../models/PostCommentModel";
// import NotificationModel from "../models/NotificationModel";

// const router: Router = Router();

const express = require("express");
const UserModel = require("../models/UserModel");
const FoodPostModel = require("../models/FoodPostModel");
const NotificationModel = require("../models/NotificationModel");
const CommentModel = require("../models/PostCommentModel");

const router = express.Router();

//return all food post in collection
router.get("/", async (req, res) => {
  try {
    const allFoodPosts = await FoodPostModel.find().populate({
      path: "user",
      select: "userName"
    });
    res.send(allFoodPosts);
  } catch (error) {
    console.log(error);
  }
});

router.get("/userfeed/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const user = await UserModel.findById(userid);
    const userFeed = await FoodPostModel.find({
      $or: [{ "user._id": user.following }, { "user._id": user._id }]
    });
    res.send(userFeed);
    console.log(userFeed);
  } catch (error) {
    console.log(error);
  }
});

router.get("/random", async (req, res) => {
  try {
    const randomPost = await FoodPostModel.aggregate([
      { $sample: { size: 1 } }
    ]);
    console.log(randomPost);
    res.send(randomPost);
  } catch (error) {
    console.log(error);
  }
});

//return specific food post by id
router.get("/:foodpostid", async (req, res) => {
  const { foodpostid } = req.params;
  try {
    const currentFoodPost = await FoodPostModel.findById(foodpostid);
    res.send(currentFoodPost);
  } catch (error) {
    console.log(error);
  }
});

//add food post from specific user using user id
router.post("/:userid/addpost", async (req, res) => {
  const { userid } = req.params;
  try {
    const newFoodPost = new FoodPostModel(req.body);
    const user = await UserModel.findById(userid);
    newFoodPost.user = {
      _id: user._id,
      userName: user.userName,
      following: user.following
    };
    console.log(newFoodPost);
    await newFoodPost.save();
    user.posts.push(newFoodPost);
    await user.save();
    res.send(newFoodPost);
  } catch (error) {
    console.log(error);
  }
});

//add new comment to food post
router.post("/:userid/:postid/addcomment", async (req, res) => {
  const { userid, postid } = req.params;
  const { postUserId } = req.body;
  const user = await UserModel.findById(userid, {
    userName: 1,
    photo: 1
  });
  const postUser = await UserModel.findById(postUserId);
  try {
    const newComment = new CommentModel(req.body);
    const currentPost = await FoodPostModel.findById(postid);
    newComment.user = user;
    currentPost.comments.push(newComment);
    await currentPost.save();
    if (userid != postUserId) {
      const newNotification = new NotificationModel({
        actionDate: new Date(),
        actionUserName: user.userName,
        message: `${user.userName} commented on your ${currentPost.title} post`,
        href: `/foodpost/[id]`,
        as: `/foodpost/${currentPost._id}`
      });
      postUser.notifications.push(newNotification);
      await postUser.save();
    }
    res.send(currentPost);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
