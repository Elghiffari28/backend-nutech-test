import express from "express";
import { getProfile, login, registration } from "../controllers/Auth.js";
import { upload } from "../config/UploadImage.js";
import { authMiddleware } from "../middleware/Auth.js";

const router = express.Router();

router.post("/register", upload.none(), registration);
router.post("/login", upload.none(), login);
router.get("/profile", authMiddleware, getProfile);

export default router;
