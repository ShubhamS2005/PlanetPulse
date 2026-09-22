import Activity from "../models/Activity.js";
import { EMISSION_FACTORS } from "../constants/emissionFactors.js";
import { MAX_QUANTITIES } from "../constants/activityLimits.js";

export const createActivity = async (req, res) => {
  try {
    const { type, quantity, date } = req.body;

    if (!type || quantity === undefined || !date) {
      return res.status(400).json({
        message: "Type, quantity and date are required",
      });
    }

    if (!EMISSION_FACTORS[type]) {
      return res.status(400).json({
        message: "Invalid activity type",
      });
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    // DP2: reject obviously unreasonable single-entry values
    const maxQuantity = MAX_QUANTITIES[type];

    if (quantity > maxQuantity) {
      return res.status(400).json({
        message: `This value seems unusually high for ${type}. Please check your entry.`,
        code: "ABSURD_INPUT",
        maxAllowed: maxQuantity,
      });
    }

    const factor = EMISSION_FACTORS[type];
    const co2 = Number((quantity * factor).toFixed(2));

    const activity = await Activity.create({
      type,
      quantity,
      co2,
      date,
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create activity",
      error: error.message,
    });
  }
};

export const getActivities = async (req, res) => {
  try {
    const { type, date } = req.query;

    const filter = {};

    if (type) {
      filter.type = type;
    }

    if (date) {
      filter.date = date;
    }

    const activities = await Activity.find(filter).sort({
      date: -1,
      createdAt: -1,
    });

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch activities",
      error: error.message,
    });
  }
};

