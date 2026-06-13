// ICP locations
export const icpList = [
  { id: 'PTP', name: 'Petrapole',      state: 'West Bengal',    status: 'operational', alerts: 3 },
  { id: 'ATR', name: 'Attari',          state: 'Punjab',          status: 'operational', alerts: 7 },
  { id: 'RXL', name: 'Raxaul',          state: 'Bihar',           status: 'operational', alerts: 1 },
  { id: 'JNG', name: 'Jogbani',         state: 'Bihar',           status: 'operational', alerts: 0 },
  { id: 'SKL', name: 'Sunauli',         state: 'Uttar Pradesh',   status: 'operational', alerts: 2 },
  { id: 'MRK', name: 'Moreh',           state: 'Manipur',         status: 'degraded',    alerts: 4 },
  { id: 'CHB', name: 'Changrabandha',   state: 'West Bengal',     status: 'operational', alerts: 0 },
  { id: 'AGT', name: 'Agartala',        state: 'Tripura',         status: 'operational', alerts: 1 },
  { id: 'DWK', name: 'Dawki',           state: 'Meghalaya',       status: 'operational', alerts: 0 },
  { id: 'HLP', name: 'Hili',            state: 'West Bengal',     status: 'operational', alerts: 0 },
  { id: 'GHP', name: 'Ghojadanga',      state: 'West Bengal',     status: 'maintenance', alerts: 0 },
  { id: 'KRP', name: 'Karimpasa',       state: 'Assam',           status: 'operational', alerts: 1 },
];

// Cargo consignments
export const cargoData = [
  { id: 'BE2024/PTP/001847', declarant: 'Balaji Textiles Pvt Ltd', commodity: 'Cotton Fabric (HS 5208)', origin: 'Bangladesh', weight: 18420, declaredWeight: 18420, value: 2340000, riskScore: 22, lane: 'Green', status: 'Cleared', documents: 'Verified', officer: 'Suresh Kumar', time: '08:14' },
  { id: 'BE2024/PTP/001848', declarant: 'Anand Exporters', commodity: 'Ready-made Garments (HS 6204)', origin: 'Bangladesh', weight: 8740, declaredWeight: 8200, value: 1890000, riskScore: 67, lane: 'Orange', status: 'Under Examination', documents: 'Mismatch', officer: 'Priya Sharma', time: '08:31' },
  { id: 'BE2024/ATR/004213', declarant: 'Punjab Agro Commodities', commodity: 'Dry Fruits (HS 0813)', origin: 'Afghanistan via Pakistan', weight: 5200, declaredWeight: 5200, value: 8750000, riskScore: 78, lane: 'Orange', status: 'Physical Check', documents: 'Verified', officer: 'Gurpreet Singh', time: '07:55' },
  { id: 'BE2024/ATR/004214', declarant: 'Sunrise Trading Co', commodity: 'Sports Equipment (HS 9506)', origin: 'Pakistan', weight: 3100, declaredWeight: 3100, value: 650000, riskScore: 45, lane: 'Yellow', status: 'Document Check', documents: 'Pending', officer: 'Mandeep Kaur', time: '08:02' },
  { id: 'BE2024/PTP/001849', declarant: 'Dhaka Spice House', commodity: 'Spices & Condiments (HS 0910)', origin: 'Bangladesh', weight: 12300, declaredWeight: 12300, value: 3200000, riskScore: 18, lane: 'Green', status: 'Cleared', documents: 'Verified', officer: 'Amit Das', time: '07:41' },
  { id: 'BE2024/RXL/002156', declarant: 'Nepal Trading Corporation', commodity: 'Handicrafts (HS 9601)', origin: 'Nepal', weight: 2800, declaredWeight: 2800, value: 1200000, riskScore: 15, lane: 'Green', status: 'Cleared', documents: 'Verified', officer: 'Rajesh Yadav', time: '06:58' },
  { id: 'BE2024/ATR/004215', declarant: 'Frontier Imports', commodity: 'Industrial Machinery (HS 8479)', origin: 'Pakistan', weight: 42000, declaredWeight: 42000, value: 18500000, riskScore: 88, lane: 'Red', status: 'Held — Full Exam', documents: 'Under Review', officer: 'Colonel R. Mehra', time: '06:30' },
  { id: 'BE2024/PTP/001850', declarant: 'Green Valley Agri', commodity: 'Vegetables (HS 0702)', origin: 'Bangladesh', weight: 28000, declaredWeight: 28000, value: 840000, riskScore: 12, lane: 'Green', status: 'Cleared', documents: 'Verified', officer: 'Suresh Kumar', time: '09:05' },
  { id: 'BE2024/PTP/001851', declarant: 'Excel Garments Ltd', commodity: 'Synthetic Fibre (HS 5407)', origin: 'Bangladesh', weight: 9800, declaredWeight: 9200, value: 2100000, riskScore: 55, lane: 'Yellow', status: 'Document Check', documents: 'Mismatch', officer: 'Priya Sharma', time: '09:18' },
  { id: 'BE2024/JNG/000847', declarant: 'Bihar Agro Imports', commodity: 'Jute Products (HS 5303)', origin: 'Nepal', weight: 31000, declaredWeight: 31000, value: 620000, riskScore: 8, lane: 'Green', status: 'Cleared', documents: 'Verified', officer: 'Santosh Prasad', time: '09:30' },
  { id: 'BE2024/ATR/004216', declarant: 'Karachi Leather Works', commodity: 'Leather Goods (HS 4202)', origin: 'Pakistan', weight: 4200, declaredWeight: 4200, value: 3800000, riskScore: 71, lane: 'Orange', status: 'Under Examination', documents: 'Verified', officer: 'Gurpreet Singh', time: '09:45' },
  { id: 'BE2024/PTP/001852', declarant: 'Mega Steel Components', commodity: 'Steel Pipes (HS 7304)', origin: 'Bangladesh', weight: 85000, declaredWeight: 85000, value: 4200000, riskScore: 34, lane: 'Yellow', status: 'Weighbridge Check', documents: 'Verified', officer: 'Amit Das', time: '10:01' },
];

