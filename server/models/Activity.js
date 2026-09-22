import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "car",
        "bus",
        "flight",
        "electricity",
        "veg_meal",
        "nonveg_meal",
      ],
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    co2: {
      type: Number,
      required: true,
      min: 0,
    },

    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;