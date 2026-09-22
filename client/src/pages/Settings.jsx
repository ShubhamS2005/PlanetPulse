import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Leaf,
  LoaderCircle,
  Save,
  Target,
} from "lucide-react";

import API from "../api.js";

const EMISSION_FACTORS = [
  { label: "Car travel", value: "0.20 kg CO₂ / km" },
  { label: "Bus travel", value: "0.08 kg CO₂ / km" },
  { label: "Flight", value: "0.25 kg CO₂ / km" },
  { label: "Electricity", value: "0.80 kg CO₂ / kWh" },
  { label: "Vegetarian meal", value: "0.50 kg CO₂ / meal" },
  { label: "Non-vegetarian meal", value: "2.00 kg CO₂ / meal" },
];

function Settings() {
  const [weeklyTarget, setWeeklyTarget] = useState("");
  const [weeklyFootprint, setWeeklyFootprint] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError("");

      const [targetResponse, dashboardResponse] = await Promise.all([
        API.get("/settings/target"),
        API.get("/dashboard"),
      ]);

      setWeeklyTarget(targetResponse.data.weeklyTarget);
      setWeeklyFootprint(dashboardResponse.data.weeklyFootprint);
    } catch (err) {
      console.error("Failed to load settings:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load settings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const numericTarget = Number(weeklyTarget);

  const progressPercentage =
    numericTarget > 0
      ? Number(((weeklyFootprint / numericTarget) * 100).toFixed(2))
      : 0;

  const progressWidth = Math.min(progressPercentage, 100);
  const targetExceeded =
    numericTarget > 0 && weeklyFootprint > numericTarget;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!numericTarget || numericTarget <= 0) {
      setError("Weekly target must be greater than 0.");
      return;
    }

    try {
      setSaving(true);

      const response = await API.put("/settings/target", {
        weeklyTarget: numericTarget,
      });

      setWeeklyTarget(response.data.weeklyTarget);
      setSuccess("Weekly target updated successfully.");
    } catch (err) {
      console.error("Failed to update weekly target:", err);

      setError(
        err.response?.data?.message ||
          "Unable to update weekly target. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="card flex items-center gap-3 rounded-2xl bg-white px-6 py-4">
          <LoaderCircle className="h-5 w-5 animate-spin text-[#1f6b4f]" />
          <span className="font-semibold text-[#17352a]">
            Loading settings...
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#1f6b4f]">
          <Leaf className="h-4 w-4" />
          Personal target
        </div>

        <h1 className="display mt-3 text-4xl font-bold text-[#17352a] md:text-5xl">
          Weekly CO₂ target
        </h1>

        <p className="mt-4 text-base leading-7 text-[#557264]">
          Set the amount of CO₂ you want to stay within each Monday–Sunday
          week.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        {/* Target card */}
        <div className="card rounded-[2rem] bg-white p-6 md:p-8">
          <div className="flex items-start gap-4 border-b border-[#17352a]/10 pb-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef5eb]">
              <Target className="h-6 w-6 text-[#1f6b4f]" />
            </div>

            <div>
              <h2 className="display text-2xl font-bold text-[#17352a]">
                Set your weekly limit
              </h2>

              <p className="mt-1 text-sm text-[#557264]">
                You can change this target whenever you want.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-7">
            <label
              htmlFor="weekly-target"
              className="mb-2 block text-sm font-bold text-[#17352a]"
            >
              Weekly CO₂ target
            </label>

            <div className="relative">
              <input
                id="weekly-target"
                type="number"
                min="0"
                step="0.1"
                value={weeklyTarget}
                onChange={(event) => {
                  setWeeklyTarget(event.target.value);
                  setError("");
                  setSuccess("");
                }}
                className="field pr-20 text-lg font-semibold"
                placeholder="e.g. 20"
              />

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#557264]">
                kg CO₂
              </span>
            </div>

            <p className="mt-2 text-sm text-[#557264]">
              Your target applies to the current Monday–Sunday week.
            </p>

            {error && (
              <div className="mt-5 rounded-xl border border-[#ed7655]/30 bg-[#fff3ef] px-4 py-3 text-sm font-semibold text-[#a8432b]">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#1f6b4f]/20 bg-[#f1f9ec] px-4 py-3 text-sm font-semibold text-[#1f6b4f]">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#17352a] px-5 py-3.5 font-bold text-white transition hover:bg-[#1f6b4f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Saving target...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save weekly target
                </>
              )}
            </button>
          </form>
        </div>

        {/* Current progress */}
        <div className="rounded-[2rem] bg-[#17352a] p-6 text-white md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#c9ef78]">
            Current week
          </p>

          <h2 className="display mt-3 text-3xl font-bold">
            Your progress
          </h2>

          <div className="mt-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-[#dce8dc]">Logged</p>

                <p className="display mt-1 text-4xl font-bold">
                  {weeklyFootprint}
                </p>

                <p className="text-sm text-[#dce8dc]">kg CO₂</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-[#dce8dc]">Target</p>

                <p className="display mt-1 text-3xl font-bold">
                  {numericTarget || 0}
                </p>

                <p className="text-sm text-[#dce8dc]">kg CO₂</p>
              </div>
            </div>

            <div className="mt-7 h-4 overflow-hidden rounded-full bg-white/15">
              <div
                className={`h-full rounded-full transition-all ${
                  targetExceeded ? "bg-[#ed7655]" : "bg-[#c9ef78]"
                }`}
                style={{ width: `${progressWidth}%` }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-[#dce8dc]">
                {progressPercentage}% used
              </span>

              <span
                className={`text-sm font-bold ${
                  targetExceeded ? "text-[#ffab91]" : "text-[#c9ef78]"
                }`}
              >
                {targetExceeded ? "Target exceeded" : "Within target"}
              </span>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-white/10 p-4">
            <p className="text-sm font-semibold leading-6 text-[#dce8dc]">
              PlanetPulse will warn and encourage you when your weekly target
              is crossed. It will never block you from logging an activity.
            </p>
          </div>
        </div>
      </div>

      {/* Factors */}
      <div className="card rounded-[2rem] bg-white p-6 md:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f6b4f]">
            Calculation rules
          </p>

          <h2 className="display mt-2 text-3xl font-bold text-[#17352a]">
            Fixed emission factors
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#557264]">
            PlanetPulse uses the fixed factors defined by the hackathon brief.
            The backend applies these factors when an activity is saved.
          </p>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {EMISSION_FACTORS.map((factor) => (
            <div
              key={factor.label}
              className="rounded-2xl bg-[#eef5eb] p-4"
            >
              <p className="text-sm font-bold text-[#17352a]">
                {factor.label}
              </p>

              <p className="mt-2 text-sm font-semibold text-[#1f6b4f]">
                {factor.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Settings;