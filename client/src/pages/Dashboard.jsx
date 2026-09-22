
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Leaf,
  LoaderCircle,
  Target,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import API from "../api.js";

const CATEGORY_LABELS = {
  car: "Car travel",
  bus: "Bus travel",
  flight: "Flights",
  electricity: "Electricity",
  veg_meal: "Vegetarian meals",
  nonveg_meal: "Non-vegetarian meals",
};

function getCurrentWeekRange() {
  const today = new Date();

  const day = today.getDay();
  const daysFromMonday = day === 0 ? 6 : day - 1;

  const start = new Date(today);
  start.setDate(today.getDate() - daysFromMonday);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const formatDate = (date) =>
    date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  return `${formatDate(start)} – ${formatDate(end)}`;
}

function Dashboard() {
  const location = useLocation();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("/dashboard");

        setDashboard(response.data);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load dashboard data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [location.key]);

  if (loading) {
    return (
      <section className="flex min-h-[50vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl border border-[#1f6b4f]/10 bg-[#f7fbf4] px-5 py-4 shadow-sm">
          <LoaderCircle className="h-5 w-5 animate-spin text-[#1f6b4f]" />
          <span className="font-semibold text-[#17352a]">
            Loading your footprint...
          </span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-6">
        <div className="rounded-[1.5rem] border border-[#ed7655]/20 bg-[#fff7f3] p-6 shadow-sm">
          <h1 className="display text-3xl font-bold text-[#17352a]">
            Dashboard unavailable
          </h1>

          <p className="mt-2 text-[#557264]">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-xl bg-[#17352a] px-5 py-2.5 font-semibold text-white transition hover:bg-[#1f6b4f]"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  const {
    totalFootprint,
    weeklyFootprint,
    weeklyTarget,
    progressPercentage,
    targetExceeded,
    categoryBreakdown = [],
  } = dashboard;

  const weekRange = getCurrentWeekRange();

  const safeProgress = Number.isFinite(progressPercentage)
    ? Number(progressPercentage.toFixed(2))
    : 0;

  const progressWidth = Math.min(Math.max(safeProgress, 0), 100);

  const maxCategoryCO2 = Math.max(
    ...categoryBreakdown.map((item) => item.co2),
    1
  );

  const topCategory =
    categoryBreakdown.length > 0
      ? [...categoryBreakdown].sort((a, b) => b.co2 - a.co2)[0]
      : null;

  const topCategoryLabel = topCategory
    ? CATEGORY_LABELS[topCategory.type] || topCategory.type
    : "No activity yet";

  const remainingTarget = Math.max(
    Number((weeklyTarget - weeklyFootprint).toFixed(2)),
    0
  );

  const amountAboveTarget = Number(
    (weeklyFootprint - weeklyTarget).toFixed(2)
  );

  const targetMessage = targetExceeded
    ? `${amountAboveTarget} kg CO₂ above target`
    : `${remainingTarget} kg CO₂ remaining`;

  return (
    <section className="space-y-4">
      {/* Activity saved */}
      {location.state?.activitySaved && (
        <div className="flex items-start gap-3 rounded-xl border border-[#1f6b4f]/20 bg-[#f1f9ec] px-4 py-3">
          <Leaf className="mt-0.5 h-5 w-5 shrink-0 text-[#1f6b4f]" />

          <div>
            <p className="font-bold text-[#17352a]">
              Activity added successfully.
            </p>

            <p className="text-sm text-[#557264]">
              Your dashboard has been updated.
            </p>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Hero copy */}
        <div className="rounded-[1.75rem] bg-[#17352a] p-6 text-white shadow-lg md:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#c9ef78]">
            <Leaf className="h-4 w-4" />
            Personal climate dashboard
          </div>

          <h1 className="display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-5xl">
            Know your footprint.
            <br />
            Shape a lighter week.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-6 text-[#dce8dc]">
            Log everyday choices, see their CO₂ impact, and stay close to your
            weekly target.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/log"
              className="inline-flex items-center gap-2 rounded-xl bg-[#c9ef78] px-5 py-2.5 font-bold text-[#17352a] transition hover:brightness-95"
            >
              Log an activity
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/history"
              className="inline-flex items-center rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View history
            </Link>
          </div>
        </div>

        {/* TREE CARD */}
        <div className="relative min-h-[360px] overflow-hidden rounded-[1.75rem] bg-[#c9ef78] shadow-lg">
          {/* Decorative background */}
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border-[24px] border-[#1f6b4f]/10" />

          <div className="absolute -left-10 bottom-8 h-28 w-28 rounded-full bg-[#b2dc67]/40" />

          {/* Header */}
          <div className="absolute left-5 right-5 top-5 z-20 flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1f6b4f]">
                Weekly pulse
              </p>

              <p className="mt-1 text-xs font-medium text-[#42634f]">
                {weekRange}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#17352a] text-[#c9ef78] shadow-sm">
              <Leaf className="h-5 w-5" />
            </div>
          </div>

          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#8fc45a]/30" />

          {/* Tree */}
          <div className="absolute bottom-7 left-1/2 h-[280px] w-[250px] -translate-x-1/2">
            {/* Shadow */}
            <div className="absolute bottom-0 left-1/2 h-5 w-36 -translate-x-1/2 rounded-full bg-[#17352a]/10 blur-sm" />

            {/* Trunk */}
            <div className="absolute bottom-0 left-1/2 h-44 w-10 -translate-x-1/2 rounded-b-[1.2rem] rounded-t-[45%] bg-[#815638]" />

            {/* Trunk highlight */}
            <div className="absolute bottom-2 left-[calc(50%-3px)] h-36 w-2 rounded-full bg-[#a97049]/60" />

            {/* Main branches */}
            <div className="absolute bottom-[112px] left-[78px] h-28 w-5 -rotate-[40deg] rounded-full bg-[#815638]" />

            <div className="absolute bottom-[118px] right-[78px] h-28 w-5 rotate-[40deg] rounded-full bg-[#815638]" />

            <div className="absolute bottom-[150px] left-[96px] h-20 w-4 -rotate-[65deg] rounded-full bg-[#815638]" />

            <div className="absolute bottom-[150px] right-[96px] h-20 w-4 rotate-[65deg] rounded-full bg-[#815638]" />

            {/* Main canopy */}
            <div className="absolute left-1/2 top-2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#1f6b4f] shadow-[0_16px_30px_rgba(23,53,42,0.18)]" />

            {/* Canopy clusters */}
            <div className="absolute left-[4px] top-[70px] h-28 w-28 rounded-full bg-[#276f50]" />

            <div className="absolute right-[2px] top-[62px] h-32 w-32 rounded-full bg-[#246b4d]" />

            <div className="absolute left-[48px] top-[-10px] h-28 w-28 rounded-full bg-[#3b895f]" />

            <div className="absolute right-[42px] top-[5px] h-24 w-24 rounded-full bg-[#347f59]" />

            <div className="absolute left-[48px] top-[82px] h-20 w-20 rounded-full bg-[#2f7b56]" />

            {/* Leaf highlights */}
            <div className="absolute left-[38px] top-[52px] h-3.5 w-3.5 rounded-full bg-[#c9ef78]" />

            <div className="absolute right-[48px] top-[48px] h-3 w-3 rounded-full bg-[#c9ef78]" />

            <div className="absolute left-[85px] top-[25px] h-2.5 w-2.5 rounded-full bg-[#b8e46d]" />

            <div className="absolute right-[82px] top-[82px] h-3 w-3 rounded-full bg-[#b8e46d]" />

            <div className="absolute left-[118px] top-[105px] h-2.5 w-2.5 rounded-full bg-[#d7f58e]" />
          </div>

          {/* DATA PANEL */}
          <div className="absolute bottom-4 left-4 right-4 z-30 rounded-2xl border border-white/60 bg-[#f7fbf4]/95 p-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-4">
              {/* Progress ring */}
              <div
                className="relative flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(
                    #17352a ${progressWidth * 3.6}deg,
                    rgba(23, 53, 42, 0.12) ${progressWidth * 3.6}deg
                  )`,
                }}
              >
                <div className="flex h-[62px] w-[62px] flex-col items-center justify-center rounded-full bg-[#f7fbf4]">
                  <span className="text-sm font-bold leading-none text-[#17352a]">
                    {safeProgress}%
                  </span>

                  <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#557264]">
                    used
                  </span>
                </div>
              </div>

              {/* Main weekly value */}
              <div className="min-w-0">
                <p className="text-[2rem] font-bold leading-none tracking-tight text-[#17352a]">
                  {weeklyFootprint}
                </p>

                <p className="mt-1 text-xs font-bold text-[#17352a]">
                  kg CO₂ this week
                </p>

                <p className="mt-1 text-[10px] font-semibold text-[#557264]">
                  of {weeklyTarget} kg weekly target
                </p>

                <p
                  className={`mt-1.5 text-[10px] font-bold ${
                    targetExceeded ? "text-[#a8432b]" : "text-[#1f6b4f]"
                  }`}
                >
                  {targetMessage}
                </p>
              </div>
            </div>

            {/* Largest contributor */}
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#17352a]/10 pt-3">
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#557264]">
                  Largest contributor
                </p>

                <p className="mt-0.5 truncate text-xs font-bold text-[#17352a]">
                  {topCategoryLabel}
                </p>
              </div>

              {topCategory && (
                <span className="shrink-0 rounded-full bg-[#dfeeda] px-2.5 py-1 text-[10px] font-bold text-[#1f6b4f]">
                  {topCategory.co2} kg CO₂
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* All-time */}
        <div className="card rounded-2xl bg-[#f7fbf4] p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#557264]">
              All-time footprint
            </p>

            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#dfeeda]">
              <TrendingUp className="h-4 w-4 text-[#1f6b4f]" />
            </span>
          </div>

          <p className="display mt-3 text-3xl font-bold text-[#17352a]">
            {totalFootprint}
            <span className="ml-1.5 text-base font-semibold">kg CO₂</span>
          </p>

          <p className="mt-1 text-xs text-[#557264]">
            Across all logged activities
          </p>
        </div>

        {/* This week */}
        <div className="card rounded-2xl bg-[#f7fbf4] p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#557264]">
              This week
            </p>

            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#dfeeda]">
              <Leaf className="h-4 w-4 text-[#1f6b4f]" />
            </span>
          </div>

          <p className="display mt-3 text-3xl font-bold text-[#17352a]">
            {weeklyFootprint}
            <span className="ml-1.5 text-base font-semibold">kg CO₂</span>
          </p>

          <p className="mt-1 text-xs text-[#557264]">{weekRange}</p>
        </div>

        {/* Weekly target */}
        <div className="card rounded-2xl bg-[#f7fbf4] p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#557264]">
              Weekly target
            </p>

            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                targetExceeded ? "bg-[#ffe3da]" : "bg-[#dfeeda]"
              }`}
            >
              <Target
                className={`h-4 w-4 ${
                  targetExceeded ? "text-[#ed7655]" : "text-[#1f6b4f]"
                }`}
              />
            </span>
          </div>

          <p className="display mt-3 text-3xl font-bold text-[#17352a]">
            {weeklyTarget}
            <span className="ml-1.5 text-base font-semibold">kg CO₂</span>
          </p>

          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#dfe8db]">
            <div
              className={`h-full rounded-full transition-all ${
                targetExceeded ? "bg-[#ed7655]" : "bg-[#1f6b4f]"
              }`}
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-[#557264]">
              {safeProgress}% used
            </span>

            <span
              className={`font-bold ${
                targetExceeded ? "text-[#ed7655]" : "text-[#1f6b4f]"
              }`}
            >
              {targetExceeded ? "Target exceeded" : "Within target"}
            </span>
          </div>
        </div>
      </div>

      {/* DP1 WARNING */}
      {targetExceeded && (
        <div className="rounded-[1.5rem] border border-[#ed7655]/30 bg-[#fff3ef] p-5">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ed7655]/15">
              <TriangleAlert className="h-5 w-5 text-[#ed7655]" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#a8432b]">
                Weekly target crossed
              </p>

              <h2 className="display mt-0.5 text-xl font-bold text-[#17352a]">
                You're above your target this week.
              </h2>

              <p className="mt-1.5 text-sm leading-5 text-[#557264]">
                {weeklyFootprint} kg CO₂ against a {weeklyTarget} kg target.
                You can still keep logging normally.
              </p>
            </div>
          </div>

          <div className="mt-4 border-t border-[#ed7655]/20 pt-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#a8432b]">
              Possible lower-impact choices
            </p>

            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {[
                "Consider public transport instead of a car for suitable trips.",
                "Reduce unnecessary car travel where practical.",
                "Choose vegetarian meals when practical.",
                "Keep electricity usage efficient.",
              ].map((suggestion) => (
                <div
                  key={suggestion}
                  className="flex items-start gap-2 rounded-lg bg-white/70 px-3 py-2.5"
                >
                  <span className="mt-0.5 text-sm font-bold text-[#1f6b4f]">
                    ✓
                  </span>

                  <p className="text-xs leading-5 text-[#557264]">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-[#ed7655]/20 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold text-[#557264]">
              Going over the target does not stop you from logging.
            </p>

            <Link
              to="/settings"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#17352a] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1f6b4f]"
            >
              Review target
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* CATEGORY BREAKDOWN */}
      <div className="card rounded-2xl bg-[#f7fbf4] p-5 md:p-6">
        <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1f6b4f]">
              Where it comes from
            </p>

            <h2 className="display mt-1 text-2xl font-bold text-[#17352a]">
              Category breakdown
            </h2>
          </div>

          <p className="text-xs text-[#557264]">
            Total: {totalFootprint} kg CO₂
          </p>
        </div>

        {categoryBreakdown.length === 0 ? (
          <div className="mt-4 rounded-xl bg-[#eaf5e4] p-5 text-center">
            <p className="font-semibold text-[#17352a]">
              No activities logged yet.
            </p>

            <Link
              to="/log"
              className="mt-2 inline-flex text-sm font-bold text-[#1f6b4f] hover:underline"
            >
              Log your first activity →
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {categoryBreakdown.map((item) => {
              const percentage = (item.co2 / maxCategoryCO2) * 100;

              return (
                <div key={item.type}>
                  <div className="mb-1.5 flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-[#17352a]">
                      {CATEGORY_LABELS[item.type] || item.type}
                    </span>

                    <span className="text-xs font-bold text-[#557264]">
                      {item.co2} kg CO₂
                    </span>
                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-[#dfe8db]">
                    <div
                      className="h-full rounded-full bg-[#1f6b4f] transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;

