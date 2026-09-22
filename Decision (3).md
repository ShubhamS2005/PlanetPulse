# PlanetPulse — Architectural Decision Points (DECISIONS.md)

### Track 2: Real-World AI Products · Climate Tech Carbon Footprint Tracker
### Team: Haridwar Team 07(GenCipher)
### Team Members: Roshni Kumari, Shubham Srivastava
### Product: PlanetPulse — Personal Carbon Footprint Tracker

This document articulates our deliberate product and architectural decisions for the three core Decision Points specified in the Code2Career Track 2 brief.

---

## DP1 · The Nudge

### Question
What does PlanetPulse do when the user's weekly carbon target is crossed: warn, encourage, shame, or block?

### Decision
Warn + encourage, but never shame or block.

When the user's weekly target is exceeded, PlanetPulse displays a clear warning showing the actual footprint and target. The user can still continue logging activities.

### Example
* **Weekly Target:** 5 kg CO₂
* **Current Footprint:** 11.8 kg CO₂

> You have exceeded your weekly target.
> Consider lower-impact alternatives for your next activity.

### Product Principle
Warn instead of punish.

---

## DP2 · Absurd Input

### Question
How should PlanetPulse handle an obviously incorrect entry, such as a 500,000 km car trip?

### Decision
Reject obviously unreasonable values and ask the user to correct them.

PlanetPulse validates activity quantities before saving them. Clearly unreasonable single-entry values are rejected instead of being silently modified.

### Example
* **Car distance:** 500,000 km
* **Status:** $\rightarrow$ Rejected

> "This distance seems unusually high.
> Please check your entry."

### Product Principle
Validate instead of silently correcting.

---

## DP3 · The Week

### Question
When does a "week" start, and how is progress calculated during the week?

### Decision
A PlanetPulse week runs from Monday to Sunday.

Weekly footprint calculations use the activity date and include only activities belonging to the current Monday–Sunday period.

### Mid-Week Example
* **Day:** Wednesday
* **Progress:** 3.2 / 5 kg CO₂ (64% of weekly target)

### Product Principle
Use a fixed, clearly defined time period.

---

## Cross-Cutting Principles

1. **Transparency**
2. **Data Reliability**
3. **User Control**
4. **Predictability**
5. **Traceability**

---

## Decision Summary

| Decision Point | PlanetPulse Decision |
| :--- | :--- |
| **DP1 · The Nudge** | Warn + encourage; never shame or block |
| **DP2 · Absurd Input** | Reject clearly unreasonable values and ask for correction |
| **DP3 · The Week** | Monday–Sunday calendar week |
