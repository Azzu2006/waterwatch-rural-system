// Realistic Rural Demonstration Data for WaterWatch System
// NOTE: Clearly marked as Demonstration Data for College CSP / Academic Project evaluation.

export const DEMO_NOTICE = {
  isDemo: true,
  disclaimer: "DEMONSTRATION DATA: This portal displays realistic simulation data for academic evaluation of the WaterWatch Rural Water Governance System. Values reflect Indian Standard (IS 10500:2012) benchmarks.",
  lastSync: "2026-11-20T10:30:00Z"
};

export const INITIAL_VILLAGES = [
  { id: 'VIL-01', name: 'Rampur', mandal: 'Kothapalli', district: 'Chittoor', population: 3420, activeSources: 8, jalMitra: 'K. Narayana (9849123450)' },
  { id: 'VIL-02', name: 'Krishnapuram', mandal: 'Kothapalli', district: 'Chittoor', population: 2180, activeSources: 5, jalMitra: 'P. Lakshmi (9849234561)' },
  { id: 'VIL-03', name: 'Chandanagar Rural', mandal: 'Chandragiri', district: 'Tirupati', population: 4890, activeSources: 11, jalMitra: 'S. Ramu (9849345672)' },
  { id: 'VIL-04', name: 'Gollapalli', mandal: 'Chandragiri', district: 'Tirupati', population: 1750, activeSources: 4, jalMitra: 'M. Venkat (9849456783)' },
  { id: 'VIL-05', name: 'Venkatapuram', mandal: 'Pakala', district: 'Tirupati', population: 3100, activeSources: 7, jalMitra: 'A. Subbaiah (9849567894)' },
  { id: 'VIL-06', name: 'Anantharajupalem', mandal: 'Pakala', district: 'Tirupati', population: 2640, activeSources: 6, jalMitra: 'T. Sarada (9849678905)' }
];

export const INITIAL_SOURCES = [
  {
    id: 'SRC-01',
    name: 'Panchayat Community RO Plant',
    village: 'Rampur',
    type: 'RO Plant',
    lat: 13.6288,
    lng: 79.4192,
    depthMeters: 120,
    installYear: 2021,
    status: 'Safe',
    qualityScore: 94,
    lastTested: '2026-11-18',
    ph: 7.2,
    tds: 180,
    turbidity: 0.6,
    smell: 'None',
    color: 'Clear',
    capacityLPD: 10000,
    operator: 'Rampur Gram Panchayat'
  },
  {
    id: 'SRC-02',
    name: 'North Colony Deep Borewell #2',
    village: 'Rampur',
    type: 'Borewell',
    lat: 13.6335,
    lng: 79.4230,
    depthMeters: 185,
    installYear: 2019,
    status: 'Moderate Risk',
    qualityScore: 72,
    lastTested: '2026-11-15',
    ph: 7.9,
    tds: 640,
    turbidity: 2.8,
    smell: 'None',
    color: 'Clear',
    capacityLPD: 25000,
    operator: 'RWSS Division'
  },
  {
    id: 'SRC-03',
    name: 'ZPH School Drinking Water Standpost',
    village: 'Krishnapuram',
    type: 'Community Tap',
    lat: 13.6190,
    lng: 79.3950,
    depthMeters: 0,
    installYear: 2022,
    status: 'Safe',
    qualityScore: 91,
    lastTested: '2026-11-19',
    ph: 7.4,
    tds: 290,
    turbidity: 1.1,
    smell: 'None',
    color: 'Clear',
    capacityLPD: 8000,
    operator: 'Jal Jeevan Mission Committee'
  },
  {
    id: 'SRC-04',
    name: 'Harijanawada Open Sanitary Well',
    village: 'Gollapalli',
    type: 'Open Well',
    lat: 13.6050,
    lng: 79.4310,
    depthMeters: 18,
    installYear: 2010,
    status: 'Unsafe',
    qualityScore: 42,
    lastTested: '2026-11-12',
    ph: 8.6,
    tds: 1120,
    turbidity: 6.4,
    smell: 'Earthy / Sulphur',
    color: 'Brownish/Muddy',
    capacityLPD: 5000,
    operator: 'Gram Panchayat (Chlorination Pending)'
  },
  {
    id: 'SRC-05',
    name: 'Main Market Solar Multi-Tap Stand',
    village: 'Chandanagar Rural',
    type: 'Solar Borewell',
    lat: 13.6450,
    lng: 79.4420,
    depthMeters: 150,
    installYear: 2023,
    status: 'Safe',
    qualityScore: 96,
    lastTested: '2026-11-17',
    ph: 7.1,
    tds: 210,
    turbidity: 0.8,
    smell: 'None',
    color: 'Clear',
    capacityLPD: 18000,
    operator: 'Chandanagar WUA'
  },
  {
    id: 'SRC-06',
    name: 'Bypass Road Hand Pump #4',
    village: 'Venkatapuram',
    type: 'Hand Pump',
    lat: 13.5920,
    lng: 79.3800,
    depthMeters: 45,
    installYear: 2017,
    status: 'Moderate Risk',
    qualityScore: 68,
    lastTested: '2026-11-14',
    ph: 6.7,
    tds: 710,
    turbidity: 3.2,
    smell: 'Metallic',
    color: 'Light Yellow',
    capacityLPD: 4000,
    operator: 'Rural Development Board'
  }
];

