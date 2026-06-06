import express from "express";
import { getBanner } from "../controllers/Banner.js";
import { upload } from "../config/UploadImage.js";

const router = express.Router();

router.get("/banner", getBanner);

export default router;
