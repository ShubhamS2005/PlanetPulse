import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    weeklyTarget: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;