// LocalStorage + In-Memory Fallback Persistence Layer for WaterWatch
import {
  INITIAL_VILLAGES,
  INITIAL_SOURCES,
  INITIAL_COMPLAINTS,
  INITIAL_SCHEDULES,
  INITIAL_QUALITY_REPORTS,
  INITIAL_SURVEYS
} from '../data/initialData';

const STORAGE_KEYS = {
  VILLAGES: 'waterwatch_villages_v1',
  SOURCES: 'waterwatch_sources_v1',
  COMPLAINTS: 'waterwatch_complaints_v1',
  SCHEDULES: 'waterwatch_schedules_v1',
  QUALITY_REPORTS: 'waterwatch_quality_reports_v1',
  SURVEYS: 'waterwatch_surveys_v1',
  SETTINGS: 'waterwatch_settings_v1'
};

// Memory fallback if localStorage is disabled or restricted
const memoryStore = {};

function safeGet(key, defaultVal) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
    }
  } catch (err) {
    console.warn(`localStorage read error for ${key}:`, err);
  }
  return memoryStore[key] !== undefined ? memoryStore[key] : defaultVal;
}

function safeSet(key, value) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (err) {
    console.warn(`localStorage write error for ${key}:`, err);
  }
  memoryStore[key] = value;
  // Dispatch a custom event so other components can sync in real-time
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('waterwatch_db_updated', { detail: { key } }));
  }
}

