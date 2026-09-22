
import React, { useEffect, useMemo, useState } from "react";
import {
  Filter,
  Leaf,
  LoaderCircle,
  RotateCcw,
  Search,
} from "lucide-react";

import API from "../api.js";

const CATEGORY_LABELS = {
  car: "Car travel",
  bus: "Bus travel",
  flight: "Flight",
  electricity: "Electricity",
  veg_meal: "Vegetarian meal",
  nonveg_meal: "Non-vegetarian meal",
};

const CATEGORY_UNITS = {
  car: "km",
  bus: "km",
  flight: "km",
  electricity: "kWh",
  veg_meal: "meal",
  nonveg_meal: "meal",
};

function History() {
  const [activities, setActivities] = useState([]);
  const [type, setType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/activities");

      setActivities(response.data);
    } catch (err) {
      console.error("Failed to fetch activities:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load activity history. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesType = type ? activity.type === type : true;

      const matchesFromDate = fromDate
        ? activity.date >= fromDate
        : true;

      const matchesToDate = toDate
        ? activity.date <= toDate
        : true;

      return matchesType && matchesFromDate && matchesToDate;
    });
  }, [activities, type, fromDate, toDate]);

  const totalFilteredCO2 = filteredActivities.reduce(
    (total, activity) => total + activity.co2,
    0
  );

  const resetFilters = () => {
    setType("");
    setFromDate("");
    setToDate("");
  };

  const filtersActive = Boolean(type || fromDate || toDate);

  return (
    <section className="space-y-8">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#1f6b4f]">
          <Leaf className="h-4 w-4" />
          Your activity trail
        </div>

        <h1 className="display mt-3 text-4xl font-bold text-[#17352a] md:text-5xl">
          Activity history
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-[#557264]">
          Review everything you've logged and explore your footprint by
          activity type or date.
        </p>
      </div>

      {/* Filter panel */}
      <div className="card overflow-hidden rounded-[2rem] bg-[#f7fbf4]">
        <div className="border-b border-[#17352a]/10 bg-[#eaf5e4] px-6 py-6 md:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d4ebc8]">
                <Filter className="h-5 w-5 text-[#1f6b4f]" />
              </div>

              <div>
                <h2 className="display text-2xl font-bold text-[#17352a]">
                  Filter activities
                </h2>

                <p className="text-sm text-[#557264]">
                  Narrow down your logged activities.
                </p>
              </div>
            </div>

            {filtersActive && (
              <span className="w-fit rounded-full bg-[#c9ef78] px-3 py-1.5 text-xs font-bold text-[#17352a]">
                Filters active
              </span>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-3">
            {/* Activity type */}
            <div>
              <label
                htmlFor="history-type"
                className="mb-2 block text-sm font-bold text-[#17352a]"
              >
                Activity type
              </label>

              <select
                id="history-type"
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="field"
              >
                <option value="">All activities</option>
                <option value="car">Car travel</option>
                <option value="bus">Bus travel</option>
                <option value="flight">Flight</option>
                <option value="electricity">Electricity</option>
                <option value="veg_meal">Vegetarian meal</option>
                <option value="nonveg_meal">Non-vegetarian meal</option>
              </select>
            </div>

            {/* From date */}
            <div>
              <label
                htmlFor="from-date"
                className="mb-2 block text-sm font-bold text-[#17352a]"
              >
                From date
              </label>

              <input
                id="from-date"
                type="date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
                className="field"
              />
            </div>

            {/* To date */}
            <div>
              <label
                htmlFor="to-date"
                className="mb-2 block text-sm font-bold text-[#17352a]"
              >
                To date
              </label>

              <input
                id="to-date"
                type="date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
                className="field"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-[#17352a]/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#557264]">
              Showing{" "}
              <span className="font-bold text-[#17352a]">
                {filteredActivities.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-[#17352a]">
                {activities.length}
              </span>{" "}
              activities
            </p>

            <button
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#17352a]/15 bg-[#f7fbf4] px-4 py-2.5 text-sm font-bold text-[#17352a] transition hover:border-[#1f6b4f] hover:bg-[#eaf5e4]"
            >
              <RotateCcw className="h-4 w-4" />
              Reset filters
            </button>
          </div>
        </div>
      </div>

      {/* Activity records */}
      <div className="card overflow-hidden rounded-[2rem] bg-[#f7fbf4]">
        <div className="border-b border-[#17352a]/10 px-6 py-6 md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f6b4f]">
                Logged activities
              </p>

              <h2 className="display mt-2 text-3xl font-bold text-[#17352a]">
                Your footprint records
              </h2>
            </div>

            <div className="rounded-2xl bg-[#eaf5e4] px-5 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#557264]">
                Filtered footprint
              </p>

              <p className="mt-1 text-lg font-bold text-[#17352a]">
                {Number(totalFilteredCO2.toFixed(2))} kg CO₂
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-52 items-center justify-center">
            <div className="flex items-center gap-3 text-sm font-semibold text-[#557264]">
              <LoaderCircle className="h-5 w-5 animate-spin text-[#1f6b4f]" />
              Loading activity history...
            </div>
          </div>
        ) : error ? (
          <div className="p-8">
            <div className="rounded-2xl bg-[#fff3ef] p-6 text-[#a8432b]">
              <p className="font-bold">History unavailable</p>
              <p className="mt-2 text-sm">{error}</p>

              <button
                onClick={fetchActivities}
                className="mt-4 rounded-xl bg-[#17352a] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1f6b4f]"
              >
                Try again
              </button>
            </div>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf5e4]">
              <Search className="h-6 w-6 text-[#1f6b4f]" />
            </div>

            <h3 className="display mt-4 text-2xl font-bold text-[#17352a]">
              No matching activities
            </h3>

            <p className="mt-2 max-w-md text-sm text-[#557264]">
              Try changing the filters or log a new activity.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="bg-[#edf5e9]">
                  <tr>
                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-[0.1em] text-[#557264]">
                      Date
                    </th>

                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-[0.1em] text-[#557264]">
                      Activity
                    </th>

                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-[0.1em] text-[#557264]">
                      Quantity
                    </th>

                    <th className="px-8 py-4 text-xs font-bold uppercase tracking-[0.1em] text-[#557264]">
                      CO₂
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredActivities.map((activity) => (
                    <tr
                      key={activity._id}
                      className="border-t border-[#17352a]/10 transition hover:bg-[#edf5e9]"
                    >
                      <td className="px-8 py-5 text-sm font-semibold text-[#557264]">
                        {activity.date}
                      </td>

                      <td className="px-8 py-5">
                        <p className="font-bold text-[#17352a]">
                          {CATEGORY_LABELS[activity.type] || activity.type}
                        </p>

                        <p className="mt-1 text-xs text-[#557264]">
                          {activity.type}
                        </p>
                      </td>

                      <td className="px-8 py-5 text-sm font-semibold text-[#17352a]">
                        {activity.quantity}{" "}
                        {CATEGORY_UNITS[activity.type] || ""}
                      </td>

                      <td className="px-8 py-5">
                        <span className="inline-flex rounded-full bg-[#dfeeda] px-3 py-1.5 text-sm font-bold text-[#1f6b4f]">
                          {activity.co2} kg CO₂
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 p-4 md:hidden">
              {filteredActivities.map((activity) => (
                <div
                  key={activity._id}
                  className="rounded-2xl border border-[#17352a]/10 bg-[#fbfdf9] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-[#17352a]">
                        {CATEGORY_LABELS[activity.type] || activity.type}
                      </p>

                      <p className="mt-1 text-xs text-[#557264]">
                        {activity.date}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-[#dfeeda] px-3 py-1 text-xs font-bold text-[#1f6b4f]">
                      {activity.co2} kg CO₂
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-[#557264]">
                    Quantity:{" "}
                    <span className="font-bold text-[#17352a]">
                      {activity.quantity}{" "}
                      {CATEGORY_UNITS[activity.type] || ""}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default History;

