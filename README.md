# Infrasec-Watchdog

The cybersecurity issue being highlighted is basic cyber hygiene failures in critical infrastructure like oil and gas. The attacks aren't sophisticated—they exploit:

Default credentials
Exposed internet-facing systems
Weak remote access
Unpatched vulnerabilities
Poor segmentation
Lack of multi-factor authentication (MFA)


🔧 Hackathon Project Idea: "InfraSec Watchdog" – A Lightweight Cyber Hygiene Auditor for Critical Infrastructure

🔐 Problem it solves:

Many operational systems (OT/ICS/SCADA) in critical industries like oil and gas are vulnerable due to negligence of basic security measures. "InfraSec Watchdog" helps detect and alert such vulnerabilities before hackers do.


---

✅ Project Overview

Name: InfraSec Watchdog
Category: Cybersecurity, Infrastructure Protection
Tech Stack: Python + Nmap + Shodan API + Flask + SQLite + OpenVAS (optional)
Target Users: Oil & gas sector IT admins, SMEs, SCADA operators


---

🔍 Features

1. Default Credential Scanner
Scans devices and services for default usernames/passwords (based on known databases).

2. Internet-Facing Asset Discovery
Integrates with Shodan API to find exposed industrial control systems (ICS) linked to your org’s IP space.

3. Weak Remote Access Detector
Detects open ports (e.g., RDP, Telnet, SSH) and checks for proper access control.

4. Unpatched Software Alert
Checks software/firmware versions against CVE database (use a local CVE checker).

5. Network Segmentation Visualizer
Maps the internal network and flags devices with weak isolation (e.g., OT devices reachable from corporate LAN).

6. MFA Compliance Checker
Scans internal tools for MFA support/configuration (via plugins or manual checklist).

7. Emergency Playbook Rehearsal Guide
Provides a checklist for cyber incident response: isolate system, change creds, notify admins, etc.


---

🧠 Bonus Innovation

Real-Time Risk Score Dashboard:
A visual dashboard that updates your infrastructure’s risk level in real-time based on audit results.

"Fix It Now" Recommendations:
For each vulnerability found, provide a simple one-click guideline to resolve the issue.


---

💡 Why it fits the hackathon?
It's relevant and timely: aligns with real-world alerts from CISA, FBI, and DOE.
Easy to demo: Run on local networks or simulated IoT/ICS environments.
Immediate impact: Helps small and large companies secure their infrastructure without needing elite security teams.
Cross-disciplinary: Mix of cybersecurity, networking, automation, and visualization.


---

⚙ Tools/Libraries

Python (core scripting)
Nmap or Masscan (network scanning)
Shodan API (external exposure
Flask or FastAPI (web interface)
SQLite (local storage)
MITRE ATT&CK mappings (for real-world tactics)
Optional: OpenVAS, Metasploit Framework (advanced scanning)



---
 Project Roadmap: WebScannerProject
A feature roadmap from MVP → advanced deployment.

✅ Phase 1: MVP – Minimum Viable Product (Completed)
Goal: Build a functional local network scanner with a dashboard.
 Set up Flask backend
 Integrate Nmap for port scanning
 Store scan results in results.csv
 Build HTML dashboard with Jinja2
 Add scan button ("🔄 Scan Now")
 Assign color-coded risk levels (Low / Medium / High)
 Display results in a clean table
 Add basic client-side JS (scan.js)
 Enable feedback form
 Optional: Add logout button

🚧 Phase 2: UX & Interface Improvements
Goal: Make the interface more modern and user-friendly.
 Add loading spinner when scanning
 Show device icons or OS fingerprinting (if possible)
 Add Bootstrap or Tailwind for styling
 Sort/filter/search functionality for the results table
 “Last scanned at” display (already partially done)
 Flash message when scan or feedback is submitted

🔐 Phase 3: Security & Authentication
Goal: Control access and protect user data.
 User login/logout system
 Basic session handling with Flask-Login
 Admin vs guest user roles
 Prevent direct access to /scan without login

💡 Phase 4: Intelligence & Automation
Goal: Add smart features to analyze and react to risks.
 Auto-scan every 15/30/60 minutes (via scheduler or Celery)
 Export scan results to PDF
 Risk scoring dashboard (based on service + port + device)
 Email alert if high-risk services are detected
 Device history view (track risk change over time)

🌐 Phase 5: Deployment & API Access
Goal: Make the tool accessible remotely.
 Host on local intranet or Raspberry Pi
 Convert /scan and /results to proper REST API endpoints
 Add frontend polling to show scan progress
 Create a CLI tool version (optional)

📊 Phase 6: Reporting & Visualization
Goal: Turn technical results into readable insights.
 Pie chart: risk level summary (High/Medium/Low)
 Bar chart: number of open ports per device
 PDF export of scan summary report
 Device timeline of past scans

🤝 Phase 7: Community and Contribution
Goal: Prepare the project for public contribution.
 Add full README.md and CONTRIBUTING.md
 Add LICENSE (MIT recommended)
 Setup GitHub issues for feature requests and bugs
 Add unit tests for core logic (scanner.py)
 Write setup script for easy installation

