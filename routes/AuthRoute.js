import express from "express";
import { login, registration } from "../controllers/Auth.js";
import { upload } from "../config/UploadImage.js";

const router = express.Router();

router.post("/registration", upload.none(), registration);
router.post("/login", upload.none(), login);

export default router;
