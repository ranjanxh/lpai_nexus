# LPAI Nexus — Complete Project Knowledge Base

> **Version:** 1.0  |  **Stack:** React 18 · Vite · Tailwind CSS · Recharts · Framer Motion · Lucide React  
> **Client:** Land Port Authority of India (LPAI)  
> **Purpose:** AI-powered unified command & intelligence platform for all 12 Indian land border Integrated Check Posts (ICPs)

---

## Table of Contents

1. [Project Purpose & Context](#1-project-purpose--context)
2. [Tech Stack](#2-tech-stack)
3. [File Structure](#3-file-structure)
4. [Design System](#4-design-system)
5. [Navigation — TopNav](#5-navigation--topnav)
6. [Data Layer — mockData.js](#6-data-layer--mockdatajs)
7. [Module 1 — Command (Overview)](#7-module-1--command-overview)
8. [Module 2 — Cargo Clearance](#8-module-2--cargo-clearance)
9. [Module 3 — People Movement (Immigration)](#9-module-3--people-movement-immigration)
10. [Module 4 — Security & Cameras (Surveillance)](#10-module-4--security--cameras-surveillance)
11. [Module 5 — Vehicle Gate](#11-module-5--vehicle-gate)
12. [Module 6 — Intelligence Report (Analytics)](#12-module-6--intelligence-report-analytics)
13. [Shared Components](#13-shared-components)
14. [UI Utilities — ShinyText](#14-ui-utilities--shinytext)
15. [CSS & Animation System](#15-css--animation-system)
16. [App Shell & Routing](#16-app-shell--routing)
17. [All Data Entities (mockData reference)](#17-all-data-entities-mockdata-reference)

---

## 1. Project Purpose & Context

### What LPAI Is
The **Land Port Authority of India** is a statutory body under the Ministry of Ports, Shipping and Waterways that manages India's land border infrastructure — the Integrated Check Posts (ICPs). Each ICP is a multi-agency facility at a land border crossing where customs, immigration, CISF (Central Industrial Security Force), quarantine, and other services operate together.

### The Problem Being Solved
Before this platform, each ICP operated in isolation with separate, siloed systems for:
- Cargo clearance (manual document checking, risk assessment)
- Immigration processing (manual passport scanning, watchlist lookup)
- CCTV surveillance (local NVR systems, no AI detection)
- Vehicle management (manual weighbridge, no ANPR cross-referencing)

**LPAI Nexus** unifies all four domains into a single real-time command interface with an embedded AI engine called **Axiom** that:
- Reads every cargo document in seconds and assigns risk scores
- Cross-checks every passport against national watchlists in under 1 second
- Watches all camera feeds simultaneously for threats, intrusions, and crowd density
- Reads number plates in 2 seconds and checks against VAHAN and national blacklists

### The 12 ICPs Covered
| Code | Name | State | Neighbour |
|---|---|---|---|
| PTP | Petrapole | West Bengal | Bangladesh |
| ATR | Attari | Punjab | Pakistan |
| RXL | Raxaul | Bihar | Nepal |
| JNG | Jogbani | Bihar | Nepal |
| SKL | Sunauli | Uttar Pradesh | Nepal |
| MRK | Moreh | Manipur | Myanmar |
| NHT | Nathula | Sikkim | China |
| AGT | Agartala | Tripura | Bangladesh |
| DWK | Dawki | Meghalaya | Bangladesh |
| HLP | Hili | West Bengal | Bangladesh |
| GHP | Ghojadanga | West Bengal | Bangladesh |
| KRP | Karimpasa | Assam | Bangladesh |

---

## 2. Tech Stack

| Dependency | Version | Role |
|---|---|---|
| `react` | ^18.3.1 | UI framework |
| `react-dom` | ^18.3.1 | DOM rendering |
| `recharts` | ^2.12.7 | All charts (bar, line, area, pie) |
| `lucide-react` | ^0.400.0 | Icon library |
| `framer-motion` | ^12.40.0 | ShinyText animation via `useAnimationFrame` |
| `vite` | ^5.3.1 | Build tool & dev server |
| `@vitejs/plugin-react` | ^4.3.1 | React fast refresh |
| `tailwindcss` | ^3.4.4 | Utility-first CSS |
| `postcss` + `autoprefixer` | latest | CSS processing |

### Tailwind Custom Tokens (`tailwind.config.js`)
```js
colors: {
  base:    '#070B14',   // page background (dark navy)
  surface: '#0D1626',   // glass card base
  cyan:    '#22D3EE',   // primary accent (active states, links)
  violet:  '#8B5CF6',   // Axiom AI accent
  brand:   '#D97706',   // gold (top performers, confidential tags)
}
fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
```

### Build & Dev Commands
```bash
npm run dev      # Vite dev server on :5173, LAN-accessible (--host)
npm run build    # Production build → dist/
npm run preview  # Serve dist/ locally
```

---

## 3. File Structure

```
lpai/
├── index.html                          # HTML shell — Inter font, dark class, title
├── package.json
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                        # React DOM root
    ├── App.jsx                         # App shell — layout, routing, state
    ├── index.css                       # Global CSS: Tailwind + glass + animations
    ├── data/
    │   └── mockData.js                 # All mock data (12 datasets, 254 lines)
    ├── components/
    │   ├── layout/
    │   │   ├── TopNav.jsx              # Floating frosted-glass nav bar
    │   │   ├── OverviewScreen.jsx      # Command module (video hero)
    │   │   ├── Sidebar.jsx             # (Legacy — no longer used)
    │   │   ├── TopBar.jsx              # (Legacy — no longer used)
    │   │   └── AlertPanel.jsx          # (Legacy — no longer used)
    │   ├── shared/
    │   │   ├── KPICard.jsx             # Reusable metric card with glow
    │   │   ├── StatusBadge.jsx         # Universal status chip (50+ states)
    │   │   └── ImpactBanner.jsx        # (Unused legacy component)
    │   └── ui/
    │       └── ShinyText.jsx           # Framer-motion animated gradient text
    └── modules/
        ├── cargo/
        │   └── CargoModule.jsx         # Cargo clearance full page
        ├── immigration/
        │   └── ImmigrationModule.jsx   # People movement full page
        ├── surveillance/
        │   └── SurveillanceModule.jsx  # Security & cameras full page
        ├── vehicle/
        │   └── VehicleModule.jsx       # Vehicle gate full page
        └── analytics/
            └── AnalyticsModule.jsx     # Intelligence report full page
```

---

## 4. Design System

### Color Palette
| Token | Hex | Usage |
|---|---|---|
| Background | `#070B14` | App background (dark navy) |
| Surface | `#0D1626` | Glass card background |
| Text Primary | `#E8F0FF` | Headings, values, important text |
| Text Secondary | `rgba(232,240,255,0.45)` | Body text |
| Text Muted | `rgba(232,240,255,0.25)` | Labels, timestamps |
| Cyan | `#22D3EE` | Active nav state, links, ICP codes |
| Green | `#10B981` | Success, cleared, operational |
| Amber | `#F59E0B` | Warning, medium risk, pending |
| Orange | `#F97316` | High risk, busy, orange lane |
| Red | `#F43F5E` | Critical, flagged, detained |
| Blue | `#60A5FA` | Info, monospace values, BE numbers |
| Violet | `#8B5CF6` | Axiom AI branding |
| Gold | `#D97706` | Brand accent, top performers, CONFIDENTIAL |
| Live Green | `#00D47A` | Live indicator dot, real-time signal |

### Typography Scale
| Use | Size | Weight | Color |
|---|---|---|---|
| Hero heading | `clamp(3.2rem, 10vw, 9rem)` | 500 | `#fff` |
| Module heading | `2.8rem` | 300 | `#E8F0FF` |
| KPI value | `3.4rem` | 600 | `#E8F0FF` |
| Section labels | `9px` | 700 | `rgba(232,240,255,0.32)` |
| Table headers | `10px` | 500 | `rgba(232,240,255,0.2)` |
| Body text | `12–14px` | 400 | `rgba(232,240,255,0.45)` |
| Monospace (IDs, times) | `12px` | 400 | Contextual |
| Nav links | `13px` | 400/500 | `rgba(255,255,255,0.52)` / `#fff` |

**Font:** Inter (300, 400, 500, 600, 700, 800) loaded via Google Fonts.  
**Feature settings:** `cv02, cv03, cv04, cv11` for better numeral rendering.

### Glass Card System
All cards use the `.glass` utility class:
```css
background: rgba(13,22,38,0.9);
backdrop-filter: blur(16px);
border: 1px solid rgba(255,255,255,0.08);
```

`.glass-hover` adds an interactive lift:
```css
transition: background 0.18s, border-color 0.18s, box-shadow 0.18s, transform 0.18s;
/* on hover: */
background: rgba(17,32,56,0.95);
border-color: rgba(255,255,255,0.13);
box-shadow: 0 16px 56px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.06) inset;
transform: translateY(-1px);
```

### Spacing Conventions
- Cards: `p-6` (24px) standard, `p-7` (28px) for KPI cards
- Grid gaps: `gap-4` (16px) throughout
- Section spacing: `space-y-10` (40px) within modules
- Max content width: `max-w-[1160px]` inside modules, `max-w-7xl` in nav

### Responsive Breakpoints
| Breakpoint | Value | Usage |
|---|---|---|
| `sm:` | 640px | Stacked → side-by-side (e.g. hero info row) |
| `md:` | 768px | Button padding increases |
| `lg:` | 1024px | Sidebar hides → pill nav shows; 2-col → multi-col grids |
| `xl:` | 1280px | Max font sizes kick in via `clamp()` |

### Row Hover on Tables
```css
.row-hover:hover {
  background: rgba(34,211,238,0.03) !important;
  box-shadow: inset 0 0 0 1px rgba(34,211,238,0.07);
}
```

---

## 5. Navigation — TopNav

**File:** `src/components/layout/TopNav.jsx`  
**Position:** `fixed top-0 left-0 right-0 z-50` with `px-4 pt-4`

### Structure
```
[Floating bar — rounded-2xl, frosted glass]
  ├── [Logo] — circular border + filled dot + "LPAI Nexus" text
  ├── [Pill Nav — hidden on mobile, lg:flex] — 6 links in rounded-full container
  └── [Right Controls — hidden on mobile, lg:flex]
      ├── ICP Selector dropdown
      ├── Alert bell button
      ├── LIVE badge
      ├── Clock (live, ticks every second)
      └── User avatar (SC initials)
[Mobile dropdown — lg:hidden, shown when hamburger tapped]
```

### Nav Links
| ID | Label | Badge | Module |
|---|---|---|---|
| overview | Command | — | OverviewScreen |
| cargo | Cargo | 37 (red) | CargoModule |
| immigration | People | 12 (red) | ImmigrationModule |
| surveillance | Security | 6 (red) | SurveillanceModule |
| vehicle | Vehicles | — | VehicleModule |
| analytics | Intelligence | — | AnalyticsModule |

Badges are static counts displayed in red pill chips (`rgba(244,63,94,0.18)` bg).

### Logo Design
- **Outer ring:** `36×36px` circle, `border: 2px solid rgba(255,255,255,0.85)`
- **Inner dot:** `11×11px` filled white circle, centered
- **Text:** "LPAI Nexus" (700 weight) + "BORDER COMMAND PLATFORM" (10px, all-caps, 0.1em tracking)

### ICP Dropdown
- Opens on button click, closes on outside click (via `useEffect` + `mousedown`)
- Lists all 12 ICPs from `icpList` mockdata
- Active ICP highlighted in `#22D3EE` with `rgba(34,211,238,0.07)` background
- Dropdown panel: `rgba(6,10,18,0.98)` + `blur(24px)` + `1px solid rgba(255,255,255,0.1)`

### Alert Bell
- Shows total `securityAlerts.length` count
- Red background/border when alerts exist
- Pulsing red dot if any are `CRITICAL`

### LIVE Badge
- Green pill: `rgba(16,185,129,0.07)` bg, `rgba(16,185,129,0.18)` border
- Animated dot via `.live-dot` CSS class (pulse scale animation)

### Clock
- `useEffect` sets 1-second interval updating a `new Date()` state
- Displays `HH:MM` in full white, `SS` in dim white, `IST` label
- `font-mono` class

### State
```js
const [mobileOpen, setMobileOpen] = useState(false);  // mobile menu toggle
const [icpOpen, setIcpOpen]       = useState(false);   // ICP dropdown
const [time, setTime]             = useState(new Date()); // clock
```

Props received from `App.jsx`: `active, setActive, icp, setIcp`

---

## 6. Data Layer — mockData.js

**File:** `src/data/mockData.js` (254 lines, 12 exported arrays/objects)

All data is static mock data — no backend. Every module imports what it needs directly from this file.

### Exports
| Export | Type | Purpose |
|---|---|---|
| `icpList` | Array[12] | ICP metadata (id, name, state, status, alerts) |
| `cargoData` | Array[12] | Individual cargo consignments (BE entries) |
| `riskDistribution` | Array[4] | Green/Yellow/Orange/Red counts for pie chart |
| `clearanceStages` | Array[7] | Step-by-step BE clearance pipeline |
| `cargoAnomalies` | Array[5] | Axiom-detected cargo anomalies |
| `cargoThroughput` | Array[12] | Hourly cleared/pending/flagged counts |
| `immigrationRecords` | Array[10] | Individual passport/visa records |
| `queuePrediction` | Array[7] | Actual + predicted queue size per hour |
| `nationalityStats` | Array[6] | Entries + exits by nationality |
| `cameras` | Array[9] | CCTV camera status, zone, feed state |
| `securityAlerts` | Array[6] | Security incidents (severity, type, zone, assignee) |
| `vehicleData` | Array[8] | Vehicles with ANPR, weight, risk, status |
| `trafficFlow` | Array[9] | Hourly actual + predicted vehicle counts |
| `laneStatus` | Array[4] | Lane queues and capacity |
| `icpOverview` | Array[12] | Per-ICP aggregate stats (cargo, crossings, alerts, clearance) |
| `tradeFlow` | Array[6] | Monthly trade volume by country (₹ Crore) |
| `aiInsights` | Array[4] | Axiom AI intelligence reports |
| `icpPerformance` | Array[6] | ICP benchmarking scores |
| `dutyRevenue` | Array[7] | Monthly collected vs target duty revenue |

---

## 7. Module 1 — Command (Overview)

**File:** `src/components/layout/OverviewScreen.jsx`  
**Route ID:** `overview`  
**Layout:** Special — full-screen video hero + scrollable below-fold content. No `pt-88px` applied by App.jsx (unlike other modules).

### Section 1 — Hero (100vh)

**Video Background:**
- URL: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4`
- Attributes: `autoPlay loop muted playsInline`
- `opacity: 0.38` — keeps text legible
- `object-cover` — fills the full viewport regardless of aspect ratio

**Gradient Overlays (2 layers):**
1. Bottom fade: `linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 28%, transparent 58%, rgba(0,0,0,0.92) 100%)`
2. Radial vignette: `radial-gradient(ellipse 80% 70% at 50% 40%, transparent 28%, rgba(0,0,0,0.52) 100%)`

**Two-Column Info Strip (below floating nav):**
- Left (max-w-sm): "We deliver transformative border intelligence…"
- Right (right-aligned on sm+): "**8,000+** border crossings secured today!"
- Both: `rgba(255,255,255,0.72)` color, `text-sm sm:text-base`
- Top padding: `pt-28` (112px) — clears the 76px fixed nav

**Hero Text Block (vertically centered):**
- Small label: "Seats for Next Deployment Cohort Opening Soon" — `10–13px clamp`, `0.14em` tracking, `rgba(255,255,255,0.52)`
- Line 1: "Become" — plain white, `clamp(3.2rem, 10vw, 9rem)`, `font-weight: 500`
- Line 2: "Product Leader." — `ShinyText` component (see §14)
- Both lines: `line-height: 0.85`, `letter-spacing: -0.04em`
- Description: "The Land Port Authority of India's next-generation…" — `rgba(255,255,255,0.58)`, `max-w-lg`

**CTA Button:**
- Text: "Apply for Next Enrollment →"
- Style: black bg, `border: 1px solid rgba(255,255,255,0.18)`, `border-radius: 9999px`
- Hover: bg changes to `#111827`
- Arrow: `<ArrowRight size={15}>` with `group-hover:translate-x-1` (4px nudge)
- `onClick` → `setActive('cargo')` — navigates to Cargo module

**KPI Strip (bottom of hero, `pb-10`):**
4-column grid (`grid-cols-2 sm:grid-cols-4`):
| Card | Value | Sub | On Click |
|---|---|---|---|
| Cargo Cleared | `selected.cleared` | `of {cargoToday} today · {flagged} flagged` | → cargo |
| Border Crossings | `selected.crossings` | "494 foreign nationals today" | → immigration |
| Security Alerts | `securityAlerts.length` | `{critical} critical · 8/9 cameras live` | → surveillance |
| Vehicles Processed | "543" | "100% ANPR · 8 overloaded checks" | → vehicle |

Card styling: `rgba(0,0,0,0.48)` + `blur(28px)` + `1px solid rgba(255,255,255,0.08)`. Alert cards get red border. Hover reveals "Open module →" in cyan (via `group-hover:opacity-100`). `selected` is the currently active ICP from `icpOverview`.

### Section 2 — Below Fold (dark `#070B14`)

**Gradient transition:** 64px `linear-gradient(#000 → #070B14)`

**Secondary Stats Row (4 cards, `grid-cols-2 lg:grid-cols-4`):**
| Card | Value | Color |
|---|---|---|
| System Health | 98.4% | Green |
| Avg Clearance | `{selected.clearanceAvg}m` | Conditional (green/amber/red) |
| Duty Revenue | ₹12.1Cr | Cyan |
| Axiom Insights | 4 | Violet |

Each card is `.glass .glass-hover .rounded-2xl p-6` with:
- Absolute top accent line: `linear-gradient(90deg, transparent → {color}55 → transparent)`
- Value uses `drop-shadow` color glow: `filter: drop-shadow(0 0 14px {color}55)`

**Axiom Intelligence Briefing:**
- Header: violet pulsing dot + "Axiom Intelligence Briefing" title + "Full report →" button
- 4 AI insight cards in `grid-cols-1 lg:grid-cols-2`
- Each card: `background: rgba(13,22,38,0.9)` + left `3px solid {priority color}` + right border
- Inside: priority label (colored) + timestamp + title + summary paragraph + confidence bar
- Confidence bar: green `#10B981` fill, width = `{insight.confidence}%`
- Priority colors: HIGH=orange, MEDIUM=amber, LOW=blue

**All ICPs Grid (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`):**
- 12 mini-cards, one per ICP
- Shows: ICP code (cyan mono), name, state, cargo today count, avg clearance time
- Status dot: green=operational, orange=degraded, dim=maintenance
- Degraded ICPs get orange border, maintenance ICPs get `opacity: 0.4`
- Alert count shown as blinking red number

---

## 8. Module 2 — Cargo Clearance

**File:** `src/modules/cargo/CargoModule.jsx`  
**Route ID:** `cargo`  
**Imports:** `cargoData, cargoThroughput, riskDistribution, clearanceStages, cargoAnomalies`

### Module Header (all modules share this pattern)
- LPAI Nexus breadcrumb chip (cyan border, animated green live dot)
- `h1` 2.8rem font-weight 300 (light) — "Cargo Clearance"
- Italic description of Axiom's role in this module

### KPI Row (4 cards, `KPICard` component)
| Label | Value | Color | Change |
|---|---|---|---|
| Received Today | 847 | white | +12% |
| Cleared | 612 | green | +8% |
| Under Review | 198 | yellow | -5% |
| Flagged by Axiom | 37 | red | +22% (pulsing) |

### Risk Ribbon
Horizontal segmented progress bar showing the 4 risk lanes:
- Green (57% width): 487 cleared
- Yellow (23%): 198 review
- Orange (15%): 124 inspect
- Red (5%): 38 hold
Below the bar: colored dot + label + count for each lane.

### Charts Row (3:2 column split)

**Cargo Throughput Bar Chart (3/5 width):**
- X-axis: 12 hourly slots (00:00–22:00)
- Stacked bars: Cleared (green `#10B981`), Pending (amber `#F59E0B`), Flagged (red `#F43F5E`)
- Custom `CustomTooltip` component: dark glass popup with colored dots

**Risk Distribution Donut Chart (2/5 width):**
- `innerRadius: 40`, `outerRadius: 65`, `paddingAngle: 2`
- 4 segments: Green `#4CDC8A`, Yellow `#F5C842`, Orange `#F5A623`, Red `#F5445A`
- Legend list below chart (dot + label + count)

### Consignment Table

Headers: BE Number | Declarant | Commodity | Origin | Risk | Status | Time

**Risk Score Column:**
- Number colored via `riskColor()`: green (<30), amber (<61), orange (<81), red (≥81)
- Mini progress bar: 40px wide, height 4px, colored fill = `riskScore`%

**Row Expansion (click to open):**
- `selectedRow` state tracks the open row ID
- Clicking a row toggles `selectedRow === row.id`
- Expanded row shows:
  1. **Clearance Pipeline** — 7-step horizontal flow:
     - Step circle: cyan=done, semi-cyan=active, dim=pending
     - Connector lines: cyan if done, dim if pending
     - Steps: BE Filed(5m) → OCR Verification(2m) → Risk Assessment(1m) → Document Check(15m) → Physical Exam(30m) → Duty Payment(10m) → Gate Pass(2m)
  2. **Detail Grid** (4 columns): Officer name | Documents status (green/orange) | Value in Lakhs | Weight variance (declared vs actual, colored)
- Red rows for risk ≥ 81 (`rgba(244,63,94,0.04)` background)

### Axiom Anomaly Detection Panel

Only shown when `activeAnomalies.length > 0`. State `dismissedAnomalies` tracks dismissed IDs.

5 anomalies in data:
| Type | Severity | Description |
|---|---|---|
| Weight Mismatch | HIGH | BE2024/PTP/001851 — +6.5% variance |
| Value Anomaly | CRITICAL | Machinery value 340% above HS code average |
| Repeat Declarant Flag | HIGH | Frontier Imports — 3rd consignment in 30 days |
| Route Anomaly | MEDIUM | Afghan goods via unusual Lahore-Wagah routing |
| Document Inconsistency | MEDIUM | Invoice currency mismatch (BDT vs USD) |

Each anomaly card: left colored border (CRITICAL=red, HIGH=orange, MEDIUM=amber) + severity tag + type title + description + `×` dismiss button.

---

## 9. Module 3 — People Movement (Immigration)

**File:** `src/modules/immigration/ImmigrationModule.jsx`  
**Route ID:** `immigration`  
**Imports:** `immigrationRecords, queuePrediction, nationalityStats`

### KPI Row
| Label | Value | Color | Change |
|---|---|---|---|
| Total Crossings | 2,341 | blue | +3% |
| Indian Nationals | 1,847 | green | +1% |
| Foreign Nationals | 494 | white | +7% |
| Flagged / Detained | 12 | red | +20% (pulsing) |

### Charts Row (2 equal columns)

**Queue Prediction Area Chart:**
- X-axis: 7 hourly slots (10:00–16:00)
- Two area series:
  - Actual (cyan `#22D3EE`, solid stroke, gradient fill `url(#actualGrad)`)
  - Predicted (dim white, dashed stroke `5 5`, gradient fill)
- `connectNulls={false}` — predicted values are shown as null for past hours
- SVG `<defs>` defines gradient fills from ~25% opacity to 0% opacity

**Nationality Breakdown Horizontal Bar Chart:**
- Layout: `vertical` (categories on Y-axis)
- 6 nationalities: Bangladeshi, Indian, Nepali, Pakistani, Chinese, Others
- Two bars per nationality: Entries (blue `#60A5FA`), Exits (green `#10B981`)

### Counter Status Grid

8 immigration counters displayed in `grid-cols-2 sm:grid-cols-4 lg:grid-cols-8`:
| Counter | Status | Officer | Processed | Nationality |
|---|---|---|---|---|
| C1 | Open | A. Sharma | 312 | All |
| C2 | Busy | P. Kumar | 289 | Foreign |
| C3 | Open | S. Devi | 276 | All |
| C4 | Busy | R. Nair | 341 | All |
| C5 | Busy | G. Singh | 198 | Foreign |
| C6 | Busy | M. Khan | 267 | All |
| C7 | Open | T. Roy | 154 | All |
| C8 | Closed | — | 0 | — |

Color coding: Open=green bg, Busy=orange bg, Closed=dim bg

### Immigration Records Table

Headers: Passport | Name | Nationality | Visa | Risk | Status | Counter | Time

- Passport numbers in blue mono
- Nationality displayed with flag emoji (`nationalityFlag` map for BD, IN, NP, PK, CN)
- `StatusBadge` used for Visa (Valid/EXPIRED), Risk (Low/Medium/High/Critical), Status (Cleared/Secondary Check/DETAINED/Held)
- DETAINED rows get `rgba(244,63,94,0.06)` red background tint
- 10 records: 5 Bangladeshi, 2 Indian, 2 Nepali, 1 Pakistani, 1 Chinese

### Watchlist Alert Banner

Persistent red alert card at the bottom:
- Blinking red dot
- "Active Watchlist Alert" heading in red
- Subject: Arif Hossain, Passport BD3214567 — visa expired 14 days ago
- Three action buttons:
  1. **Escalate to DCP** — red button (visual only, no handler)
  2. **View Full Profile** — dim button (visual only)
  3. **Initiate Deportation** — dim button (visual only)

---

## 10. Module 4 — Security & Cameras (Surveillance)

**File:** `src/modules/surveillance/SurveillanceModule.jsx`  
**Route ID:** `surveillance`  
**Imports:** `cameras, securityAlerts`

### State
```js
const [resolvedAlerts, setResolvedAlerts] = useState([]);
```
`activeAlerts` = `securityAlerts.filter(a => !resolvedAlerts.includes(a.id))`

### KPI Row
| Label | Value | Color |
|---|---|---|
| Active Alerts | `activeAlerts.length` | yellow |
| Critical | `criticalCount` | red (pulsing if >0) |
| Cameras Online | `{online}/{total}` | green |
| Incidents Today | 14 | white |

### Main Layout (3:2 column split)

**CCTV Command Grid (3/5 width) — `grid-cols-3`:**

9 camera cells rendered via `CameraCell` component. Each cell is `aspect-ratio: 16/9`, minimum 90px height. Feed states:

| Feed State | Visual |
|---|---|
| `nominal` | Green "LIVE" indicator top-right |
| `alert` | Yellow bounding box (TARGET label) + red "AXIOM ALERT" blinking badge |
| `crowded` | Centered orange crowd counter "48 / 40 limit" |
| `offline` | Camera icon + "OFFLINE" text |

All cells have:
- Cyan grid pattern overlay (5% opacity background-image)
- Camera name label (top-left, cyan)
- Bottom bar: camera ID (mono) + online/offline dot + alert count (if any, blinking)
- Border color: alert=red, crowded=orange, offline/nominal=dim white

**Active Security Alerts Panel (2/5 width):**

Scrollable list of active alerts (unresolved). Each card:
- Left border: `3px solid {color}` (CRITICAL=red, HIGH=orange, MEDIUM=amber)
- `StatusBadge` for severity + timestamp
- Alert type + description + camera + zone
- Two buttons: **Escalate** (red, visual only) + **Resolve** (green, updates `resolvedAlerts` state)

When all alerts resolved: "All Clear" empty state with Shield icon.

### Incident Log Table

Full log of all 6 security alerts (including resolved).
Headers: Alert ID | Severity | Type | Zone | Camera | Time | Status | Assigned To

6 incidents:
| ID | Severity | Type | Zone |
|---|---|---|---|
| ALT-001 | CRITICAL | Watchlist Match | Immigration Counter Hall |
| ALT-002 | HIGH | Unattended Object | Cargo Examination Bay 1 |
| ALT-003 | HIGH | Vehicle Anomaly | Parking Lot North |
| ALT-004 | MEDIUM | Restricted Zone Intrusion | Server Room Corridor |
| ALT-005 | MEDIUM | Crowd Density Breach | Passenger Waiting Area |
| ALT-006 | LOW | Camera Offline | Server Room Corridor |

### Camera Status Overview

5-column grid of all 9 cameras. Each mini-card:
- Dot: green=online, orange=has alerts, dim=offline
- Camera ID (mono, bold) + name + zone
- Alert count if any

---

## 11. Module 5 — Vehicle Gate

**File:** `src/modules/vehicle/VehicleModule.jsx`  
**Route ID:** `vehicle`  
**Imports:** `vehicleData, trafficFlow, laneStatus`

### KPI Row
| Label | Value | Color |
|---|---|---|
| Processed Today | 543 | white (+4%) |
| ANPR Success | 100% | green |
| Overloaded | 8 | red (pulsing, +60%) |
| Blacklisted | 2 | yellow |

### Charts Row (6:5 column split)

**Vehicle Traffic Flow Line Chart (6/11):**
- X-axis: 9 hourly slots (06:00–14:00)
- Actual line: cyan `#22D3EE`, strokeWidth 2.5, solid dots (r=3)
- Predicted line: dim white, dashed `6 4`, no dots
- Null values shown as gaps (predicted only covers future hours)

**Lane Status (5/11):**
4 lanes displayed as labeled progress bars:
| Lane | Type | Queue | Capacity | Status |
|---|---|---|---|---|
| Lane 1 | Green | 3 | 8 | normal |
| Lane 2 | Yellow | 6 | 8 | normal |
| Lane 3 | Orange | 7 | 8 | busy |
| Lane 4 | Red | 2 | 4 | restricted |

Bar fill: `(queue/capacity)*100`%, colored by status (normal=green, busy=orange, restricted=red).
`StatusBadge` shows operational/degraded/maintenance.

### Vehicle Registry Table

Headers: Plate | Type | Driver | Cargo | Declared (kg) | Actual (kg) | Variance | Risk | Status | Time

**Variance Column:**
```js
const variancePct = (declared, actual) => {
  const pct = ((actual - declared) / declared) * 100;
  return (pct >= 0 ? '+' : '') + pct.toFixed(1) + '%';
}
```
Color: ≤1% = green, ≤3% = amber, >3% = red

**Row Background Tinting:**
- Risk ≥ 81 or "FLAGGED — No Appointment": red tint
- "Overloaded — Hold" or "Held": orange tint

8 vehicles in data, including:
- TN04AB2341 (SUV, Unknown driver, risk 92, No TAS Record — the suspicious vehicle from surveillance)
- PB10AA4523 (Truck, Industrial Machinery, risk 88, Held)
- UP78BT2341 (Trailer, Steel Pipes, Overloaded — 9.2% over)

### Weighbridge Summary

4-card grid:
| Card | Value | Color |
|---|---|---|
| Total Weighed Today | 543 vehicles | white |
| Overloaded Detected | 8 violations | red |
| Top Violator | UP78BT2341 (+9.2%) | orange |
| Average Variance | 0.4% | green |

---

## 12. Module 6 — Intelligence Report (Analytics)

**File:** `src/modules/analytics/AnalyticsModule.jsx`  
**Route ID:** `analytics`  
**Imports:** `aiInsights, icpOverview, tradeFlow, dutyRevenue, icpPerformance`

### Module Header
Unique to this module: no KPI row. Goes directly to the Axiom Daily Briefing.

### Axiom Daily Briefing Card

Styled as a classified document:
- Left border: `3px solid #8B5CF6` (violet)
- Header bar: Axiom AI pulsing dot + title + "CONFIDENTIAL" gold badge
- Generated date: `new Date().toLocaleDateString('en-IN', {...})` — rendered live
- Italic disclaimer: "This briefing is automatically written by the LPAI Intelligence Engine…"
- 4 AI insight cards in `grid-cols-1 lg:grid-cols-2`

**The 4 Axiom Insights:**
1. **Cargo Volume Spike — Petrapole** (HIGH, 06:30, 89% confidence) — Garment consignments +34%, 6/12 flagged
2. **Overstay Pattern — Bangladeshi Tourists** (MEDIUM, 05:45, 76%) — 14 holders not yet exited
3. **ANPR Anomaly — Repeat Plate at Attari** (HIGH, 04:12, 82%) — Possible RFID cloning
4. **Peak Hour Forecast — Counter Staffing** (LOW, 07:00, 91%) — LSTM predicts +23% crossings 14:00–17:00

### Multi-ICP Command Table

Full table of all 12 ICPs.
Headers: ICP | State | Cargo | Cleared | Pending | Flagged | Vehicles | Crossings | Alerts | Avg Clear | Status

- ICP code in amber gold `#D97706`
- Cleared values in green, Pending in amber, Flagged in red (dim if 0)
- Alert count in blinking red pill
- Avg clearance colored by performance (green <40m, amber <60m, red ≥60m)
- Degraded rows: orange bg tint; Maintenance rows: `opacity: 0.45`

### Charts Row (2 equal columns)

**Trade Flow Stacked Bar Chart:**
- X-axis: 6 months (Nov–Apr)
- Stacked bars per country: Bangladesh (blue), Nepal (green), Pakistan (red), China (amber), Bhutan (orange), Others (dim)
- Y-axis in Crore ₹
- Bangladesh dominates (~2800–3580 Cr/month)

**Revenue vs Target Line Chart:**
- Two lines: Collected (cyan, solid, dots) vs Target (dim white, dashed)
- 7 months (Oct–Apr)
- Y-axis in Lakhs ₹
- Best month: March — ₹12,100L vs ₹10,000L target

### ICP Performance Benchmarking

Split into chart (left) + table (right) inside a single glass card.

**Horizontal Bar Chart:**
- 6 ICPs on Y-axis, score 0–100 on X-axis
- Top performer (Jogbani, score 91) rendered in gold `#D97706`
- Others in cyan `#22D3EE`

**Performance Table (sorted by score desc):**
Headers: ICP | Clear Time | Detection | Accuracy | Score

| ICP | Clear Time | Detection | Accuracy | Score |
|---|---|---|---|---|
| Jogbani ★ | 31m | 92% | 98% | **91** |
| Petrapole | 42m | 94% | 97% | 88 |
| Raxaul | 38m | 89% | 96% | 86 |
| Agartala | 36m | 88% | 95% | 85 |
| Sunauli | 44m | 87% | 94% | 82 |
| Attari | 67m | 91% | 95% | 79 |

Top performer row: gold text + ★ star + gold bg tint (`rgba(217,119,6,0.04)`).

---

## 13. Shared Components

### KPICard — `src/components/shared/KPICard.jsx`

**Props:**
```ts
{
  label: string;      // All-caps section label
  value: string;      // Large display number
  sub?: string;       // Sub-label below value
  change?: number;    // % change (positive=green↑, negative=red↓)
  color?: 'white'|'green'|'red'|'yellow'|'blue'|'violet'|'cyan';
  pulse?: boolean;    // Applies .blink CSS class
}
```

**Color tokens resolved:**
| Color | Hex | Glow |
|---|---|---|
| white | `#E8F0FF` | `rgba(232,240,255,0.12)` |
| green | `#10B981` | `rgba(16,185,129,0.16)` |
| red | `#F43F5E` | `rgba(244,63,94,0.16)` |
| yellow | `#F59E0B` | `rgba(245,158,11,0.16)` |
| blue | `#60A5FA` | `rgba(96,165,250,0.16)` |
| violet | `#A78BFA` | `rgba(167,139,250,0.16)` |
| cyan | `#22D3EE` | `rgba(34,211,238,0.16)` |

**Visual anatomy:**
1. Absolute top accent line: `linear-gradient(90deg, transparent → {color}40 → transparent)`
2. Absolute bottom-right radial glow blob (140×140px circle)
3. 5px colored dot + label (9px, 700 weight, all-caps)
4. Value at 3.4rem, color `#E8F0FF`, with `drop-shadow(0 0 18px {color}50)` glow
5. Sub text (12px, 40% opacity)
6. Change indicator (↑ green / ↓ red, 11px, 500 weight)

Applied classes: `.glass .glass-hover .rounded-2xl`

---

### StatusBadge — `src/components/shared/StatusBadge.jsx`

Universal status chip supporting 50+ status strings. Two visual modes:

**Mode 1 — Pill with background** (`cfg.bg === true`):
```
[colored-dot] [label text]     ← 10px, medium weight
```
Background: `rgba({r,g,b}, 0.1)`, border: `rgba({r,g,b}, 0.18)`

**Mode 2 — Dot + text only** (`cfg.bg === false`):
```
[colored-dot] [label text]     ← no background pill
```

**Pulsing** (`cfg.pulse === true`): adds `.blink` CSS animation class.

Key status → color mappings:
| Status | Color |
|---|---|
| Cleared, Valid, Operational, Matched, Low, Open | Green |
| Yellow (lane), Document Check, Pending, Medium, Busy | Amber |
| Orange (lane), Under Examination, Physical Check | Orange |
| Red (lane), CRITICAL, DETAINED, FLAGGED, EXPIRED, Held | Red |
| Degraded | Amber |
| Maintenance, Offline, Closed, N/A | Dim white |
| Tourist, Cross-border | Blue |
| Business | Indigo |
| Transit | Amber |

Fallback (unknown status): dim dot + raw status string.

---

## 14. UI Utilities — ShinyText

**File:** `src/components/ui/ShinyText.jsx`  
**Dependencies:** `framer-motion` (`useAnimationFrame`), `react` (`useRef`)

### How It Works

Uses `useAnimationFrame` from framer-motion — fires on every RAF tick with elapsed time in milliseconds.

```js
useAnimationFrame((t) => {
  if (!ref.current) return;
  const cycle = ((t / 1000) / speed) % 1;   // 0.0 → 1.0 over `speed` seconds
  const pos = cycle * 200 - 30;              // sweeps from -30 to 170
  ref.current.style.backgroundImage = `linear-gradient(${spread}deg,
    ${baseColor} 0%,
    ${baseColor} ${Math.max(0, pos)}%,
    ${shineColor} ${pos + 12}%,
    ${baseColor} ${Math.min(100, pos + 24)}%,
    ${baseColor} 100%)`;
});
```

**Key technique:** Direct DOM mutation via `ref.current.style` — avoids React re-renders on every animation frame (60fps). The gradient's background-position is not animated; instead the gradient itself is regenerated each frame.

**CSS backdrop:**
```js
{
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  display: 'block',
}
```

### Props
```ts
{
  text: string;
  baseColor?: string;   // default '#64CEFB' (light blue)
  shineColor?: string;  // default '#ffffff'
  speed?: number;       // seconds per cycle, default 3
  spread?: number;      // gradient angle in degrees, default 100
}
```

### Current Usage (OverviewScreen)
```jsx
<ShinyText
  text="Product Leader."
  baseColor="#64CEFB"
  shineColor="#ffffff"
  speed={3}
  spread={100}
/>
```

---

## 15. CSS & Animation System

**File:** `src/index.css`

### Global Resets
```css
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
body {
  color: #E8F0FF;
  font-family: 'Inter', system-ui, sans-serif;
  font-feature-settings: 'cv02','cv03','cv04','cv11';
  background-color: #070B14;
  background-image:
    radial-gradient(ellipse 70% 40% at 85% -5%, rgba(34,211,238,0.055) 0%, transparent 60%),
    radial-gradient(ellipse 50% 35% at 10% 95%, rgba(139,92,246,0.05) 0%, transparent 55%);
}
```

The body background gradients add subtle cyan (top-right) and violet (bottom-left) glows visible on module pages.

### Scrollbar
```css
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 2px; }
```

### Utility Classes

| Class | Description |
|---|---|
| `.dot-grid` | Fixed full-screen dot grid overlay (only on non-overview pages) |
| `.glass` | Frosted glass card background |
| `.glass-hover` | Hover: lift + brighter border + shadow |
| `.inset-card` | Lighter inner card (`rgba(255,255,255,0.03)`) |
| `.axiom-card` | Violet-bordered card for Axiom AI elements |
| `.gradient-border-cyan` | Transparent border + cyan/violet gradient border-box |
| `.gradient-border-gold` | Transparent border + gold/violet gradient border-box |
| `.row-hover` | Table row cyan hover effect |
| `.num-glow` | `filter: drop-shadow(0 0 12px currentColor)` |
| `.shimmer-text` | CSS-animated shimmer gradient on text (legacy) |

### Keyframe Animations

| Name | Class | Duration | Behavior |
|---|---|---|---|
| `blink` | `.blink` | 2s | `opacity: 1 → 0.18 → 1` (alerts, critical indicators) |
| `axiomPulse` | `.axiom-pulse` | 2.5s | Box-shadow pulse `0px → 6px rgba(violet,0)` (Axiom dot) |
| `liveDot` | `.live-dot` | 2.6s | Scale + opacity pulse `1 → 0.8/0.45 → 1` (live indicators) |
| `fadeSlideIn` | `.page-enter` | 0.35s | `opacity:0 + translateY(10px) → opacity:1 + translateY(0)` — applied on module page mount |
| `shimmer` | `.shimmer-text` | 5s | `background-position: -200% → 200%` linear infinite |

---

## 16. App Shell & Routing

**File:** `src/App.jsx`

### State
```js
const [active, setActive] = useState('overview');  // current module
const [icp, setIcp]       = useState('PTP');        // selected ICP
```

### Page Map
```js
const pages = {
  overview:     (props) => <OverviewScreen {...props} />,
  cargo:        () => <CargoModule />,
  immigration:  () => <ImmigrationModule />,
  surveillance: () => <SurveillanceModule />,
  vehicle:      () => <VehicleModule />,
  analytics:    () => <AnalyticsModule />,
};
```

### Layout Logic
```js
const isOverview = active === 'overview';
```

- **Overview:** `bg: #000`, no dot grid, no padding on `<main>`. The video hero fills 100vh naturally.
- **Other modules:** `bg: #070B14` + dot grid + `<main style="paddingTop: 88px, px: 2rem, pb: 2rem">`.

The `key={active}` prop on `<main>` forces React to remount the element on navigation, which triggers the `.page-enter` CSS animation on the incoming page.

### Props Flow
`App.jsx` passes `{ setActive, icp }` to `OverviewScreen` and `TopNav` receives `{ active, setActive, icp, setIcp }`.

---

## 17. All Data Entities (mockData reference)

### `icpList` (12 entries)
```ts
{ id: string; name: string; state: string; status: 'operational'|'degraded'|'maintenance'; alerts: number }
```

### `cargoData` (12 entries)
```ts
{
  id: string;         // "BE2024/PTP/001847"
  declarant: string;
  commodity: string;  // with HS code
  origin: string;
  weight: number;     // actual kg
  declaredWeight: number;
  value: number;      // in ₹
  riskScore: number;  // 0–100
  lane: 'Green'|'Yellow'|'Orange'|'Red';
  status: string;     // Cleared, Under Examination, Physical Check, etc.
  documents: 'Verified'|'Mismatch'|'Pending'|'Under Review';
  officer: string;
  time: string;       // "HH:MM"
}
```

### `cargoAnomalies` (5 entries)
```ts
{ id: number; type: string; description: string; severity: 'CRITICAL'|'HIGH'|'MEDIUM'; time: string; module: string }
```

### `clearanceStages` (7 entries)
```ts
{ stage: string; duration: number; status: 'done'|'active'|'pending' }
```
BE Filed(5m) → OCR Verification(2m) → Risk Assessment(1m) → **Document Check(15m, active)** → Physical Exam(30m) → Duty Payment(10m) → Gate Pass(2m)

### `immigrationRecords` (10 entries)
```ts
{
  id: string;         // "IMM-001"
  passport: string;
  name: string;
  nationality: string;
  type: string;       // Tourist, Business, Worker, Medical, Cross-border, Returning, Transit
  visa: 'Valid'|'EXPIRED'|'Cross-border'|'N/A';
  riskLevel: 'Low'|'Medium'|'High'|'Critical';
  status: string;     // Cleared, Secondary Check, Held, Document Check, DETAINED
  counter: number;
  time: string;
}
```

### `cameras` (9 entries)
```ts
{
  id: string;         // "CAM-001"
  name: string;       // "Main Gate Entry"
  zone: 'Entry Gate'|'Cargo'|'Immigration'|'Vehicle'|'Exit'|'Restricted';
  status: 'active'|'offline';
  alerts: number;
  feed: 'nominal'|'alert'|'crowded'|'offline';
}
```

### `securityAlerts` (6 entries)
```ts
{
  id: string;         // "ALT-001"
  severity: 'CRITICAL'|'HIGH'|'MEDIUM'|'LOW';
  type: string;       // "Watchlist Match", "Unattended Object", etc.
  description: string;
  camera: string;     // "CAM-004"
  zone: string;
  time: string;       // "HH:MM:SS"
  status: 'Active'|'Investigating'|'Monitoring'|'Maintenance';
  assignedTo: string;
}
```

### `vehicleData` (8 entries)
```ts
{
  id: string;         // "VEH-001"
  plate: string;      // Indian plate format
  type: 'Truck'|'Trailer'|'SUV';
  driver: string;
  cargo: string;
  declaredWeight: number;  // kg
  actualWeight: number;    // kg
  riskScore: number;  // 0–100
  lane: number|null;  // 1–4
  status: string;     // Cleared, Held, Physical Check, Overloaded — Hold, FLAGGED — No Appointment
  anpr: 'Matched'|'No TAS Record';
  time: string;
}
```

### `aiInsights` (4 entries)
```ts
{
  id: number;
  title: string;
  summary: string;
  category: 'Cargo'|'Immigration'|'Vehicle'|'Analytics';
  priority: 'HIGH'|'MEDIUM'|'LOW';
  time: string;       // "HH:MM"
  confidence: number; // 0–100
}
```

### `icpOverview` (12 entries)
```ts
{
  id: string;
  name: string;
  state: string;
  cargoToday: number;
  cleared: number;
  pending: number;
  flagged: number;
  vehicles: number;
  crossings: number;
  alerts: number;
  clearanceAvg: number;  // minutes
  status: 'operational'|'degraded'|'maintenance';
}
```

### `icpPerformance` (6 entries)
```ts
{
  name: string;
  clearanceTime: number;  // minutes
  detectionRate: number;  // %
  accuracy: number;       // %
  score: number;          // 0–100 composite score
}
```

### `tradeFlow` (6 monthly entries)
```ts
{ month: string; Bangladesh: number; Nepal: number; Pakistan: number; China: number; Bhutan: number; Others: number }
// All values in Crore ₹
```

### `dutyRevenue` (7 monthly entries)
```ts
{ month: string; collected: number; target: number }
// Values in Lakhs ₹
```

### `riskDistribution` (4 entries)
```ts
{ name: string; value: number; color: string }
// Green: 487, Yellow: 198, Orange: 124, Red: 38
```

### `nationalityStats` (6 entries)
```ts
{ nationality: string; entries: number; exits: number; color: string }
```

### `queuePrediction` (7 entries)
```ts
{ time: string; actual: number|null; predicted: number }
// actual is null for future hours
```

### `trafficFlow` (9 entries)
```ts
{ hour: string; actual: number|null; predicted: number }
// actual is null for future hours
```

### `laneStatus` (4 entries)
```ts
{ id: number; name: string; type: 'Green'|'Yellow'|'Orange'|'Red'; queue: number; capacity: number; status: 'normal'|'busy'|'restricted' }
```

### `cargoThroughput` (12 hourly entries)
```ts
{ hour: string; cleared: number; pending: number; flagged: number }
```

---

*This knowledge base covers every file, component, prop, data structure, animation, and design decision in the LPAI Nexus project as of the current build.*
