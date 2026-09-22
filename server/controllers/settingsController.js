import Settings from "../models/Settings.js";

export const getWeeklyTarget = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({
        weeklyTarget: 30,
      });
    }

    res.status(200).json({
      weeklyTarget: settings.weeklyTarget,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch weekly target",
      error: error.message,
    });
  }
};

export const updateWeeklyTarget = async (req, res) => {
  try {
    const { weeklyTarget } = req.body;

    if (
      weeklyTarget === undefined ||
      typeof weeklyTarget !== "number" ||
      weeklyTarget <= 0
    ) {
      return res.status(400).json({
        message: "Weekly target must be greater than 0",
      });
    }

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({
        weeklyTarget,
      });
    } else {
      settings.weeklyTarget = weeklyTarget;
      await settings.save();
    }

    res.status(200).json({
      weeklyTarget: settings.weeklyTarget,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update weekly target",
      error: error.message,
    });
  }
};