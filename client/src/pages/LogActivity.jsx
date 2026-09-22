import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Leaf,
  LoaderCircle,
  Save,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api.js";

const ACTIVITY_OPTIONS = [
  {
    value: "car",
    label: "Car travel",
    unit: "km",
    factor: 0.2,
    description: "Personal car or taxi travel",
  },
  {
    value: "bus",
    label: "Bus travel",
    unit: "km",
    factor: 0.08,
    description: "Public bus travel",
  },
  {
    value: "flight",
    label: "Flight",
    unit: "km",
    factor: 0.25,
    description: "Air travel",
  },
  {
    value: "electricity",
    label: "Electricity",
    unit: "kWh",
    factor: 0.8,
    description: "Electricity consumed",
  },
  {
    value: "veg_meal",
    label: "Vegetarian meal",
    unit: "meal",
    factor: 0.5,
    description: "One vegetarian meal",
  },
  {
    value: "nonveg_meal",
    label: "Non-vegetarian meal",
    unit: "meal",
    factor: 2.0,
    description: "One non-vegetarian meal",
  },
];

function getToday() {
  const today = new Date();

  return today.toISOString().split("T")[0];
}

function LogActivity() {
  const [type, setType] = useState("car");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState(getToday());

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const selectedActivity = useMemo(
    () => ACTIVITY_OPTIONS.find((item) => item.value === type),
    [type]
  );

  const previewCO2 =
    quantity !== "" && Number(quantity) > 0
      ? Number((Number(quantity) * selectedActivity.factor).toFixed(2))
      : 0;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const numericQuantity = Number(quantity);

    if (!type) {
      setError("Please select an activity type.");
      return;
    }

    if (!numericQuantity || numericQuantity <= 0) {
      setError("Quantity must be greater than 0.");
      return;
    }

    if (!date) {
      setError("Please select a date.");
      return;
    }

    try {
      setSaving(true);

      await API.post("/activities", {
  type,
  quantity: numericQuantity,
  date,
});

const dashboardResponse = await API.get("/dashboard");

setQuantity("");

if (dashboardResponse.data.targetExceeded) {
  navigate("/dashboard", {
    state: {
      activitySaved: true,
      targetExceeded: true,
    },
  });
} else {
  navigate("/dashboard", {
    state: {
      activitySaved: true,
      targetExceeded: false,
    },
  });
}
    } catch (err) {
      console.error("Failed to save activity:", err);

      setError(
        err.response?.data?.message ||
          "Unable to save activity. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="space-y-8">
      {/* Page heading */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#1f6b4f]">
          <Leaf className="h-4 w-4" />
          Track your impact
        </div>

        <h1 className="display mt-3 text-4xl font-bold leading-tight text-[#17352a] md:text-5xl">
          Log an activity
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-[#557264]">
          Add an everyday activity and we'll calculate its estimated CO₂
          footprint using PlanetPulse's fixed emission factors.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        {/* Main form */}
        <div className="card rounded-[2rem] bg-white p-6 md:p-8">
          <div className="flex items-start gap-4 border-b border-[#17352a]/10 pb-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef5eb]">
              <Calculator className="h-6 w-6 text-[#1f6b4f]" />
            </div>

            <div>
              <h2 className="display text-2xl font-bold text-[#17352a]">
                Activity details
              </h2>

              <p className="mt-1 text-sm text-[#557264]">
                Tell us what you did and how much.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-6">
            {/* Activity type */}
            <div>
              <label
                htmlFor="activity-type"
                className="mb-2 block text-sm font-bold text-[#17352a]"
              >
                Activity type
              </label>

              <select
                id="activity-type"
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                  setError("");
                  setSuccess("");
                }}
                className="field"
              >
                {ACTIVITY_OPTIONS.map((activity) => (
                  <option key={activity.value} value={activity.value}>
                    {activity.label}
                  </option>
                ))}
              </select>

              <p className="mt-2 text-sm text-[#557264]">
                {selectedActivity.description}
              </p>
            </div>

            {/* Quantity + date */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-bold text-[#17352a]"
                >
                  Quantity
                </label>

                <div className="relative">
                  <input
                    id="quantity"
                    type="number"
                    min="0"
                    step="any"
                    value={quantity}
                    onChange={(event) => {
                      setQuantity(event.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    placeholder="e.g. 10"
                    className="field pr-16"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#557264]">
                    {selectedActivity.unit}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="activity-date"
                  className="mb-2 block text-sm font-bold text-[#17352a]"
                >
                  Date
                </label>

                <input
                  id="activity-date"
                  type="date"
                  value={date}
                  onChange={(event) => {
                    setDate(event.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  className="field"
                />
              </div>
            </div>

            {/* Factor */}
            <div className="rounded-2xl bg-[#eef5eb] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1f6b4f]">
                    Emission factor
                  </p>

                  <p className="mt-1 font-semibold text-[#17352a]">
                    {selectedActivity.label}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-[#17352a]">
                    {selectedActivity.factor}
                  </p>

                  <p className="text-xs text-[#557264]">
                    kg CO₂ / {selectedActivity.unit}
                  </p>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-2xl border border-[#1f6b4f]/15 bg-[#f8fbf5] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1f6b4f]">
                Estimated impact
              </p>

              <div className="mt-2 flex items-end justify-between gap-4">
                <div>
                  <p className="display text-4xl font-bold text-[#17352a]">
                    {previewCO2}
                  </p>

                  <p className="mt-1 text-sm text-[#557264]">kg CO₂</p>
                </div>

                {quantity && Number(quantity) > 0 && (
                  <p className="max-w-xs text-right text-sm leading-6 text-[#557264]">
                    {quantity} {selectedActivity.unit} ×{" "}
                    {selectedActivity.factor} kg CO₂
                  </p>
                )}
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="rounded-xl border border-[#ed7655]/30 bg-[#fff3ef] px-4 py-3 text-sm font-semibold text-[#a8432b]">
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 rounded-xl border border-[#1f6b4f]/20 bg-[#f1f9ec] px-4 py-3 text-sm font-semibold text-[#1f6b4f]">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#17352a] px-5 py-3.5 font-bold text-white transition hover:bg-[#1f6b4f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Saving activity...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save activity
                </>
              )}
            </button>
          </form>
        </div>

        {/* Side information */}
        <aside className="space-y-6">
          <div className="rounded-[2rem] bg-[#17352a] p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#c9ef78]">
              How it works
            </p>

            <h2 className="display mt-3 text-2xl font-bold">
              Small logs, visible impact.
            </h2>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c9ef78] text-sm font-bold text-[#17352a]">
                  1
                </span>

                <div>
                  <p className="font-bold">Choose an activity</p>
                  <p className="mt-1 text-sm leading-5 text-[#dce8dc]">
                    Select from the fixed PlanetPulse activity categories.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c9ef78] text-sm font-bold text-[#17352a]">
                  2
                </span>

                <div>
                  <p className="font-bold">Enter the quantity</p>
                  <p className="mt-1 text-sm leading-5 text-[#dce8dc]">
                    Add kilometres, kWh, or meals depending on the activity.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c9ef78] text-sm font-bold text-[#17352a]">
                  3
                </span>

                <div>
                  <p className="font-bold">Track the result</p>
                  <p className="mt-1 text-sm leading-5 text-[#dce8dc]">
                    Your activity is saved and reflected on the dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card rounded-[2rem] bg-white p-6">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f6b4f]">
              Already logged something?
            </p>

            <h2 className="display mt-2 text-2xl font-bold text-[#17352a]">
              Review your history
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#557264]">
              See previous activities and filter them by category or date.
            </p>

            <Link
              to="/history"
              className="mt-5 inline-flex items-center gap-2 font-bold text-[#1f6b4f] hover:underline"
            >
              Open history
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default LogActivity;