export const INITIAL_COMPLAINTS = [
  {
    id: 'WW-2026-8812-LK',
    village: 'Rampur',
    ward: 'Ward 3, Near Bus Stand',
    landmark: 'Behind Old Shiva Temple',
    issueType: 'Pipeline Leakage',
    severity: 'High',
    description: 'Major underground pipe burst leaking approx 500L/hr on main road. Water flooding into road gutter.',
    reporterName: 'K. Ramesh Babu',
    reporterPhone: '9849011223',
    status: 'In Progress',
    createdAt: '2026-11-19T08:30:00Z',
    assignedTo: 'M. Prabhakar (Assistant Engineer - RWSS)',
    assignedPhone: '9440188220',
    resolutionNotes: 'Inspection completed. Clamp replacement parts dispatched with lineman team.',
    timeline: [
      { status: 'Submitted', timestamp: '2026-11-19T08:30:00Z', note: 'Complaint logged via WaterWatch Citizen Portal.' },
      { status: 'Under Inspection', timestamp: '2026-11-19T10:15:00Z', note: 'Verified by Village Jal Mitra. Forwarded to RWSS Division.' },
      { status: 'In Progress', timestamp: '2026-11-19T14:40:00Z', note: 'Excavation team on-site. Valve isolated to stop water loss.' }
    ]
  },
  {
    id: 'WW-2026-6734-WQ',
    village: 'Gollapalli',
    ward: 'SC Colony, Street 2',
    landmark: 'Opposite Anganwadi Centre',
    issueType: 'Contaminated Water',
    severity: 'Emergency',
    description: 'Tap water is muddy brownish with strong rotten egg smell for the past 2 days. Children complaining of stomach ache.',
    reporterName: 'S. Renuka',
    reporterPhone: '9988776655',
    status: 'Under Inspection',
    createdAt: '2026-11-20T06:45:00Z',
    assignedTo: 'Dr. C. Madhavi (Medical Officer / Water Health Incharge)',
    assignedPhone: '9440199331',
    resolutionNotes: 'Bleaching powder dispatched for emergency well shock chlorination. Testing kit sent.',
    timeline: [
      { status: 'Submitted', timestamp: '2026-11-20T06:45:00Z', note: 'Urgent health hazard logged by citizen.' },
      { status: 'Under Inspection', timestamp: '2026-11-20T08:00:00Z', note: 'Health supervisor notified. Emergency notice issued to stop drinking untreated water.' }
    ]
  },
  {
    id: 'WW-2026-4421-PR',
    village: 'Krishnapuram',
    ward: 'East Madha Street',
    landmark: 'Near Water Tank Tower',
    issueType: 'Low Water Pressure',
    severity: 'Medium',
    description: 'Tail-end houses not getting water during morning schedule. Supply lasts only 15 minutes with trickle pressure.',
    reporterName: 'G. Venkateswarlu',
    reporterPhone: '9701234567',
    status: 'Resolved',
    createdAt: '2026-11-17T09:10:00Z',
    assignedTo: 'T. Prasad (Lineman)',
    assignedPhone: '9849312345',
    resolutionNotes: 'Air lock cleared in 3-inch distribution line. Distribution valve balanced. Normal pressure restored.',
    timeline: [
      { status: 'Submitted', timestamp: '2026-11-17T09:10:00Z', note: 'Complaint logged.' },
      { status: 'Under Inspection', timestamp: '2026-11-17T11:00:00Z', note: 'Lineman inspected pressure gauge at end post.' },
      { status: 'In Progress', timestamp: '2026-11-18T07:00:00Z', note: 'Air release valve flushed and serviced.' },
      { status: 'Resolved', timestamp: '2026-11-18T10:30:00Z', note: 'Citizen confirmed adequate tap pressure. Ticket closed.' }
    ]
  },
  {
    id: 'WW-2026-3190-OV',
    village: 'Chandanagar Rural',
    ward: 'Panchayat Office Road',
    landmark: 'Overhead Tank Complex',
    issueType: 'Tank Overflow Wastage',
    severity: 'Medium',
    description: 'Overhead reservoir overflowing for over an hour every morning because automatic float switch is broken.',
    reporterName: 'V. Anand Kumar',
    reporterPhone: '9440556677',
    status: 'Resolved',
    createdAt: '2026-11-16T07:15:00Z',
    assignedTo: 'M. Prabhakar (Assistant Engineer)',
    assignedPhone: '9440188220',
    resolutionNotes: 'Automatic magnetic level sensor replaced. Overflow halted.',
    timeline: [
      { status: 'Submitted', timestamp: '2026-11-16T07:15:00Z', note: 'Logged with photo evidence.' },
      { status: 'In Progress', timestamp: '2026-11-16T12:00:00Z', note: 'Sensor requisitioned.' },
      { status: 'Resolved', timestamp: '2026-11-16T16:00:00Z', note: 'Sensor installed and tested. Closed.' }
    ]
  }
];

