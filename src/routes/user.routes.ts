import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  updateUser,
  uploadAvatar,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getAllUser);
router.post("/", uploadAvatar, createUser);
router.put("/:id", uploadAvatar, updateUser);
router.delete("/:id", deleteUser);

export default router;