// Risk distribution summary
export const riskDistribution = [
  { name: 'Green (0-30)', value: 487, color: '#4CDC8A' },
  { name: 'Yellow (31-60)', value: 198, color: '#F5C842' },
  { name: 'Orange (61-80)', value: 124, color: '#F5A623' },
  { name: 'Red (81-100)', value: 38,  color: '#F5445A' },
];

// Clearance timeline stages
export const clearanceStages = [
  { stage: 'BE Filed',       duration: 5,  status: 'done'    },
  { stage: 'OCR Verify',     duration: 2,  status: 'done'    },
  { stage: 'Risk Assessment',duration: 1,  status: 'done'    },
  { stage: 'Document Check', duration: 15, status: 'active'  },
  { stage: 'Physical Exam',  duration: 30, status: 'pending' },
  { stage: 'Duty Payment',   duration: 10, status: 'pending' },
  { stage: 'Gate Pass',      duration: 2,  status: 'pending' },
];

// Cargo anomalies
export const cargoAnomalies = [
  {
    id: 1, type: 'Weight Mismatch',
    description: 'BE2024/PTP/001851 — Declared 9.2T, actual 9.8T (+6.5% variance)',
    severity: 'HIGH', time: '09:18', module: 'Cargo',
    action: 'Route to Lane 3 for physical examination. Verify cargo manifest against weighbridge slip.',
    officer: 'Inspector Priya Sharma — Bay 2',
  },
  {
    id: 2, type: 'Value Anomaly',
    description: 'BE2024/ATR/004215 — Machinery value 340% above HS code 8479 average',
    severity: 'CRITICAL', time: '06:35', module: 'Cargo',
    action: 'Full physical examination required. Request valuation certificate from exporter. Notify AC (Customs).',
    officer: 'Colonel R. Mehra — Bay 1',
  },
  {
    id: 3, type: 'Repeat Declarant Flag',
    description: 'Frontier Imports — 3rd consignment flagged in 30 days',
    severity: 'HIGH', time: '06:30', module: 'Cargo',
    action: 'Place declarant on enhanced scrutiny list. Cross-reference with IB records. Notify DRI.',
    officer: 'Inspector Amit Das — Bay 4',
  },
  {
    id: 4, type: 'Route Anomaly',
    description: 'BE2024/ATR/004213 — Unusual routing via Lahore-Wagah for Afghan goods',
    severity: 'MEDIUM', time: '08:02', module: 'Cargo',
    action: 'Verify transit documents and Afghan export certificate. Check against approved trade corridors.',
    officer: 'Inspector Gurpreet Singh — Bay 1',
  },
  {
    id: 5, type: 'Document Inconsistency',
    description: 'BE2024/PTP/001848 — Invoice currency mismatch (BDT vs USD declared)',
    severity: 'MEDIUM', time: '08:35', module: 'Cargo',
    action: 'Request re-submission of commercial invoice in correct currency. Hold clearance pending.',
    officer: 'Inspector Priya Sharma — Bay 2',
  },
];