export const INITIAL_SCHEDULES = [
  {
    id: 'SCH-01',
    village: 'Rampur',
    zone: 'East & North Colony',
    morningWindow: '06:00 AM – 08:00 AM',
    eveningWindow: '06:00 PM – 07:30 PM',
    status: 'Active',
    pressureLevel: 'Normal (1.8 Bar)',
    tankCapacityPercent: 88,
    operator: 'B. Chinnaiah (Lineman)',
    phone: '9848112244',
    announcement: 'Regular supply operational. Chlorine dosing: 0.4 ppm maintained.'
  },
  {
    id: 'SCH-02',
    village: 'Rampur',
    zone: 'South Harijanawada & B.C. Colony',
    morningWindow: '08:00 AM – 09:30 AM',
    eveningWindow: '07:30 PM – 08:30 PM',
    status: 'Active',
    pressureLevel: 'Normal (1.6 Bar)',
    tankCapacityPercent: 74,
    operator: 'B. Chinnaiah (Lineman)',
    phone: '9848112244',
    announcement: 'Supply staggered to maintain tail-end pressure.'
  },
  {
    id: 'SCH-03',
    village: 'Krishnapuram',
    zone: 'All Wards (Gramam)',
    morningWindow: '06:30 AM – 08:30 AM',
    eveningWindow: '05:30 PM – 07:00 PM',
    status: 'Active',
    pressureLevel: 'Good (2.0 Bar)',
    tankCapacityPercent: 92,
    operator: 'P. Govindappa',
    phone: '9441223344',
    announcement: 'Gravity feeder line cleaned. Water flow steady.'
  },
  {
    id: 'SCH-04',
    village: 'Chandanagar Rural',
    zone: 'Market & Main Road Habitations',
    morningWindow: '06:00 AM – 07:45 AM',
    eveningWindow: '06:30 PM – 08:00 PM',
    status: 'Active',
    pressureLevel: 'Normal (1.7 Bar)',
    tankCapacityPercent: 80,
    operator: 'K. Subrahmanyam',
    phone: '9440998877',
    announcement: 'RO Plant dispensing water from 07:00 AM to 08:00 PM.'
  },
  {
    id: 'SCH-05',
    village: 'Gollapalli',
    zone: 'Main Gram Panchayat Habitation',
    morningWindow: '07:00 AM – 08:30 AM',
    eveningWindow: 'Alternate Days (06:00 PM)',
    status: 'Maintenance Notice',
    pressureLevel: 'Low (0.9 Bar)',
    tankCapacityPercent: 45,
    operator: 'M. Venkat',
    phone: '9849456783',
    announcement: 'NOTICE: Booster pump bearing replacement underway today. Evening supply delayed by 1 hour.'
  },
  {
    id: 'SCH-06',
    village: 'Venkatapuram',
    zone: 'All Sectors',
    morningWindow: '06:00 AM – 08:00 AM',
    eveningWindow: '06:00 PM – 07:30 PM',
    status: 'Active',
    pressureLevel: 'Normal (1.5 Bar)',
    tankCapacityPercent: 68,
    operator: 'A. Subbaiah',
    phone: '9849567894',
    announcement: 'Periodic bleaching powder dosing scheduled for Saturday.'
  }
];

