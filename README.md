# 🌾 AgroFlow

### _Empowering Farmers, Streamlining Logistics_

**AgroFlow** is a dual-sided marketplace designed to solve the "last-mile" delivery challenge for agricultural produce in Nigeria. This platform connects farmers directly with transporters, reducing post-harvest waste by ensuring crops move from farm to market in record time.

---

## 🏗️ Project Architecture

The project is currently structured as a **Multi-Page Application (MPA)** to provide distinct, focused experiences for different user roles:

- **Farmer Portal:** A dedicated space for farmers to manage their profiles and access the harvest posting tools.
- **Produce Form:** The "Engine" where farmers list harvest data, specify quantities, and set price offers.
- **Transporter Dashboard:** A real-time market feed where drivers can view, filter, and claim available delivery jobs.
- **Main Landing Page:** The central entry point for all users to the AgroFlow ecosystem.

## 📂 Codebase Structure

```text
/AgroFlow
  └── /frontend
      ├── /CSS                 # Modular stylesheets (Flexbox & Grid)
      ├── /pages               # HTML Views
      │   ├── farmer.html      # Farmer profile entry
      │   ├── produce-form.html# Data entry for new harvests
      │   ├── transporter.html # The "Marketplace" board for drivers
      │   └── main-page.html   # Homepage
      └── /javascript-logic    # The "Brain" (State management & UI Rendering)
🛠️ Technical Accomplishments (Phase 1)
Modular File System: Organized code into a clean frontend/ directory to separate concerns.

Functional Data Pipeline: Engineered a JavaScript engine that captures harvest data as structured objects.

Dynamic UI Rendering: Implemented logic to auto-generate "Job Cards" based on farmer input.

Version Control: Established a professional Git workflow and GitHub repository.

📅 The Road Ahead (Phase 2)
[ ] Data Persistence: Implement localStorage to sync data between the Produce Form and Transporter Board.

[ ] Logistics UI: Elevate the marketplace from basic text to high-contrast, professional "Job Cards."

[ ] Interactive States: Add "Claim Job" functionality to update job status in real-time.

Developed by fretdev
```
