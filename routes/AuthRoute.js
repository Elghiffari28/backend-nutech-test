import express from "express";
import { login, registration } from "../controllers/Auth.js";
import { upload } from "../config/UploadImage.js";
import { body } from "express-validator";

const router = express.Router();
const registerRules = [
  body("email").isEmail().withMessage("Paramter email tidak sesuai format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password harus lebih dari 8 karakter")
    .notEmpty()
    .withMessage("Password harus diisi"),
];

router.post("/registration", upload.none(), registerRules, registration);
router.post("/login", upload.none(), login);

export default router;