// Hourly cargo throughput
export const cargoThroughput = [
  { hour: '00:00', cleared: 12, pending: 4,  flagged: 1 },
  { hour: '02:00', cleared: 8,  pending: 3,  flagged: 0 },
  { hour: '04:00', cleared: 5,  pending: 6,  flagged: 2 },
  { hour: '06:00', cleared: 28, pending: 12, flagged: 4 },
  { hour: '08:00', cleared: 87, pending: 34, flagged: 9 },
  { hour: '10:00', cleared: 124,pending: 41, flagged: 8 },
  { hour: '12:00', cleared: 98, pending: 38, flagged: 6 },
  { hour: '14:00', cleared: 112,pending: 29, flagged: 7 },
  { hour: '16:00', cleared: 89, pending: 24, flagged: 5 },
  { hour: '18:00', cleared: 67, pending: 18, flagged: 3 },
  { hour: '20:00', cleared: 34, pending: 9,  flagged: 2 },
  { hour: '22:00', cleared: 18, pending: 6,  flagged: 1 },
];

// Immigration data
export const immigrationRecords = [
  { id: 'IMM-001', passport: 'BD4821567', name: 'Farhan Ahmed',          nationality: 'Bangladeshi', type: 'Tourist',       visa: 'Valid',   riskLevel: 'Low',      status: 'Cleared',        counter: 2, time: '08:12' },
  { id: 'IMM-002', passport: 'IN8734521', name: 'Rajesh Kumar Sharma',   nationality: 'Indian',      type: 'Returning',     visa: 'N/A',     riskLevel: 'Low',      status: 'Cleared',        counter: 1, time: '08:14' },
  { id: 'IMM-003', passport: 'NP2314897', name: 'Deepak Shrestha',       nationality: 'Nepali',      type: 'Worker',        visa: 'Cross-border', riskLevel: 'Low', status: 'Cleared',        counter: 3, time: '08:15' },
  { id: 'IMM-004', passport: 'BD7821340', name: 'Khalid Mohammad Hasan', nationality: 'Bangladeshi', type: 'Business',      visa: 'Valid',   riskLevel: 'Medium',   status: 'Secondary Check',counter: 5, time: '08:22' },
  { id: 'IMM-005', passport: 'PK1982345', name: 'Imran Ali Khan',        nationality: 'Pakistani',   type: 'Transit',       visa: 'Valid',   riskLevel: 'High',     status: 'Held',           counter: 6, time: '08:31' },
  { id: 'IMM-006', passport: 'IN4523871', name: 'Sunita Devi',           nationality: 'Indian',      type: 'Returning',     visa: 'N/A',     riskLevel: 'Low',      status: 'Cleared',        counter: 2, time: '08:33' },
  { id: 'IMM-007', passport: 'BD9031245', name: 'Rina Begum',            nationality: 'Bangladeshi', type: 'Medical',       visa: 'Valid',   riskLevel: 'Low',      status: 'Cleared',        counter: 4, time: '08:38' },
  { id: 'IMM-008', passport: 'CN7654321', name: 'Wang Lei',              nationality: 'Chinese',     type: 'Business',      visa: 'Valid',   riskLevel: 'Medium',   status: 'Document Check', counter: 7, time: '08:44' },
  { id: 'IMM-009', passport: 'BD3214567', name: 'Arif Hossain',          nationality: 'Bangladeshi', type: 'Tourist',       visa: 'EXPIRED', riskLevel: 'Critical', status: 'DETAINED',       counter: 8, time: '08:47' },
  { id: 'IMM-010', passport: 'NP8712345', name: 'Sita Kumari Thapa',     nationality: 'Nepali',      type: 'Cross-border',  visa: 'Valid',   riskLevel: 'Low',      status: 'Cleared',        counter: 1, time: '08:51' },
];

