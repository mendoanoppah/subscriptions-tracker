import express from "express";
import authorized from "../middlewares/auth-middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription-controller.js";

const subscriptionRouter = express.Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({
    title: "GET all subscription",
  });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send({
    title: "GET usuer subscription by id",
  });
});

subscriptionRouter.post("/", authorized, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  res.send({
    title: "UPDATE subscription by id",
  });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({
    title: "DELETE subscription by id",
  });
});

subscriptionRouter.get("/user/:id", authorized, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({
    title: "CANCEL subscription by id",
  });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({
    title: "GET upcoming renewals",
  });
});

export default subscriptionRouter;
