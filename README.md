# 🌱 PlanetPulse

**Your everyday impact, made visible.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge\&logo=react\&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge\&logo=node.js\&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-REST_API-000000?style=for-the-badge\&logo=express\&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=for-the-badge\&logo=vercel\&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge\&logo=render\&logoColor=white)](https://render.com/)

---

# 🏆 Code2Career Team

| Detail           | Information                      |
| ---------------- | -------------------------------- |
| **Team**         | **Haridwar Team 07 (GenCipher)** |
| **College**      | **Haridwar University**          |
| **Track**        | **Climate Tech**                 |
| **Project**      | **PlanetPulse**                  |
| **Hackathon ID** | **AZIS-BX3A97**                  |

---

# 🚀 What is PlanetPulse?

**PlanetPulse** is a personal carbon-footprint tracking web application that helps users record everyday activities, understand their estimated CO₂ emissions, and track their weekly environmental impact.

The project focuses on:

* 🌱 Making environmental impact visible
* 📊 Turning everyday activity into understandable data
* 🎯 Tracking a personal weekly CO₂ target
* 📜 Maintaining a simple activity history
* 🛡️ Preventing obviously unreasonable inputs
* 💡 Supporting awareness and informed choices rather than punishment

The core workflow is:

```text
Everyday Activity
       ↓
Activity Logging
       ↓
Backend CO₂ Calculation
       ↓
Dashboard
       ↓
Weekly Target
       ↓
History & Insights
```

---

# 🎯 Challenge Requirements

PlanetPulse implements the five required features of the Climate Tech challenge:

1. **Log an activity**
2. **Calculate CO₂**
3. **Dashboard**
4. **Weekly target**
5. **History & filter**

The application also implements all three challenge Decision Points:

* **DP1 — The Nudge**
* **DP2 — Absurd Input**
* **DP3 — The Week**

---

# 💡 Why PlanetPulse?

Carbon-footprint information can become difficult to understand when it is presented only as abstract numbers.

PlanetPulse turns everyday actions into a simple, trackable workflow:

```text
┌─────────────────────┐
│   Everyday Activity │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│    Log Activity     │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  Calculate CO₂      │
│  using fixed factors│
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│      Dashboard      │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Weekly Target +     │
│ History & Breakdown │
└─────────────────────┘
```

Instead of blocking users when they exceed a target, PlanetPulse keeps the experience focused on awareness. The application shows the current impact and allows users to continue recording activities.

---

# ✨ Five Required Features

## 1. ➕ Log an Activity

Users can record an activity by providing:

* Activity type
* Quantity
* Date

Supported activities:

| Activity                | Unit |
| ----------------------- | ---- |
| 🚗 Car travel           | km   |
| 🚌 Bus travel           | km   |
| ✈️ Flight               | km   |
| ⚡ Electricity           | kWh  |
| 🥗 Vegetarian meal      | meal |
| 🍽️ Non-vegetarian meal | meal |

Example:

```text
Activity: Car
Quantity: 10 km
Date: 2026-09-21
```

The activity is sent to the backend, validated, calculated, and then stored.

---

# 2. 🧮 CO₂ Calculation

PlanetPulse uses the fixed emission factors specified by the challenge.

## Supported Emission Factors

| Activity                | Unit |       CO₂ Factor |
| ----------------------- | ---: | ---------------: |
| 🚗 Car                  |   km |   **0.20 kg/km** |
| 🚌 Bus                  |   km |   **0.08 kg/km** |
| ✈️ Flight               |   km |   **0.25 kg/km** |
| ⚡ Electricity           |  kWh |  **0.80 kg/kWh** |
| 🥗 Vegetarian meal      | meal | **0.50 kg/meal** |
| 🍽️ Non-vegetarian meal | meal | **2.00 kg/meal** |

The **backend is the authoritative source** for CO₂ calculations.

The frontend sends the activity type, quantity, and date. The backend determines the correct emission factor and calculates the resulting CO₂ value.

### Example

```text
Car travel

10 km × 0.20 kg/km

= 2.00 kg CO₂
```

The calculated value is stored with the activity.

---

# 3. 📊 Dashboard

The dashboard provides an overview of the recorded environmental impact.

It displays:

* Total recorded footprint
* Current week's footprint
* Weekly CO₂ target
* Progress percentage
* Remaining target or amount over target
* Largest contributing category
* Category-wise footprint breakdown
* Weekly progress visualization

The category breakdown helps users understand which activity types contribute most to their recorded footprint.

---

# 4. 🎯 Weekly Target Tracking

PlanetPulse allows users to set a weekly CO₂ target.

The application follows a:

```text
Monday → Sunday
```

calendar week.

The dashboard compares the current week's footprint against the configured target.

When the target is exceeded:

```text
Weekly Footprint
       ↓
Target Exceeded
       ↓
Display Warning
       ↓
Continue Allowing Activity Logging
```

The application does **not** block users from recording additional activities.

---

# 5. 📜 History & Filtering

PlanetPulse maintains a history of logged activities.

Users can filter activities by:

* Activity type
* Date

Each record contains:

```text
Activity
Quantity
CO₂ Generated
Date
```

Example filters:

```http
GET /api/activities?type=car
```

```http
GET /api/activities?date=2026-09-21
```

This allows users to review the activities contributing to their recorded footprint.

---

# 🛡️ Input Validation

PlanetPulse rejects **obviously unreasonable single-entry values** rather than silently changing them.

Example:

```text
Car: 5,000 km
       ↓
   Accepted
```

An obviously unreasonable value:

```text
Car: 500,000 km
       ↓
    Rejected
```

The limits are intentionally broad so unusual but plausible values can still be recorded.

### Design Principle

```text
Invalid / Obviously unreasonable
              ↓
        Reject the input
              ↓
        Ask user to check
```

The application does not silently modify the user's submitted quantity.

---

# 🧠 Product Decisions

PlanetPulse follows the three explicit Decision Points from the challenge.

## DP1 — The Nudge

### Decision: Warn and encourage, but do not block logging.

When the weekly footprint exceeds the configured target, the dashboard displays a warning while allowing additional activities to be recorded.

This keeps the activity history representative of real-world behavior. Crossing the target changes the feedback shown to the user rather than preventing further data entry.

---

## DP2 — Absurd Input

### Decision: Reject obviously unreasonable single-entry values.

PlanetPulse does not silently modify extreme values. Broad sanity limits allow unusual but plausible values while preventing clearly unreasonable entries such as a `500,000 km` single car journey.

The user receives a validation message and must correct the submitted value.

---

## DP3 — The Week

### Decision: Monday–Sunday calendar week.

PlanetPulse defines a week as Monday through Sunday.

For example:

```text
Monday      2026-09-21
Tuesday     2026-09-22
Wednesday   2026-09-23
Thursday    2026-09-24
Friday      2026-09-25
Saturday    2026-09-26
Sunday      2026-09-27
```

Activities dated `2026-09-28` belong to the following week.

The dashboard uses the applicable Monday–Sunday period when calculating weekly progress.

---

# 🏗️ System Architecture

PlanetPulse uses a three-layer architecture:

```text
                         ┌──────────────────────────┐
                         │          USER            │
                         │ Dashboard / Log /        │
                         │ History / Settings       │
                         └────────────┬─────────────┘
                                      │
                                      ▼
                ┌────────────────────────────────────────┐
                │          FRONTEND — VERCEL             │
                │                                        │
                │ React + Vite                           │
                │ React Router                           │
                │ Tailwind CSS + Lucide React            │
                │ Axios REST Client                      │
                └────────────────────┬───────────────────┘
                                     │
                              HTTPS / REST
                                     │
                                     ▼
                ┌────────────────────────────────────────┐
                │          BACKEND — RENDER              │
                │                                        │
                │ Node.js + Express                      │
                │                                        │
                │ ┌────────────┐  ┌──────────────────┐  │
                │ │ Validation │  │ CO₂ Calculation  │  │
                │ └─────┬──────┘  └────────┬─────────┘  │
                │       └──────────┬───────┘            │
                │                  ▼                    │
                │       ┌────────────────────┐          │
                │       │ Dashboard / Weekly │          │
                │       │ History / Filters  │          │
                │       └──────────┬─────────┘          │
                └──────────────────┼─────────────────────┘
                                   │
                             Mongoose ODM
                                   │
                                   ▼
                ┌────────────────────────────────────────┐
                │        DATABASE — MONGODB ATLAS        │
                │                                        │
                │  ┌────────────────┐ ┌───────────────┐ │
                │  │   Activities   │ │   Settings    │ │
                │  │                │ │               │ │
                │  │ type           │ │ weeklyTarget  │ │
                │  │ quantity       │ │ timestamps    │ │
                │  │ co2            │ │               │ │
                │  │ date           │ │               │ │
                │  └────────────────┘ └───────────────┘ │
                └────────────────────────────────────────┘
```

## Architectural Principles

* **Backend-authoritative calculations** — CO₂ is calculated on the server.
* **Single source of emission factors** — fixed factors are maintained in backend constants.
* **Separated responsibilities** — routes, controllers, models, constants, and database configuration are separated.
* **Simple REST interface** — focused endpoints connect the frontend and backend.
* **No authentication layer** — intentionally omitted so the challenge features can be accessed directly without an account.

---

# 🛠️ Technology Stack

## Frontend

| Technology   | Purpose                |
| ------------ | ---------------------- |
| React        | User interface         |
| Vite         | Frontend build tool    |
| React Router | Application routing    |
| Axios        | REST API communication |
| Tailwind CSS | UI styling             |
| Lucide React | Icons                  |

## Backend

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Node.js    | Runtime                   |
| Express.js | REST API                  |
| MongoDB    | Database                  |
| Mongoose   | MongoDB ODM               |
| CORS       | Cross-origin API access   |
| dotenv     | Environment configuration |

## Deployment

| Service       | Purpose             |
| ------------- | ------------------- |
| Vercel        | Frontend deployment |
| Render        | Backend deployment  |
| MongoDB Atlas | Cloud database      |

---

# 📁 Project Structure

```text
PlanetPulse/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── MainLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LogActivity.jsx
│   │   │   ├── History.jsx
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── constants/
│   │   ├── activityLimits.js
│   │   └── emissionFactors.js
│   │
│   ├── controllers/
│   │   ├── activityController.js
│   │   ├── dashboardController.js
│   │   └── settingsController.js
│   │
│   ├── models/
│   │   ├── Activity.js
│   │   └── Settings.js
│   │
│   ├── routes/
│   │   ├── activityRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── settingsRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
├── DECISIONS.md
└── README.md
```

---

# 📡 REST API

## Production Base URL

```text
https://plannetpulse.onrender.com/api
```

---

## Activities

### Create Activity

```http
POST /api/activities
```

Example request:

```json
{
  "type": "car",
  "quantity": 10,
  "date": "2026-09-21"
}
```

The backend validates the request and calculates the CO₂ value automatically.

### Get Activities

```http
GET /api/activities
```

### Filter by Activity Type

```http
GET /api/activities?type=car
```

### Filter by Date

```http
GET /api/activities?date=2026-09-21
```

---

# 📊 Dashboard API

```http
GET /api/dashboard
```

Returns:

* Total footprint
* Weekly footprint
* Weekly target
* Progress percentage
* Target status
* Category breakdown

---

# 🎯 Weekly Target API

### Get Target

```http
GET /api/settings/target
```

### Update Target

```http
PUT /api/settings/target
```

Example request:

```json
{
  "weeklyTarget": 30
}
```

---

# 🚀 Installation

## Requirements

```text
Node.js
npm
Git
MongoDB Atlas account
```

## 1. Clone Repository

```bash
git clone https://github.com/ShubhamS2005/PlanetPulse.git
cd PlanetPulse
```

---

## 2. Backend Setup

```bash
cd server
npm install
```

Create:

```text
server/.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend:

```bash
npm start
```

Backend:

```text
http://localhost:5000
```

---

## 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The Vite development server will provide the local frontend URL.

---

# 🔌 API Configuration

The frontend API client is located at:

```text
client/src/api.js
```

## Production

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: "https://plannetpulse.onrender.com/api",
});

export default API;
```

## Local Development

```javascript
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
```

---

# 🌐 Deployment

## Frontend — Vercel

Production frontend:

https://plannet-pulse-59.vercel.app/

## Backend — Render

Production backend:

https://plannetpulse.onrender.com

## Production API

https://plannetpulse.onrender.com/api

## Database — MongoDB Atlas

The production backend connects to MongoDB Atlas using:

```env
MONGO_URI
```

The MongoDB connection string is stored as an environment variable and is not committed to the repository.

---

# 🔐 Authentication & Test Credentials

PlanetPulse does **not** implement authentication.

No login or signup is required.

### Test credentials

```text
Not required.

The application is publicly accessible without an account.
```

This allows graders to access all required features directly.

---

# 🧪 Validation & Testing

PlanetPulse validates the main activity inputs.

Tested validation cases include:

```text
Missing activity type
Missing quantity
Missing date
Zero quantity
Negative quantity
Invalid activity type
Obviously unreasonable quantity
```

### Normal Example

```text
car + 10 km
       ↓
10 × 0.20
       ↓
2.00 kg CO₂
```

### Invalid Example

```text
car + 500,000 km
       ↓
Validation Error
       ↓
Activity Not Stored
```

The submitted quantity is not silently changed.

---

# 📅 Weekly Calculation

PlanetPulse uses a Monday–Sunday calendar week.

Example:

```text
Monday      2026-09-21
Tuesday     2026-09-22
Wednesday   2026-09-23
Thursday    2026-09-24
Friday      2026-09-25
Saturday    2026-09-26
Sunday      2026-09-27
```

The following date:

```text
2026-09-28
```

belongs to the next calendar week.

This behavior is reflected in the dashboard's weekly footprint calculation.

---

# 🎬 Demo Flow

The recommended 3–4 minute demonstration follows the five required features in order.

## 1. Log an Activity

Show the activity form and record an example:

```text
Activity: Car
Quantity: 10 km
Date: 2026-09-21
```

Show the successful submission.

---

## 2. CO₂ Calculation

Show the automatically calculated CO₂ value:

```text
10 km × 0.20 kg/km
       ↓
2.00 kg CO₂
```

Demonstrate that the value appears in the application.

---

## 3. Dashboard

Show:

* Total footprint
* Weekly footprint
* Weekly target
* Progress percentage
* Largest contributor
* Category breakdown
* Weekly visualization

---

## 4. Weekly Target

Set a weekly target and show the resulting progress.

Then demonstrate the target-exceeded behavior:

```text
Target exceeded
       ↓
Warning displayed
       ↓
Activity logging still available
```

---

## 5. History & Filter

Show:

* Recorded activities
* Activity type filtering
* Date filtering
* Quantity
* CO₂ generated
* Activity date

---

## Decision Points

Demonstrate all three challenge behaviors.

### DP1 — The Nudge

```text
Weekly target crossed
       ↓
Warning displayed
       ↓
Logging continues
```

### DP2 — Absurd Input

```text
500,000 km car entry
       ↓
Validation error
       ↓
Activity not stored
```

### DP3 — The Week

```text
Monday → Sunday
       ↓
Current weekly footprint
```

---

# 🚧 Scope

PlanetPulse intentionally focuses on the core carbon-footprint tracking workflow required by the Climate Tech challenge.

The current implementation does **not** include:

* ❌ Authentication
* ❌ Payments
* ❌ Social features
* ❌ Carbon offset marketplace
* ❌ GPS tracking
* ❌ Weather integration
* ❌ Email notifications
* ❌ Chatbot
* ❌ External carbon APIs
* ❌ Admin dashboard
* ❌ Complex multi-user analytics

This keeps the implementation focused on the core challenge requirements.

---

# 🔮 Future Improvements

Possible future improvements include:

* User authentication
* Personalized weekly targets
* More detailed charts
* Monthly and yearly reports
* Activity-history export
* Additional activity categories
* Improved unusual-input detection
* Personalized lower-carbon suggestions
* More mobile-first refinements
* More detailed environmental insights

---

# 🌍 Project Goal

PlanetPulse is not designed to label people as **"good" or "bad"** based on their carbon footprint.

The goal is simple:

> **Make everyday environmental impact visible so people can understand their habits and make more informed choices.**

---

# 📊 Current Status

PlanetPulse is a **B.Tech Computer Science project** created as part of the **Code2Career hackathon**.

## Required Feature Status

* ✅ **Feature 1 — Log an activity**
* ✅ **Feature 2 — CO₂ calculation**
* ✅ **Feature 3 — Dashboard**
* ✅ **Feature 4 — Weekly target**
* ✅ **Feature 5 — History & filter**

## Decision Point Status

* ✅ **DP1 — Weekly target exceeded**
* ✅ **DP2 — Obviously unreasonable input**
* ✅ **DP3 — Monday–Sunday week**

## Technical Implementation

* ✅ React frontend
* ✅ Vite
* ✅ Tailwind CSS interface
* ✅ React Router navigation
* ✅ Axios REST client
* ✅ Node.js / Express REST API
* ✅ MongoDB / MongoDB Atlas
* ✅ Activity logging
* ✅ Backend CO₂ calculation
* ✅ Dashboard statistics
* ✅ Weekly target tracking
* ✅ Category breakdown
* ✅ Weekly progress visualization
* ✅ Input validation
* ✅ Activity history
* ✅ History filtering
* ✅ Production deployment

---

# 🔗 Project Links

| Resource             | Link                                        |
| -------------------- | ------------------------------------------- |
| **GitHub**           | https://github.com/ShubhamS2005/PlanetPulse |
| **Live Application** | https://plannet-pulse-59.vercel.app/        |
| **Backend**          | https://plannetpulse.onrender.com           |
| **Production API**   | https://plannetpulse.onrender.com/api       |

---

# 👨‍💻 Team

**Roshni Kumari** \
**Shubham Srivastava** \
**Haridwar Team 07 (GenCipher)** \
**Haridwar University**

Building full-stack applications, AI/ML systems, and developer-focused tools.

---

# 📄 License

This project was created as part of the **Code2Career hackathon** and for academic/project purposes.

---

## 🌱 PlanetPulse

**Track it. Understand it. Make informed choices.**