// Queue prediction
export const queuePrediction = [
  { time: '10:00', actual: 287, predicted: 295 },
  { time: '11:00', actual: 312, predicted: 320 },
  { time: '12:00', actual: 298, predicted: 305 },
  { time: '13:00', actual: null, predicted: 275 },
  { time: '14:00', actual: null, predicted: 340 },
  { time: '15:00', actual: null, predicted: 380 },
  { time: '16:00', actual: null, predicted: 420 },
];

// Nationality breakdown
export const nationalityStats = [
  { nationality: 'Bangladeshi', entries: 847, exits: 712, color: '#4A90E2' },
  { nationality: 'Indian',      entries: 623, exits: 589, color: '#4CDC8A' },
  { nationality: 'Nepali',      entries: 412, exits: 398, color: '#F5A623' },
  { nationality: 'Pakistani',   entries: 28,  exits: 24,  color: '#F5C842' },
  { nationality: 'Chinese',     entries: 14,  exits: 11,  color: '#8AB0E0' },
  { nationality: 'Others',      entries: 47,  exits: 39,  color: '#6C7A89' },
];

// Surveillance cameras
export const cameras = [
  { id: 'CAM-001', name: 'Main Gate Entry',       zone: 'Entry Gate',  status: 'active',  alerts: 0, feed: 'nominal'  },
  { id: 'CAM-002', name: 'Cargo Bay 1',            zone: 'Cargo',       status: 'active',  alerts: 1, feed: 'alert'    },
  { id: 'CAM-003', name: 'X-Ray Scanner Zone',     zone: 'Cargo',       status: 'active',  alerts: 0, feed: 'nominal'  },
  { id: 'CAM-004', name: 'Immigration Hall',        zone: 'Immigration', status: 'active',  alerts: 0, feed: 'crowded'  },
  { id: 'CAM-005', name: 'Passenger Waiting Area', zone: 'Immigration', status: 'active',  alerts: 0, feed: 'nominal'  },
  { id: 'CAM-006', name: 'Parking Lot North',      zone: 'Vehicle',     status: 'active',  alerts: 2, feed: 'alert'    },
  { id: 'CAM-007', name: 'Weighbridge Station',    zone: 'Vehicle',     status: 'active',  alerts: 0, feed: 'nominal'  },
  { id: 'CAM-008', name: 'Exit Gate',              zone: 'Exit',        status: 'active',  alerts: 0, feed: 'nominal'  },
  { id: 'CAM-009', name: 'Server Room Corridor',   zone: 'Restricted',  status: 'offline', alerts: 0, feed: 'offline'  },
];

// Security alerts
export const securityAlerts = [
  { id: 'ALT-001', severity: 'CRITICAL', type: 'Watchlist Match',          description: 'Person matching NDAP notice #NW-4821 detected at Immigration Counter 8', camera: 'CAM-004', zone: 'Immigration Counter Hall',    time: '09:47:23', status: 'Active',       assignedTo: 'Inspector R. Verma' },
  { id: 'ALT-002', severity: 'HIGH',     type: 'Unattended Object',         description: 'Unattended bag in Cargo Examination Bay 1 for 7 min 32 sec',             camera: 'CAM-002', zone: 'Cargo Examination Bay 1',     time: '09:41:15', status: 'Active',       assignedTo: 'CISF Team B'        },
  { id: 'ALT-003', severity: 'HIGH',     type: 'Vehicle Anomaly',           description: 'Vehicle TN04AB2341 in no-parking zone outside Restricted Entry — 12 min', camera: 'CAM-006', zone: 'Parking Lot North',          time: '09:38:54', status: 'Active',       assignedTo: 'CISF Team C'        },
  { id: 'ALT-004', severity: 'MEDIUM',   type: 'Restricted Zone Intrusion', description: 'Unauthorized personnel approaching server room corridor',                 camera: 'CAM-009', zone: 'Server Room Corridor',       time: '09:22:08', status: 'Investigating', assignedTo: 'Inspector K. Singh' },
  { id: 'ALT-005', severity: 'MEDIUM',   type: 'Crowd Density Breach',      description: 'Immigration Hall exceeds safe density — 48 persons detected (limit: 40)', camera: 'CAM-004', zone: 'Passenger Waiting Area',     time: '09:15:33', status: 'Monitoring',   assignedTo: 'Duty Officer'       },
  { id: 'ALT-006', severity: 'LOW',      type: 'Camera Offline',            description: 'CAM-009 (Server Room Corridor) offline — last ping 09:19:41',             camera: 'CAM-009', zone: 'Server Room Corridor',       time: '09:19:41', status: 'Maintenance',  assignedTo: 'IT Support'         },
];

