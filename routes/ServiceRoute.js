import express from "express";
import { upload } from "../config/UploadImage.js";
import { getServices } from "../controllers/Service.js";

const router = express.Router();

router.get("/services", getServices);

export default router;
