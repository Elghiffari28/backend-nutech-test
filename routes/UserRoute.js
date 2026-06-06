import express from "express";
import {
  getBalance,
  getProfile,
  updateProfile,
  updateProfileImage,
} from "../controllers/User.js";
import { upload } from "../config/UploadImage.js";
import { authMiddleware } from "../middleware/Auth.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile/update", upload.none(), authMiddleware, updateProfile);
router.put(
  "/profile/image",
  upload.single("profile_image"),
  authMiddleware,
  updateProfileImage,
);
router.get("/balance", authMiddleware, getBalance);

export default router;