// Initialize default data if not already set
export function initDB() {
  if (!safeGet(STORAGE_KEYS.VILLAGES, null)) {
    safeSet(STORAGE_KEYS.VILLAGES, INITIAL_VILLAGES);
  }
  if (!safeGet(STORAGE_KEYS.SOURCES, null)) {
    safeSet(STORAGE_KEYS.SOURCES, INITIAL_SOURCES);
  }
  if (!safeGet(STORAGE_KEYS.COMPLAINTS, null)) {
    safeSet(STORAGE_KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
  }
  if (!safeGet(STORAGE_KEYS.SCHEDULES, null)) {
    safeSet(STORAGE_KEYS.SCHEDULES, INITIAL_SCHEDULES);
  }
  if (!safeGet(STORAGE_KEYS.QUALITY_REPORTS, null)) {
    safeSet(STORAGE_KEYS.QUALITY_REPORTS, INITIAL_QUALITY_REPORTS);
  }
  if (!safeGet(STORAGE_KEYS.SURVEYS, null)) {
    safeSet(STORAGE_KEYS.SURVEYS, INITIAL_SURVEYS);
  }
}

// Reset database to initial demo state
export function resetDemoData() {
  safeSet(STORAGE_KEYS.VILLAGES, INITIAL_VILLAGES);
  safeSet(STORAGE_KEYS.SOURCES, INITIAL_SOURCES);
  safeSet(STORAGE_KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
  safeSet(STORAGE_KEYS.SCHEDULES, INITIAL_SCHEDULES);
  safeSet(STORAGE_KEYS.QUALITY_REPORTS, INITIAL_QUALITY_REPORTS);
  safeSet(STORAGE_KEYS.SURVEYS, INITIAL_SURVEYS);
  return true;
}

// --- CRUD OPERATIONS ---

// 1. Villages
export function getVillages() {
  return safeGet(STORAGE_KEYS.VILLAGES, INITIAL_VILLAGES);
}

// 2. Water Sources
export function getWaterSources() {
  return safeGet(STORAGE_KEYS.SOURCES, INITIAL_SOURCES);
}

export function addWaterSource(source) {
  const sources = getWaterSources();
  const newSource = {
    ...source,
    id: source.id || `SRC-${Date.now().toString().slice(-4)}`
  };
  sources.unshift(newSource);
  safeSet(STORAGE_KEYS.SOURCES, sources);
  return newSource;
}

// 3. Complaints
export function getComplaints() {
  return safeGet(STORAGE_KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
}

export function getComplaintById(id) {
  const complaints = getComplaints();
  const cleanId = (id || '').trim().toUpperCase();
  return complaints.find(c => c.id.toUpperCase() === cleanId) || null;
}

export function searchComplaintsByPhone(phone) {
  const complaints = getComplaints();
  const cleanPhone = (phone || '').replace(/\D/g, '');
  if (!cleanPhone || cleanPhone.length < 4) return [];
  return complaints.filter(c => (c.reporterPhone || '').includes(cleanPhone));
}

export function addComplaint(complaintData) {
  const complaints = getComplaints();
  
  // Format code based on issue type: LK = Leakage, WQ = Water Quality, PR = Pressure, OT = Other
  let typeCode = 'OT';
  const t = (complaintData.issueType || '').toLowerCase();
  if (t.includes('leak')) typeCode = 'LK';
  else if (t.includes('contamin') || t.includes('quality') || t.includes('smell')) typeCode = 'WQ';
  else if (t.includes('pressure') || t.includes('low') || t.includes('no water')) typeCode = 'PR';
  else if (t.includes('overflow') || t.includes('tank')) typeCode = 'OV';

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const generatedId = `WW-2026-${randomNum}-${typeCode}`;

  const newComplaint = {
    id: generatedId,
    village: complaintData.village,
    ward: complaintData.ward || 'Main Ward',
    landmark: complaintData.landmark || 'Panchayat Center',
    issueType: complaintData.issueType || 'General Grievance',
    severity: complaintData.severity || 'Medium',
    description: complaintData.description,
    reporterName: complaintData.reporterName,
    reporterPhone: complaintData.reporterPhone,
    photoData: complaintData.photoData || null,
    status: 'Submitted',
    createdAt: new Date().toISOString(),
    assignedTo: 'RWSS Division Cell',
    assignedPhone: '1800-425-5555',
    resolutionNotes: 'Ticket registered. Dispatching village jal mitra for initial field verification.',
    timeline: [
      {
        status: 'Submitted',
        timestamp: new Date().toISOString(),
        note: 'Complaint registered by citizen through WaterWatch Smart Portal.'
      }
    ]
  };

  complaints.unshift(newComplaint);
  safeSet(STORAGE_KEYS.COMPLAINTS, complaints);
  return newComplaint;
}

export function updateComplaintStatus(id, newStatus, assignedTo, resolutionNote) {
  const complaints = getComplaints();
  const index = complaints.findIndex(c => c.id === id);
  if (index === -1) return null;

  const current = complaints[index];
  const updatedTimeline = [...(current.timeline || [])];
  
  if (newStatus !== current.status || resolutionNote) {
    updatedTimeline.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      note: resolutionNote || `Status updated to ${newStatus} by administrative officer.`
    });
  }

  const updatedComplaint = {
    ...current,
    status: newStatus,
    assignedTo: assignedTo || current.assignedTo,
    resolutionNotes: resolutionNote || current.resolutionNotes,
    timeline: updatedTimeline,
    updatedAt: new Date().toISOString()
  };

  complaints[index] = updatedComplaint;
  safeSet(STORAGE_KEYS.COMPLAINTS, complaints);
  return updatedComplaint;
}

// 4. Schedules
export function getSchedules() {
  return safeGet(STORAGE_KEYS.SCHEDULES, INITIAL_SCHEDULES);
}

export function addSchedule(scheduleData) {
  const schedules = getSchedules();
  const newSchedule = {
    ...scheduleData,
    id: `SCH-${(schedules.length + 1).toString().padStart(2, '0')}`
  };
  schedules.unshift(newSchedule);
  safeSet(STORAGE_KEYS.SCHEDULES, schedules);
  return newSchedule;
}

export function updateSchedule(id, updatedFields) {
  const schedules = getSchedules();
  const index = schedules.findIndex(s => s.id === id);
  if (index === -1) return null;

  schedules[index] = { ...schedules[index], ...updatedFields };
  safeSet(STORAGE_KEYS.SCHEDULES, schedules);
  return schedules[index];
}

// 5. Water Quality Reports
export function getQualityReports() {
  return safeGet(STORAGE_KEYS.QUALITY_REPORTS, INITIAL_QUALITY_REPORTS);
}

export function addQualityReport(reportData) {
  const reports = getQualityReports();
  const newReport = {
    id: `WQR-${Math.floor(100 + Math.random() * 900)}`,
    ...reportData,
    testedAt: reportData.testedAt || new Date().toISOString().split('T')[0]
  };
  reports.unshift(newReport);
  safeSet(STORAGE_KEYS.QUALITY_REPORTS, reports);
  return newReport;
}

// 6. Surveys
export function getSurveys() {
  return safeGet(STORAGE_KEYS.SURVEYS, INITIAL_SURVEYS);
}

export function addSurvey(surveyData) {
  const surveys = getSurveys();
  const newSurvey = {
    id: `SRV-${(surveys.length + 1).toString().padStart(2, '0')}`,
    ...surveyData,
    submittedAt: new Date().toISOString()
  };
  surveys.unshift(newSurvey);
  safeSet(STORAGE_KEYS.SURVEYS, surveys);
  return newSurvey;
}

// Export All Data as JSON
export function exportDatabaseJSON() {
  const backup = {
    exportedAt: new Date().toISOString(),
    villages: getVillages(),
    sources: getWaterSources(),
    complaints: getComplaints(),
    schedules: getSchedules(),
    qualityReports: getQualityReports(),
    surveys: getSurveys()
  };
  return JSON.stringify(backup, null, 2);
}
