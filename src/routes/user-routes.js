import express from "express";
import { getUser, getUsers } from "../controllers/user-controller.js";
import authorized from "../middlewares/auth-middleware.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorized, getUser);

userRouter.post("/", (req, res) => {
  res.send({
    title: "CREATE new user",
  });
});

userRouter.put("/:id", (req, res) => {
  res.send({
    title: "UPDATE user by id ",
  });
});

userRouter.delete("/:id", (req, res) => {
  res.send({
    title: "DELETE user by id",
  });
});

export default userRouter;
