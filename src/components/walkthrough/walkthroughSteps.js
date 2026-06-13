export const STEPS = [
  // ─────────────────────────────────────────────────────────────
  // INTRO (3 center cards)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'welcome',
    type: 'center',
    module: 'overview',
    target: null,
    badge: 'Welcome',
    title: "LPAI Nexus — Border Command Platform",
    body: "This guided walkthrough demonstrates India's most advanced land border management platform. In the next few minutes, you'll see how Axiom Intelligence transforms every aspect of border operations — from cargo risk scoring to real-time surveillance.",
    emoji: '🇮🇳',
  },
  {
    id: 'about-lpai',
    type: 'center',
    module: 'overview',
    target: null,
    badge: 'Context',
    title: "India's Land Border Network",
    body: "The Land Port Authority of India manages 12 active Integrated Check Posts across 5 neighbouring countries. In FY23-24, LPAI facilitated ₹70,952 Crore in trade and processed 30.46 Lakh passengers — all coordinated from this platform.",
    emoji: '🗺️',
    stats: [
      { label: 'Active ICPs', value: '12' },
      { label: 'Trade Facilitated', value: '₹70,952 Cr' },
      { label: 'Passengers FY24', value: '30.46 Lakh' },
    ],
  },
  {
    id: 'about-axiom',
    type: 'center',
    module: 'overview',
    target: null,
    badge: 'AI Engine',
    title: 'Axiom Intelligence — The AI Co-pilot',
    body: "Axiom is the intelligence layer that reads every document, analyses every image, and writes every briefing — automatically. It assigns risk scores in under 2 seconds and surfaces threats before they reach the border.",
    emoji: '🤖',
    stats: [
      { label: 'Risk accuracy', value: '94.2%' },
      { label: 'Detection rate', value: '98.7%' },
      { label: 'Docs per second', value: '240+' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // NAV BAR (3 steps)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'nav-bar',
    type: 'default',
    module: 'overview',
    target: 'nav-bar',
    badge: 'Navigation',
    title: 'Command Navigation Bar',
    body: "The top navigation bar provides instant access to all six operational modules. Each badge shows the live count of alerts requiring attention. The nav remains fixed — officers switch contexts without ever losing their place.",
    highlightPadding: 6,
  },
  {
    id: 'icp-selector',
    type: 'default',
    module: 'overview',
    target: 'icp-selector',
    badge: 'ICP Selector',
    title: 'Switch Between Check Posts Instantly',
    body: "All module data updates the moment you switch ICPs. A Joint Secretary at HQ can monitor Petrapole, Changrabandha, Moreh, Attari, and all other active check posts from a single screen — without refreshing or calling individual ICP Managers.",
    highlightPadding: 6,
  },
  {
    id: 'alert-bell',
    type: 'default',
    module: 'overview',
    target: 'alert-bell',
    badge: 'Live Alerts',
    title: 'Real-Time Alert Centre',
    body: "The alert bell aggregates all security events across the entire ICP network. Critical alerts are highlighted in red and blink continuously until acknowledged. No threat event is ever silently dropped.",
    highlightPadding: 6,
  },

  // ─────────────────────────────────────────────────────────────
  // TRANSITION → OVERVIEW MODULE
  // ─────────────────────────────────────────────────────────────
  {
    id: 'transition-overview',
    type: 'transition',
    module: 'overview',
    badge: 'Module 1 of 5',
    title: 'Command Overview',
    body: 'The Command Overview gives leadership an instant read on the health of the entire border network — everything critical visible in a single scroll.',
    emoji: '📊',
    autoAdvance: 2000,
  },

  // ─────────────────────────────────────────────────────────────
  // OVERVIEW MODULE (6 steps)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'hero-section',
    type: 'default',
    module: 'overview',
    target: 'hero-section',
    badge: 'Hero',
    title: "India's Borders — Secured by Intelligence",
    body: "The hero section reflects Axiom's operating philosophy: every border crossing is a data event, and data events create intelligence. The live video background shows actual border footage — this is operational reality, not marketing.",
    highlightPadding: 14,
  },
  {
    id: 'hero-kpi-strip',
    type: 'default',
    module: 'overview',
    target: 'hero-kpi-strip',
    badge: 'Live KPIs',
    title: 'Four Mission-Critical Numbers — Live',
    body: "Consignments today, border crossings, flagged alerts, and duty revenue — all live, updating in real time. These are the four numbers the Home Secretary reviews first every morning. Click any card to drill into the corresponding module.",
    highlightPadding: 8,
  },
  {
    id: 'axiom-briefing',
    type: 'default',
    module: 'overview',
    target: 'axiom-briefing',
    badge: 'AI Briefings',
    title: 'Axiom Intelligence Briefing Cards',
    body: "Every 6 hours, Axiom writes a fresh intelligence briefing in plain language. No jargon. 'A consignment from Satkhira district has a 91% probability of mismatch — recommend physical examination.' This is AI that communicates like an experienced analyst.",
    highlightPadding: 8,
  },
  {
    id: 'ai-insight-card',
    type: 'default',
    module: 'overview',
    target: 'ai-insight-card',
    badge: 'AI Insight',
    title: 'Predictive Intelligence — In Action',
    body: "Each insight card shows Axiom's confidence level, affected ICP, category (Cargo / Immigration / Security), and a plain-language recommendation. Insights are ranked by severity — your team always knows what to action first.",
    highlightPadding: 8,
  },
  {
    id: 'icp-grid',
    type: 'default',
    module: 'overview',
    target: 'icp-grid',
    badge: 'ICP Network',
    title: 'All 12 ICPs — Network Status at a Glance',
    body: "The ICP grid shows the operational status of every active check post. Green means fully operational. Decision-makers can see if a disruption at Petrapole correlates with unusual activity at Changrabandha — pattern recognition at the network level.",
    highlightPadding: 8,
  },
  {
    id: 'secondary-stats',
    type: 'default',
    module: 'overview',
    target: 'secondary-stats',
    badge: 'Statistics',
    title: 'System Health & Performance Benchmarks',
    body: "System uptime, average cargo clearance time, duty revenue vs. target, and Axiom insight count for today. When leadership asks 'how are we performing?' — this section answers in one glance.",
    highlightPadding: 8,
  },

  // ─────────────────────────────────────────────────────────────
  // TRANSITION → CARGO
  // ─────────────────────────────────────────────────────────────
  {
    id: 'transition-cargo',
    type: 'transition',
    module: 'cargo',
    badge: 'Module 2 of 5',
    title: 'Cargo Intelligence Module',
    body: 'Axiom reads every Bill of Entry in under 2 seconds and assigns a risk score. The Cargo module is where ₹862 Crore in contraband was prevented from crossing in FY23-24.',
    emoji: '📦',
    autoAdvance: 2000,
  },

  // ─────────────────────────────────────────────────────────────
  // CARGO MODULE (7 steps)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'cargo-kpi-row',
    type: 'default',
    module: 'cargo',
    target: 'cargo-kpi-row',
    badge: 'KPI Row',
    title: 'Cargo Operations at a Glance',
    body: "Total consignments received today, auto-cleared by Axiom, under review, and flagged for physical examination. The red 'Flagged' card pulses when Axiom has identified high-risk shipments needing urgent intervention.",
    highlightPadding: 10,
  },
  {
    id: 'risk-ribbon',
    type: 'default',
    module: 'cargo',
    target: 'risk-ribbon',
    badge: 'Risk Ribbon',
    title: "Risk Distribution — Today's Cargo Flow",
    body: "The risk ribbon visualises every consignment arriving today by lane: Green (auto-cleared), Yellow (review), Orange (inspect), Red (hold). In seconds, a Customs Commissioner can see that 5% of today's cargo is in Red — that's 38 shipments waiting for physical examination.",
    highlightPadding: 8,
  },
  {
    id: 'cargo-chart',
    type: 'default',
    module: 'cargo',
    target: 'cargo-chart',
    badge: 'Throughput',
    title: 'Hourly Cargo Throughput',
    body: "This stacked bar chart shows cargo flow hour by hour. The morning surge at 08:00–10:00 is visible — that's when bulk commercial trucks queue after the gate opens. Axiom uses this pattern to pre-position officers for peak inspection loads.",
    highlightPadding: 8,
  },
  {
    id: 'risk-donut',
    type: 'default',
    module: 'cargo',
    target: 'risk-donut',
    badge: 'Risk Split',
    title: 'Risk Distribution Donut',
    body: "The donut chart provides a clean percentage breakdown of today's risk categories. This is the opening visual for the daily 09:00 Customs Commissioner briefing — clears ₹X Crore, holds ₹Y Crore, at a glance.",
    highlightPadding: 8,
  },
  {
    id: 'cargo-table',
    type: 'default',
    module: 'cargo',
    target: 'cargo-table',
    badge: 'Queue',
    title: 'Live Consignment Queue',
    body: "Every consignment is listed with its Bill of Entry number, declarant, commodity, origin country, declared value, and Axiom's risk score. The table is searchable and filterable by lane — officers find any specific shipment by typing a partial BE number.",
    highlightPadding: 8,
  },
  {
    id: 'risk-score-cell',
    type: 'default',
    module: 'cargo',
    target: 'risk-score-cell',
    badge: 'Risk Score',
    title: 'Axiom Risk Scores — How They Work',
    body: "Each score is generated in under 2 seconds by analysing: document authenticity, HS code alignment, declared vs. market value, origin country risk, declarant history, and port-of-loading patterns. A score above 80 auto-triggers a hold. Officers cannot override scores above 90 without DCP authorisation.",
    highlightPadding: 10,
  },
  {
    id: 'anomaly-panel',
    type: 'default',
    module: 'cargo',
    target: 'anomaly-panel',
    badge: 'Anomalies',
    title: 'Axiom Anomaly Detection Panel',
    body: "The anomaly panel surfaces patterns no single officer could detect manually. Axiom cross-references every shipment against historical data, market prices, and trade patterns. When a cluster of low-value textile declarations appears from an unusual origin, Axiom flags the cluster — even if each individual declaration looks clean.",
    highlightPadding: 8,
  },

  // ─────────────────────────────────────────────────────────────
  // TRANSITION → IMMIGRATION
  // ─────────────────────────────────────────────────────────────
  {
    id: 'transition-immigration',
    type: 'transition',
    module: 'immigration',
    badge: 'Module 3 of 5',
    title: 'People & Immigration Module',
    body: 'Every person crossing the border has a story. Axiom reads that story in milliseconds — cross-referencing biometrics, watchlists, travel history, and document validity simultaneously.',
    emoji: '🛂',
    autoAdvance: 2000,
  },

  // ─────────────────────────────────────────────────────────────
  // IMMIGRATION MODULE (6 steps)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'immigration-kpi-row',
    type: 'default',
    module: 'immigration',
    target: 'immigration-kpi-row',
    badge: 'KPI Row',
    title: "People Movement — Today's Numbers",
    body: "Total crossings, Indian nationals, foreign nationals, and flagged/detained individuals — all live. The 'Flagged' count pulses red when detentions are active. A single glance tells the CPIC how busy the immigration hall is right now.",
    highlightPadding: 10,
  },
  {
    id: 'queue-chart',
    type: 'default',
    module: 'immigration',
    target: 'queue-chart',
    badge: 'Queue Prediction',
    title: 'AI Queue Prediction — Next 6 Hours',
    body: "Axiom predicts queue length 6 hours ahead by analysing bus schedules, historical traffic patterns, current counter staffing levels, and real-time queue depth. When Axiom forecasts a surge, it alerts the CPIC to open additional counters — before the queue forms.",
    highlightPadding: 8,
  },
  {
    id: 'counter-grid',
    type: 'default',
    module: 'immigration',
    target: 'counter-grid',
    badge: 'Counter Status',
    title: 'Immigration Counter Status — Live',
    body: "Each of the 8 counters shows: current status (Open/Busy/Closed), assigned officer name, and passengers processed today. HQ can see that Counter 8 is closed and Counter 4 has processed the most — indicating it needs relief. All in real time, no radio call required.",
    highlightPadding: 8,
  },
  {
    id: 'immigration-table',
    type: 'default',
    module: 'immigration',
    target: 'immigration-table',
    badge: 'Records',
    title: 'Immigration Records — Live Queue',
    body: "Every person in the immigration hall appears here with their passport number, nationality, purpose of travel, counter assignment, and status. Records update in real time as people move through the system. Officers search by name, passport number, or nationality.",
    highlightPadding: 8,
  },
  {
    id: 'watchlist-alert',
    type: 'default',
    module: 'immigration',
    target: 'watchlist-alert',
    badge: 'DETAINED',
    title: 'Watchlist Hit — Active Detention Alert',
    body: "This banner appeared the moment Axiom matched a passport scan against the MHA watchlist. The subject — Arif Hossain, Bangladeshi passport BD3214567 — is detained at Counter 8. The alert includes case ID, risk indicators, and suggested action. All of this happened automatically, in under 3 seconds of passport scan.",
    highlightPadding: 6,
  },
  {
    id: 'profile-modal-trigger',
    type: 'default',
    module: 'immigration',
    target: 'profile-modal-trigger',
    badge: 'Subject Profile',
    title: 'Full Subject Profile — Axiom Intelligence File',
    body: "Clicking 'View Full Profile' opens Axiom's complete intelligence file on the detained subject: travel history across all Indian entry points, biometric match score, risk factor breakdown by category, and recommended action. Officers get a complete picture to make the right decision in seconds.",
    highlightPadding: 8,
  },

  // ─────────────────────────────────────────────────────────────
  // TRANSITION → SURVEILLANCE
  // ─────────────────────────────────────────────────────────────
  {
    id: 'transition-surveillance',
    type: 'transition',
    module: 'surveillance',
    badge: 'Module 4 of 5',
    title: 'Security & Surveillance Module',
    body: 'Axiom watches all camera feeds simultaneously, detects motion in restricted zones, and identifies crowd density anomalies — so officers can focus on responding, not watching screens.',
    emoji: '📹',
    autoAdvance: 2000,
  },

  // ─────────────────────────────────────────────────────────────
  // SURVEILLANCE MODULE (4 steps)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'surveillance-kpi-row',
    type: 'default',
    module: 'surveillance',
    target: 'surveillance-kpi-row',
    badge: 'Camera Status',
    title: 'Network-Wide Surveillance Health',
    body: "At a glance: cameras online, active motion alerts, high-density crowd zones, and offline feeds. This status summary gives the CPIC an instant read on surveillance network health. An offline camera automatically pages the IT team for restoration.",
    highlightPadding: 10,
  },
  {
    id: 'camera-grid',
    type: 'default',
    module: 'surveillance',
    target: 'camera-grid',
    badge: 'CCTV Grid',
    title: 'Live CCTV Feeds — All Key Locations',
    body: "The camera grid shows live feeds from all key locations: Gate Entry, Cargo Bay, Immigration Hall, X-Ray Scanner, Perimeter, Parking Lot, Export Gate, Currency Exchange, and auxiliary entry. Each feed renders in real time with actual activity simulation. Click any camera to expand to full screen.",
    highlightPadding: 8,
  },
  {
    id: 'alert-camera',
    type: 'default',
    module: 'surveillance',
    target: 'alert-camera',
    badge: 'Motion Alert',
    title: 'Perimeter Breach — Active Alert',
    body: "Camera 05 — the perimeter fence — has detected motion in a restricted zone. Axiom's computer vision flagged this in 0.4 seconds. The feed shows the spotlight sweeping, a suspicious figure, and the blinking 'MOTION DETECTED' overlay. Simultaneously, the Quick Response Team is notified via radio.",
    highlightPadding: 6,
  },
  {
    id: 'camera-legend',
    type: 'default',
    module: 'surveillance',
    target: 'camera-legend',
    badge: 'Status Key',
    title: 'Camera Status Legend',
    body: "Each feed has a colour-coded status badge: Live (green), Crowded (yellow — density >80%), Alert (red — motion/intrusion detected), Offline (grey — connection lost). Status updates every 15 seconds from the edge AI processor at each camera node.",
    highlightPadding: 8,
  },

  // ─────────────────────────────────────────────────────────────
  // TRANSITION → VEHICLE
  // ─────────────────────────────────────────────────────────────
  {
    id: 'transition-vehicle',
    type: 'transition',
    module: 'vehicle',
    badge: 'Module 5 of 5',
    title: 'Vehicle Intelligence Module',
    body: 'Every vehicle crossing the border is photographed, its plate read by Axiom, and its details matched against the National Vehicle Registry — in under 1 second.',
    emoji: '🚛',
    autoAdvance: 2000,
  },

  // ─────────────────────────────────────────────────────────────
  // VEHICLE MODULE (4 steps)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'vehicle-kpi-row',
    type: 'default',
    module: 'vehicle',
    target: 'vehicle-kpi-row',
    badge: 'KPI Row',
    title: "Vehicle Movement — Key Numbers",
    body: "Total vehicles today, ANPR plate recognition rate, overloaded vehicles (weight violations), and blacklisted vehicles blocked. A vehicle on the blacklist triggers an immediate hold and alerts the CISF post — no vehicle passes through undetected.",
    highlightPadding: 10,
  },
  {
    id: 'anpr-widget',
    type: 'default',
    module: 'vehicle',
    target: 'anpr-widget',
    badge: 'ANPR Live',
    title: 'Live ANPR Scanner — Real-Time Simulation',
    body: "This is Axiom's Automatic Number Plate Recognition in operation. The scanner captures plates at 120 frames per second, even on trucks moving at 20 km/h. The result — vehicle registration, owner, fitness certificate, NCRB record — appears on-screen in under 1 second. Officers no longer manually note plate numbers.",
    highlightPadding: 8,
  },
  {
    id: 'vehicle-table',
    type: 'default',
    module: 'vehicle',
    target: 'vehicle-table',
    badge: 'Vehicle Log',
    title: 'Vehicle Crossing Log — Today',
    body: "Every vehicle crossing today is logged with plate number, type, origin, declared cargo, crossing time, ANPR match status, and declared vs. actual weight variance. A variance above 15% triggers an automatic secondary inspection alert — no manual flagging required.",
    highlightPadding: 8,
  },
  {
    id: 'lane-status',
    type: 'default',
    module: 'vehicle',
    target: 'lane-status',
    badge: 'Lane Flow',
    title: 'Lane-by-Lane Traffic Flow Status',
    body: "Four border lanes shown with current occupancy levels. Lane 2 at 89% occupancy means trucks are backed up. Axiom calculates estimated wait time and sends this to trucking companies via the Trade Facilitation API — they plan arrival time to avoid peak congestion.",
    highlightPadding: 8,
  },

  // ─────────────────────────────────────────────────────────────
  // TRANSITION → ANALYTICS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'transition-analytics',
    type: 'transition',
    module: 'analytics',
    badge: 'Intelligence Report',
    title: 'Axiom Intelligence Report',
    body: 'The Intelligence Report is where Axiom synthesises everything: trade flows, benchmarks, anomaly patterns, and a narrative written in plain language — for leadership briefings and parliamentary committees.',
    emoji: '📈',
    autoAdvance: 2000,
  },

  // ─────────────────────────────────────────────────────────────
  // ANALYTICS MODULE (5 steps)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'analytics-kpi-row',
    type: 'default',
    module: 'analytics',
    target: 'analytics-kpi-row',
    badge: 'FY23-24 KPIs',
    title: 'Annual Performance — FY 2023-24',
    body: "Official LPAI Annual Report figures: ₹70,952 Crore in trade, 30.46 Lakh passengers, ₹62.17 Crore duty collected — a 100% increase year-on-year. When the Home Secretary asks for the trade facilitation story, this is the opening slide.",
    highlightPadding: 10,
  },
  {
    id: 'axiom-briefing-analytics',
    type: 'default',
    module: 'analytics',
    target: 'axiom-briefing-analytics',
    badge: 'AI Briefing',
    title: 'Axiom Daily Briefing — CONFIDENTIAL',
    body: "Every morning at 07:00 IST, Axiom analyses all events from the previous 24 hours and writes this briefing. Plain language, prioritised by severity, with actionable recommendations. No analyst wrote this — Axiom did, in under 3 minutes of processing 2,000+ data points.",
    highlightPadding: 8,
  },
  {
    id: 'icp-comparison-table',
    type: 'default',
    module: 'analytics',
    target: 'icp-comparison-table',
    badge: 'Multi-ICP View',
    title: 'Multi-ICP Command Overview',
    body: "This table gives the Joint Secretary (Border Management) a complete operational picture of all 12 ICPs. Which check post has the most flagged cargo? Which has the fastest clearance time? Where are the alerts clustered? These questions are answered in seconds — no calls to individual ICP Managers required.",
    highlightPadding: 8,
  },
  {
    id: 'icp-benchmarking',
    type: 'default',
    module: 'analytics',
    target: 'icp-benchmarking',
    badge: 'Benchmarking',
    title: 'ICP Performance Benchmarking',
    body: "Axiom computes a composite score for each ICP based on clearance speed, detection rate, and accuracy. The bar chart reveals performance outliers at a glance. Petrapole consistently tops the leaderboard — its processes become the template for underperforming ICPs.",
    highlightPadding: 8,
  },
  {
    id: 'trade-flow-chart',
    type: 'default',
    module: 'analytics',
    target: 'trade-flow-chart',
    badge: 'Trade Flow',
    title: 'Monthly Trade Flow — Country-wise Breakdown',
    body: "The stacked bar chart shows trade volume month by month, broken down by neighbouring country. Bangladesh dominates — Petrapole handles 75% of India's land border trade with Bangladesh. The monsoon dip (July–August) is clearly visible, when flooding disrupts the Petrapole–Benapole corridor.",
    highlightPadding: 8,
  },

  // ─────────────────────────────────────────────────────────────
  // FINAL (center)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'final',
    type: 'center',
    module: 'analytics',
    target: null,
    badge: 'Tour Complete',
    title: "India's Borders — Intelligence-First",
    body: "You've experienced the full LPAI Nexus platform. This system is live, operational, and processing thousands of events every day across 12 check posts.\n\nAxiom Intelligence is the difference between reacting to threats and preventing them.\n\nThank you for your time.",
    emoji: '🎯',
    isFinal: true,
  },
];
