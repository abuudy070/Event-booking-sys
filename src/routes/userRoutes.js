import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  login,
  logout,
  register,
  updateUser,
} from "../controllers/userController.js";
import { protect, superAdminOnly } from "../middleware/auth.js";

const userRouter = express.Router();



userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/users", protect, superAdminOnly, getUsers);
userRouter.post("/users", protect, superAdminOnly, createUser);
userRouter.patch("/users/:id", protect, superAdminOnly, updateUser);
userRouter.delete("/users/:id", protect, superAdminOnly, deleteUser);

export default userRouter;