// Vehicle data
export const vehicleData = [
  { id: 'VEH-001', plate: 'WB48C9821',  type: 'Truck',   driver: 'Ramesh Mondal',   cargo: 'Cotton Fabric',       declaredWeight: 18420, actualWeight: 18450, riskScore: 22, lane: 2,    status: 'Cleared',                 anpr: 'Matched',      time: '08:14' },
  { id: 'VEH-002', plate: 'PB10AA4523', type: 'Truck',   driver: 'Harpreet Singh',  cargo: 'Industrial Machinery', declaredWeight: 42000, actualWeight: 42100, riskScore: 88, lane: 4,    status: 'Held',                    anpr: 'Matched',      time: '06:30' },
  { id: 'VEH-003', plate: 'UP78BT2341', type: 'Trailer', driver: 'Raju Verma',      cargo: 'Steel Pipes',          declaredWeight: 85000, actualWeight: 92800, riskScore: 34, lane: 3,    status: 'Overloaded — Hold',        anpr: 'Matched',      time: '10:01' },
  { id: 'VEH-004', plate: 'WB23D7841',  type: 'Truck',   driver: 'Subhash Biswas',  cargo: 'Vegetables',           declaredWeight: 28000, actualWeight: 27900, riskScore: 12, lane: 1,    status: 'Cleared',                 anpr: 'Matched',      time: '09:05' },
  { id: 'VEH-005', plate: 'BR15AA8921', type: 'Truck',   driver: 'Manoj Kumar',     cargo: 'Jute Products',        declaredWeight: 31000, actualWeight: 31000, riskScore: 8,  lane: 1,    status: 'Cleared',                 anpr: 'Matched',      time: '09:30' },
  { id: 'VEH-006', plate: 'TN04AB2341', type: 'SUV',     driver: 'Unknown',         cargo: 'Personal',             declaredWeight: 0,     actualWeight: 0,     riskScore: 92, lane: null, status: 'FLAGGED — No Appointment', anpr: 'No TAS Record',time: '09:38' },
  { id: 'VEH-007', plate: 'DL3CAA7821', type: 'Truck',   driver: 'Narayan Gupta',   cargo: 'Dry Fruits',           declaredWeight: 5200,  actualWeight: 5240,  riskScore: 78, lane: 3,    status: 'Physical Check',          anpr: 'Matched',      time: '07:55' },
  { id: 'VEH-008', plate: 'WB32E4512',  type: 'Truck',   driver: 'Tarun Ghosh',     cargo: 'Spices',               declaredWeight: 12300, actualWeight: 12310, riskScore: 18, lane: 1,    status: 'Cleared',                 anpr: 'Matched',      time: '07:41' },
];

// Traffic flow prediction
export const trafficFlow = [
  { hour: '06:00', actual: 12,  predicted: 10  },
  { hour: '07:00', actual: 28,  predicted: 25  },
  { hour: '08:00', actual: 67,  predicted: 70  },
  { hour: '09:00', actual: 89,  predicted: 85  },
  { hour: '10:00', actual: 94,  predicted: 90  },
  { hour: '11:00', actual: null, predicted: 110 },
  { hour: '12:00', actual: null, predicted: 95  },
  { hour: '13:00', actual: null, predicted: 88  },
  { hour: '14:00', actual: null, predicted: 102 },
];

