import express from "express";

import {
  getWeeklyTarget,
  updateWeeklyTarget,
} from "../controllers/settingsController.js";

const router = express.Router();

router.get("/target", getWeeklyTarget);
router.put("/target", updateWeeklyTarget);

export default router;