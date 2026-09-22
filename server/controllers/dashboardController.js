import Activity from "../models/Activity.js";
import Settings from "../models/Settings.js";

const getCurrentWeekRange = () => {
  const today = new Date();

  const day = today.getDay();

  const daysFromMonday = day === 0 ? 6 : day - 1;

  const start = new Date(today);
  start.setDate(today.getDate() - daysFromMonday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

export const getDashboard = async (req, res) => {
  try {
    const activities = await Activity.find();

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({
        weeklyTarget: 30,
      });
    }

    const totalFootprint = activities.reduce(
      (total, activity) => total + activity.co2,
      0
    );

    const { start, end } = getCurrentWeekRange();

    const weeklyActivities = activities.filter((activity) => {
      const activityDate = new Date(`${activity.date}T00:00:00`);

      return activityDate >= start && activityDate <= end;
    });

    const weeklyFootprint = weeklyActivities.reduce(
      (total, activity) => total + activity.co2,
      0
    );

    const categoryMap = {};

    activities.forEach((activity) => {
      if (!categoryMap[activity.type]) {
        categoryMap[activity.type] = 0;
      }

      categoryMap[activity.type] += activity.co2;
    });

    const categoryBreakdown = Object.entries(categoryMap).map(
      ([type, co2]) => ({
        type,
        co2: Number(co2.toFixed(2)),
      })
    );

    const weeklyTarget = settings.weeklyTarget;

    const progressPercentage = Number(
      ((weeklyFootprint / weeklyTarget) * 100).toFixed(2)
    );

    const targetExceeded = weeklyFootprint > weeklyTarget;

    res.status(200).json({
      totalFootprint: Number(totalFootprint.toFixed(2)),
      weeklyFootprint: Number(weeklyFootprint.toFixed(2)),
      weeklyTarget,
      progressPercentage,
      targetExceeded,
      categoryBreakdown,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};