// Lane status
export const laneStatus = [
  { id: 1, name: 'Lane 1 — Green',  type: 'Green',  queue: 3, capacity: 8, status: 'normal'     },
  { id: 2, name: 'Lane 2 — Yellow', type: 'Yellow', queue: 6, capacity: 8, status: 'normal'     },
  { id: 3, name: 'Lane 3 — Orange', type: 'Orange', queue: 7, capacity: 8, status: 'busy'       },
  { id: 4, name: 'Lane 4 — Red',    type: 'Red',    queue: 2, capacity: 4, status: 'restricted' },
];

// Multi-ICP overview — clearanceAvg in minutes (realistic FY23-24 figures)
export const icpOverview = [
  { id: 'PTP', name: 'Petrapole',     state: 'West Bengal',    cargoToday: 847, cleared: 612, pending: 198, flagged: 37, vehicles: 543, crossings: 2341, alerts: 3, clearanceAvg: 142, status: 'operational' },
  { id: 'ATR', name: 'Attari',        state: 'Punjab',          cargoToday: 423, cleared: 287, pending: 112, flagged: 24, vehicles: 312, crossings: 892,  alerts: 7, clearanceAvg: 89,  status: 'operational' },
  { id: 'RXL', name: 'Raxaul',        state: 'Bihar',           cargoToday: 312, cleared: 248, pending: 54,  flagged: 10, vehicles: 298, crossings: 1234, alerts: 1, clearanceAvg: 67,  status: 'operational' },
  { id: 'JNG', name: 'Jogbani',       state: 'Bihar',           cargoToday: 187, cleared: 165, pending: 22,  flagged: 0,  vehicles: 187, crossings: 678,  alerts: 0, clearanceAvg: 71,  status: 'operational' },
  { id: 'SKL', name: 'Sunauli',       state: 'Uttar Pradesh',   cargoToday: 234, cleared: 198, pending: 31,  flagged: 5,  vehicles: 241, crossings: 987,  alerts: 2, clearanceAvg: 78,  status: 'operational' },
  { id: 'MRK', name: 'Moreh',         state: 'Manipur',         cargoToday: 98,  cleared: 61,  pending: 27,  flagged: 10, vehicles: 89,  crossings: 312,  alerts: 4, clearanceAvg: 118, status: 'degraded'    },
  { id: 'CHB', name: 'Changrabandha', state: 'West Bengal',     cargoToday: 45,  cleared: 41,  pending: 4,   flagged: 0,  vehicles: 43,  crossings: 312,  alerts: 0, clearanceAvg: 63,  status: 'operational' },
  { id: 'AGT', name: 'Agartala',      state: 'Tripura',         cargoToday: 178, cleared: 154, pending: 23,  flagged: 1,  vehicles: 167, crossings: 843,  alerts: 1, clearanceAvg: 54,  status: 'operational' },
  { id: 'DWK', name: 'Dawki',         state: 'Meghalaya',       cargoToday: 112, cleared: 98,  pending: 14,  flagged: 0,  vehicles: 108, crossings: 421,  alerts: 0, clearanceAvg: 82,  status: 'operational' },
  { id: 'HLP', name: 'Hili',          state: 'West Bengal',     cargoToday: 143, cleared: 121, pending: 22,  flagged: 0,  vehicles: 138, crossings: 567,  alerts: 0, clearanceAvg: 93,  status: 'operational' },
  { id: 'GHP', name: 'Ghojadanga',    state: 'West Bengal',     cargoToday: 0,   cleared: 0,   pending: 0,   flagged: 0,  vehicles: 0,   crossings: 0,    alerts: 0, clearanceAvg: 0,   status: 'maintenance' },
  { id: 'KRP', name: 'Karimpasa',     state: 'Assam',           cargoToday: 89,  cleared: 74,  pending: 14,  flagged: 1,  vehicles: 84,  crossings: 312,  alerts: 1, clearanceAvg: 76,  status: 'operational' },
];

