# WaterWatch – Smart Rural Water Quality Monitoring & Water Management System

> **Safe Water, Healthy Villages.**
> *A comprehensive, community-oriented rural water governance platform built for rural habitations, Gram Panchayats, and citizen water stewardship.*

---

## 🌊 Overview

**WaterWatch** is an autonomous full-stack rural water monitoring, grievance redressal, and supply management web application. It addresses real-world challenges faced by rural communities across India by providing transparent drinking water testing against **IS 10500:2012** benchmarks, tracking pipeline leakages with unique grievance IDs, displaying scheduled piped water supply timings, mapping verified clean water sources with OpenStreetMap, and offering multilingual accessibility in **English**, **Telugu (తెలుగు)**, and **Hindi (हिन्दी)**.

---

## 🚀 Key Modules & Features

1. **Community Water Quality Testing (WQI Engine)**:
   - Evaluates pH, Total Dissolved Solids (TDS in ppm), Turbidity (NTU), Smell/Odour, and Water Colour.
   - Algorithmic Water Quality Index (WQI) score calculation (0–100).
   - Generates instant preliminary safety verdict: *Safe for Drinking*, *Moderate Risk (Boiling/Filter Required)*, or *Unfit for Human Consumption*.
   - Actionable health advisories aligned with Indian Standard IS 10500:2012.

2. **Pipeline Leakage & Grievance Reporting**:
   - Citizen reporting for major bursts, low pressure, contamination, broken tap stands, and tank overflow.
   - Severity rating (Low, Medium, High, Emergency) with photo proof upload.
   - Unique Complaint ID generation: e.g. `WW-2026-8812-LK`.

3. **Real-Time Grievance Tracking**:
   - Search by unique Complaint ID or 10-digit mobile number.
   - Visual milestone progression tracker (*Submitted* → *Under Inspection* → *In Progress* → *Resolved*).
   - Assigned junior engineer / lineman details and official action log.

4. **Village-Wise Water Supply Schedules**:
   - Morning and evening distribution windows by village and ward.
   - Real-time supply status indicators (*SUPPLY ACTIVE NOW* / *MAINTENANCE NOTICE*).
   - Distribution pressure telemetry (Bar) and overhead reservoir level tracking.

5. **Nearby Clean Water Sources Map (Leaflet + OpenStreetMap)**:
   - Interactive GIS map displaying community RO plants, deep borewells, public taps, and open wells.
   - Color-coded safety markers (Green, Amber, Red).
   - Detail cards with tested pH, TDS, turbidity, depth, and Gram Panchayat operator.

6. **Household Water Usage Calculator (55 LPCD Benchmark)**:
   - Rural-tailored inputs: family members, cattle (cows/buffaloes), small livestock, bucket baths, kitchen, washing.
   - Compares per-capita consumption against the **Jal Jeevan Mission 55 LPCD standard**.
   - Generates personalized water conservation recommendations.

7. **Village Water Audit & Citizen Survey**:
   - Participatory questionnaire gathering feedback on supply hours, water clarity, taste, and summer shortages.
   - Live citizen audit feed.

8. **Rural Water Conservation & Hygiene Guides**:
   - Rooftop Rainwater Harvesting (RWH) and borewell recharge pit layouts.
   - Kitchen greywater soak trenches for backyard nutrition gardens.
   - Safe covered earthen pot storage with tap.
   - SODIS (Solar Water Disinfection) & 3-pot sedimentation techniques.

9. **Protected Administrative Dashboard**:
   - Secure PIN-gated console for Gram Panchayat officials and RWSS engineers.
   - **Demo PIN**: `1800` (or click "One-Click Demo Admin Login").
   - 1-click complaint status updating, lineman assignment, and resolution remarks.
   - Quality report certification and schedule management.
   - Visual survey statistics and JSON database backup export.

10. **Multilingual Localization**:
    - Complete UI translation in **English**, **Telugu (తెలుగు)**, and **Hindi (हिन्दी)**.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS, Lucide React Icons
- **Mapping**: Leaflet 1.9, OpenStreetMap
- **State & Persistence**: LocalStorage + In-Memory Fallback Store with real-time cross-component event sync
- **Deployment**: GitHub Pages / Static Hosting

---

## 📋 Evaluation & Demo Information

- **Administrator Portal Access**: Click "Admin Portal" in header navigation.
- **Demo PIN**: `1800` (or click "One-Click Demo Admin Login").
- **Sample Grievance IDs to Track**:
  - `WW-2026-8812-LK` (Rampur - In Progress)
  - `WW-2026-6734-WQ` (Gollapalli - Under Inspection)
  - `WW-2026-4421-PR` (Krishnapuram - Resolved)
- **Reset Demo Data**: Available in the footer and the admin data management panel.

*College CSP Project Demonstration.*