export const INITIAL_QUALITY_REPORTS = [
  {
    id: 'WQR-101',
    sourceName: 'Panchayat Community RO Plant',
    village: 'Rampur',
    testedAt: '2026-11-18',
    testedBy: 'K. Narayana (Jal Mitra)',
    ph: 7.2,
    tds: 180,
    turbidity: 0.6,
    smell: 'None',
    color: 'Clear',
    chlorineResidual: 0.2,
    verdict: 'Safe for Drinking',
    wqi: 94,
    labCertified: true,
    remarks: 'Complies with all IS 10500:2012 parameters. Safe for direct consumption.'
  },
  {
    id: 'WQR-102',
    sourceName: 'North Colony Deep Borewell #2',
    village: 'Rampur',
    testedAt: '2026-11-15',
    testedBy: 'District Mobile Testing Van #3',
    ph: 7.9,
    tds: 640,
    turbidity: 2.8,
    smell: 'None',
    color: 'Clear',
    chlorineResidual: 0.0,
    verdict: 'Requires Boiling / Filtration',
    wqi: 72,
    labCertified: true,
    remarks: 'Moderate hardness and TDS. Safe for bathing/cooking; recommended to boil or filter before drinking.'
  },
  {
    id: 'WQR-103',
    sourceName: 'ZPH School Drinking Water Standpost',
    village: 'Krishnapuram',
    testedAt: '2026-11-19',
    testedBy: 'School Science Teacher & Jal Mitra',
    ph: 7.4,
    tds: 290,
    turbidity: 1.1,
    smell: 'None',
    color: 'Clear',
    chlorineResidual: 0.3,
    verdict: 'Safe for Drinking',
    wqi: 91,
    labCertified: true,
    remarks: 'Field testing kit (FTK) chemical and bacteriological strip negative. Good quality.'
  },
  {
    id: 'WQR-104',
    sourceName: 'Harijanawada Open Sanitary Well',
    village: 'Gollapalli',
    testedAt: '2026-11-12',
    testedBy: 'M. Venkat (Jal Mitra)',
    ph: 8.6,
    tds: 1120,
    turbidity: 6.4,
    smell: 'Earthy / Sulphur',
    color: 'Brownish/Muddy',
    chlorineResidual: 0.0,
    verdict: 'Unsafe for Human Consumption',
    wqi: 42,
    labCertified: false,
    remarks: 'Turbidity exceeds 5 NTU limit. Coliform risk high due to surface runoff. Shock chlorination required immediately.'
  }
];

export const INITIAL_SURVEYS = [
  {
    id: 'SRV-01',
    village: 'Rampur',
    respondent: 'B. Krishna Reddy',
    familySize: 5,
    primarySource: 'Piped Tap Water (Har Ghar Jal)',
    dailyHours: '3 - 4 Hours',
    distanceMeters: 0,
    waterClarity: 'Clear',
    tasteRating: 5,
    reliabilityRating: 4,
    facingShortage: 'Rarely',
    feedback: 'Piped supply is clean and regular. Very helpful for family.',
    submittedAt: '2026-11-18T11:20:00Z'
  },
  {
    id: 'SRV-02',
    village: 'Gollapalli',
    respondent: 'K. Rajeshwari',
    familySize: 6,
    primarySource: 'Community Borewell',
    dailyHours: '1 - 2 Hours',
    distanceMeters: 250,
    waterClarity: 'Slightly Muddy',
    tasteRating: 2,
    reliabilityRating: 2,
    facingShortage: 'Often during summer',
    feedback: 'Need dedicated RO plant or pipeline extension to street 2.',
    submittedAt: '2026-11-19T14:45:00Z'
  },
  {
    id: 'SRV-03',
    village: 'Chandanagar Rural',
    respondent: 'P. Someswara Rao',
    familySize: 4,
    primarySource: 'RO Water ATM / Plant',
    dailyHours: '8+ Hours',
    distanceMeters: 100,
    waterClarity: 'Clear',
    tasteRating: 5,
    reliabilityRating: 5,
    facingShortage: 'Never',
    feedback: 'RO can card system works well. Water is sweet.',
    submittedAt: '2026-11-19T16:10:00Z'
  },
  {
    id: 'SRV-04',
    village: 'Krishnapuram',
    respondent: 'Y. Jayamma',
    familySize: 5,
    primarySource: 'Piped Tap Water',
    dailyHours: '2 - 3 Hours',
    distanceMeters: 10,
    waterClarity: 'Clear',
    tasteRating: 4,
    reliabilityRating: 4,
    facingShortage: 'Rarely',
    feedback: 'Timing alert SMS or loudspeaker announcement would help us store water on time.',
    submittedAt: '2026-11-20T09:05:00Z'
  }
];

// Water Standards (BIS 10500:2012 Drinking Water Specification)
export const BIS_STANDARDS = {
  ph: { min: 6.5, max: 8.5, ideal: 7.2, unit: '' },
  tds: { desirable: 500, maxPermissible: 2000, ideal: 250, unit: 'mg/L (ppm)' },
  turbidity: { desirable: 1.0, maxPermissible: 5.0, unit: 'NTU' },
  freeChlorine: { min: 0.2, max: 0.5, unit: 'mg/L' }
};