// Trade flow — realistic FY23-24 LPAI figures (Crore ₹/month)
// Bangladesh dominates (~43% of total); Nepal second; Pakistan trade near-zero post-2019
export const tradeFlow = [
  { month: 'Nov', Bangladesh: 2520, Nepal: 2140, Pakistan: 95,  Myanmar: 42,  Bhutan: 148, Others: 68  },
  { month: 'Dec', Bangladesh: 3180, Nepal: 2460, Pakistan: 78,  Myanmar: 31,  Bhutan: 162, Others: 74  },
  { month: 'Jan', Bangladesh: 2840, Nepal: 2290, Pakistan: 112, Myanmar: 58,  Bhutan: 134, Others: 61  },
  { month: 'Feb', Bangladesh: 3050, Nepal: 2380, Pakistan: 67,  Myanmar: 44,  Bhutan: 156, Others: 72  },
  { month: 'Mar', Bangladesh: 3420, Nepal: 2710, Pakistan: 103, Myanmar: 71,  Bhutan: 178, Others: 84  },
  { month: 'Apr', Bangladesh: 3290, Nepal: 2580, Pakistan: 88,  Myanmar: 53,  Bhutan: 169, Others: 79  },
];

// AI insights
export const aiInsights = [
  {
    id: 1,
    title: 'Cargo Volume Spike Detected — Petrapole',
    summary: 'Garment consignments from Bangladesh have increased 34% over 3 days; 6 of 12 flagged for weight variance. Intelligence correlation with pre-festive season is low — recommend enhanced physical examination of HS 6204 consignments for next 48 hours.',
    category: 'Cargo',
    priority: 'HIGH',
    time: '06:30',
    confidence: 89,
  },
  {
    id: 2,
    title: 'Overstay Pattern — Bangladeshi Tourists',
    summary: '14 Bangladeshi tourist visa holders who entered via Petrapole (01–07 Nov) have not recorded exit. Cross-referencing with Bureau of Immigration suggests 4 may have exited via alternative airports. Recommend verification and advisory to state police.',
    category: 'Immigration',
    priority: 'MEDIUM',
    time: '05:45',
    confidence: 76,
  },
  {
    id: 3,
    title: 'ANPR Anomaly — Repeat Plate at Attari',
    summary: 'Vehicle matching PK transit plate DL3C**-series detected on 3 occasions in 5 days without corresponding cargo declarations. Possible identification forgery or RFID cloning — recommend physical detention and NCRB lookup on next appearance.',
    category: 'Vehicle',
    priority: 'HIGH',
    time: '04:12',
    confidence: 82,
  },
  {
    id: 4,
    title: 'Peak Hour Forecast — Counter Staffing',
    summary: 'LSTM model predicts 23% above-average crossings between 14:00–17:00 today at Petrapole, likely linked to Eid travel. Recommend activating 3 additional immigration counters (currently 5 of 8 active) by 13:30 to maintain sub-10-minute processing time.',
    category: 'Analytics',
    priority: 'LOW',
    time: '07:00',
    confidence: 91,
  },
];

// Performance benchmarking — realistic clearance times in minutes
export const icpPerformance = [
  { name: 'Raxaul',    clearanceTime: 67,  detectionRate: 92, accuracy: 97, score: 91 },
  { name: 'Agartala',  clearanceTime: 54,  detectionRate: 90, accuracy: 96, score: 89 },
  { name: 'Petrapole', clearanceTime: 142, detectionRate: 95, accuracy: 98, score: 88 },
  { name: 'Jogbani',   clearanceTime: 71,  detectionRate: 88, accuracy: 95, score: 86 },
  { name: 'Attari',    clearanceTime: 89,  detectionRate: 91, accuracy: 94, score: 82 },
  { name: 'Moreh',     clearanceTime: 118, detectionRate: 82, accuracy: 89, score: 74 },
];

// Duty revenue (₹ Lakhs)
export const dutyRevenue = [
  { month: 'Oct', collected: 8420,  target: 8000  },
  { month: 'Nov', collected: 9180,  target: 8500  },
  { month: 'Dec', collected: 11240, target: 9000  },
  { month: 'Jan', collected: 8890,  target: 9000  },
  { month: 'Feb', collected: 9640,  target: 9500  },
  { month: 'Mar', collected: 12100, target: 10000 },
  { month: 'Apr', collected: 10840, target: 10500 },
];

// Helper: get overview data for a specific ICP
export function getICPData(icpId) {
  return icpOverview.find(i => i.id === icpId) || icpOverview[0];
}
