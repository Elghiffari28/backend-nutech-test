import express from "express";
import {
  getHistory,
  payment,
  topupBalance,
} from "../controllers/Transaction.js";
import { upload } from "../config/UploadImage.js";
import { authMiddleware } from "../middleware/Auth.js";

const router = express.Router();

router.post("/topup", upload.none(), authMiddleware, topupBalance);
router.post("/transaction", upload.none(), authMiddleware, payment);
router.get("/transaction/history", upload.none(), authMiddleware, getHistory);

export default router;
