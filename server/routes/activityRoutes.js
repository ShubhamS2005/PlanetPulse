import express from "express";

import {
  createActivity,
  getActivities,
} from "../controllers/activityController.js";

const router = express.Router();

router.post("/", createActivity);
router.get("/", getActivities);

export default router;