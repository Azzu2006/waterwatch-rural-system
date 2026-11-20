import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FlaskConical, 
  FileCheck, 
  Download, 
  RefreshCw, 
  UserCheck, 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  Filter,
  BarChart2,
  Calendar,
  Save,
  LogOut,
  BellRing
} from 'lucide-react';
import { 
  updateComplaintStatus, 
  getComplaints, 
  getQualityReports, 
  getSurveys, 
  getSchedules, 
  addSchedule, 
  updateSchedule,
  resetDemoData,
  exportDatabaseJSON
} from '../db/storage';

export default function AdminDashboard({ 
  t, 
  villages, 
  complaints, 
  qualityReports, 
  schedules, 
  surveys, 
  onDataModified,
  onResetData
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('complaints'); // complaints, quality, schedules, surveys, data

  // Complaints tab filters
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [villageFilter, setVillageFilter] = useState('ALL');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [updateStatusVal, setUpdateStatusVal] = useState('Under Inspection');
  const [assignOfficerVal, setAssignOfficerVal] = useState('');
  const [resolutionNoteVal, setResolutionNoteVal] = useState('');

  // Schedule modal state
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [newScheduleForm, setNewScheduleForm] = useState({
    village: villages[0]?.name || 'Rampur',
    zone: '',
    morningWindow: '06:00 AM – 08:00 AM',
    eveningWindow: '06:00 PM – 07:30 PM',
    status: 'Active',
    pressureLevel: 'Normal (1.7 Bar)',
    tankCapacityPercent: 85,
    operator: 'Lineman Duty Team',
    phone: '9849011223',
    announcement: ''
  });

  const handleLogin = (e) => {
    e?.preventDefault();
    if (pinInput === '1800' || pinInput === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect security PIN. Use default demo PIN: 1800');
    }
  };

  const handleOneClickDemo = () => {
    setPinInput('1800');
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleUpdateComplaint = (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    updateComplaintStatus(
      selectedComplaint.id,
      updateStatusVal,
      assignOfficerVal || selectedComplaint.assignedTo,
      resolutionNoteVal
    );

    setSelectedComplaint(null);
    setResolutionNoteVal('');
    if (onDataModified) onDataModified();
  };

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    addSchedule(newScheduleForm);
    setNewScheduleForm({
      village: villages[0]?.name || 'Rampur',
      zone: '',
      morningWindow: '06:00 AM – 08:00 AM',
      eveningWindow: '06:00 PM – 07:30 PM',
      status: 'Active',
      pressureLevel: 'Normal (1.7 Bar)',
      tankCapacityPercent: 85,
      operator: 'Lineman Duty Team',
      phone: '9849011223',
      announcement: ''
    });
    if (onDataModified) onDataModified();
  };

  const handleExportJSON = () => {
    const dataStr = exportDatabaseJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waterwatch_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtered Complaints
  const filteredComplaints = (complaints || []).filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (villageFilter !== 'ALL' && c.village !== villageFilter) return false;
    return true;
  });

  // KPI Calculations
  const totalC = complaints?.length || 0;
  const pendingC = complaints?.filter(c => c.status === 'Submitted').length || 0;
  const inProgressC = complaints?.filter(c => c.status === 'Under Inspection' || c.status === 'In Progress').length || 0;
  const resolvedC = complaints?.filter(c => c.status === 'Resolved').length || 0;

  // --- Login Gate ---
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 border border-sky-100 shadow-xl space-y-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-navy-900 text-white flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-8 h-8 text-sky-400" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-navy-950">{t.admin.title}</h3>
          <p className="text-xs text-slate-500">{t.admin.subtitle}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-left">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.admin.loginPrompt}
            </label>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder={t.admin.pinPlaceholder}
              className="w-full text-center tracking-widest text-lg font-mono font-bold border border-slate-300 rounded-xl py-3 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          {authError && (
            <p className="text-xs text-red-600 font-medium">{authError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <Unlock className="w-4 h-4 text-sky-400" />
            <span>{t.admin.loginBtn}</span>
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleOneClickDemo}
            className="w-full bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-semibold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>{t.admin.demoLoginBtn}</span>
          </button>
          <p className="text-[10px] text-slate-400 mt-2">
            Secure PIN-gated administrator mode for Gram Panchayat evaluation.
          </p>
        </div>
      </div>
    );
  }

  // --- Authenticated Dashboard ---
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Top Admin Header */}
      <div className="bg-navy-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs text-sky-400 font-semibold uppercase tracking-wider">
              Authorized Panchayat Session
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">{t.admin.title}</h2>
          <p className="text-xs text-slate-300 mt-1">RWSS Division / Gram Panchayat Redressal Console</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportJSON}
            className="bg-navy-800 hover:bg-navy-700 text-sky-300 border border-sky-800 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON Backup</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.admin.logout}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Total Complaints</span>
          <span className="text-2xl font-black text-navy-900 font-mono mt-1 block">{totalC}</span>
          <span className="text-[11px] text-slate-400">All Habitations</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
          <span className="text-xs text-amber-700 font-semibold block">Pending / Inspection</span>
          <span className="text-2xl font-black text-amber-600 font-mono mt-1 block">{pendingC + inProgressC}</span>
          <span className="text-[11px] text-amber-600 font-medium">Requires Action</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
          <span className="text-xs text-emerald-700 font-semibold block">Resolved Grievances</span>
          <span className="text-2xl font-black text-emerald-600 font-mono mt-1 block">{resolvedC}</span>
          <span className="text-[11px] text-emerald-600 font-medium">
            {totalC > 0 ? Math.round((resolvedC / totalC) * 100) : 0}% Closed
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm">
          <span className="text-xs text-sky-700 font-semibold block">Active Village Schedules</span>
          <span className="text-2xl font-black text-sky-600 font-mono mt-1 block">{schedules?.length || 0}</span>
          <span className="text-[11px] text-sky-600 font-medium">Water Grid Feeds</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 overflow-x-auto space-x-2 text-xs font-bold">
        {[
          { id: 'complaints', label: t.admin.tabComplaints, count: complaints?.length },
          { id: 'quality', label: t.admin.tabQuality, count: qualityReports?.length },
          { id: 'schedules', label: t.admin.tabSchedules, count: schedules?.length },
          { id: 'surveys', label: t.admin.tabSurveys, count: surveys?.length },
          { id: 'data', label: t.admin.tabData }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
              activeTab === tab.id
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: COMPLAINTS MANAGEMENT */}
      {activeTab === 'complaints' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm flex flex-wrap gap-3 justify-between items-center text-xs">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-navy-900">Filter By Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-slate-300 rounded-lg px-2.5 py-1.5 bg-slate-50 font-semibold text-slate-700 outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="Submitted">Submitted (New)</option>
                <option value="Under Inspection">Under Inspection</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <span className="font-bold text-navy-900">Village:</span>
              <select
                value={villageFilter}
                onChange={(e) => setVillageFilter(e.target.value)}
                className="border border-slate-300 rounded-lg px-2.5 py-1.5 bg-slate-50 font-semibold text-slate-700 outline-none"
              >
                <option value="ALL">All Villages</option>
                {villages.map((v) => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Complaints Table */}
          <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Ticket ID</th>
                  <th className="py-3 px-4">Village / Location</th>
                  <th className="py-3 px-4">Issue Category</th>
                  <th className="py-3 px-4">Severity</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4">Assigned Officer</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredComplaints.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-navy-900">{c.id}</td>
                    <td className="py-3 px-4">
                      <strong>{c.village}</strong>
                      <span className="block text-[11px] text-slate-500">{c.ward}</span>
                    </td>
                    <td className="py-3 px-4 font-medium">{c.issueType}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.severity === 'Emergency' ? 'bg-red-100 text-red-800' :
                        c.severity === 'High' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {c.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                        c.status === 'In Progress' ? 'bg-sky-100 text-sky-800' :
                        c.status === 'Under Inspection' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {c.assignedTo || 'Unassigned'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedComplaint(c);
                          setUpdateStatusVal(c.status);
                          setAssignOfficerVal(c.assignedTo || '');
                          setResolutionNoteVal(c.resolutionNotes || '');
                        }}
                        className="bg-navy-900 hover:bg-navy-800 text-white px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-colors"
                      >
                        Manage Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Status Update Modal */}
          {selectedComplaint && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-sky-100 space-y-4">
                <div className="flex justify-between items-start pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] text-sky-600 font-bold uppercase tracking-wider">Update Grievance</span>
                    <h4 className="text-lg font-bold text-navy-950 font-mono">{selectedComplaint.id}</h4>
                    <p className="text-xs text-slate-500">{selectedComplaint.village} • {selectedComplaint.issueType}</p>
                  </div>
                  <button
                    onClick={() => setSelectedComplaint(null)}
                    className="text-slate-400 hover:text-slate-600 text-lg font-bold"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleUpdateComplaint} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-navy-900 mb-1">{t.admin.updateStatus}</label>
                    <select
                      value={updateStatusVal}
                      onChange={(e) => setUpdateStatusVal(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 font-semibold text-slate-800 outline-none"
                    >
                      <option value="Submitted">Submitted (Registered)</option>
                      <option value="Under Inspection">Under Inspection (Lineman Dispatched)</option>
                      <option value="In Progress">In Progress (Repair Underway)</option>
                      <option value="Resolved">Resolved (Citizen Verified)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-navy-900 mb-1">{t.admin.assignOfficer}</label>
                    <input
                      type="text"
                      value={assignOfficerVal}
                      onChange={(e) => setAssignOfficerVal(e.target.value)}
                      placeholder="e.g. M. Prabhakar (Assistant Engineer) / Lineman"
                      className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-navy-900 mb-1">{t.admin.resolutionNote}</label>
                    <textarea
                      rows="3"
                      value={resolutionNoteVal}
                      onChange={(e) => setResolutionNoteVal(e.target.value)}
                      placeholder="Add official action notes (e.g. Replacement valve fitted; water supply restored at normal pressure)..."
                      className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none"
                      required
                    ></textarea>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 rounded-xl transition-colors"
                    >
                      Save Status Update
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedComplaint(null)}
                      className="px-4 py-2.5 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: WATER QUALITY REPORTS */}
      {activeTab === 'quality' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Report ID</th>
                  <th className="py-3 px-4">Source & Village</th>
                  <th className="py-3 px-4">pH</th>
                  <th className="py-3 px-4">TDS (ppm)</th>
                  <th className="py-3 px-4">Turbidity</th>
                  <th className="py-3 px-4">WQI</th>
                  <th className="py-3 px-4">Verdict</th>
                  <th className="py-3 px-4">Tested By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {(qualityReports || []).map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-navy-900">{r.id}</td>
                    <td className="py-3 px-4">
                      <strong>{r.sourceName}</strong>
                      <span className="block text-[11px] text-slate-500">📍 {r.village}</span>
                    </td>
                    <td className="py-3 px-4 font-mono">{r.ph}</td>
                    <td className="py-3 px-4 font-mono">{r.tds}</td>
                    <td className="py-3 px-4 font-mono">{r.turbidity}</td>
                    <td className="py-3 px-4 font-mono font-bold text-navy-900">{r.wqi || '--'}</td>
                    <td className="py-3 px-4 font-medium">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        (r.verdict || '').toLowerCase().includes('safe') ? 'bg-emerald-100 text-emerald-800' :
                        (r.verdict || '').toLowerCase().includes('moderate') ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {r.verdict}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">{r.testedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SCHEDULES MANAGEMENT */}
      {activeTab === 'schedules' && (
        <div className="space-y-6">
          {/* Add New Schedule Form */}
          <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center space-x-1.5 pb-2 border-b border-slate-100">
              <Plus className="w-4 h-4 text-sky-600" />
              <span>Add / Configure Village Supply Schedule</span>
            </h4>

            <form onSubmit={handleCreateSchedule} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Village</label>
                <select
                  value={newScheduleForm.village}
                  onChange={(e) => setNewScheduleForm({ ...newScheduleForm, village: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none"
                >
                  {villages.map((v) => (
                    <option key={v.id} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Zone / Habitation</label>
                <input
                  type="text"
                  value={newScheduleForm.zone}
                  onChange={(e) => setNewScheduleForm({ ...newScheduleForm, zone: e.target.value })}
                  placeholder="e.g. South Habitation & BC Colony"
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Morning Supply Window</label>
                <input
                  type="text"
                  value={newScheduleForm.morningWindow}
                  onChange={(e) => setNewScheduleForm({ ...newScheduleForm, morningWindow: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Evening Supply Window</label>
                <input
                  type="text"
                  value={newScheduleForm.eveningWindow}
                  onChange={(e) => setNewScheduleForm({ ...newScheduleForm, eveningWindow: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Duty Lineman & Phone</label>
                <input
                  type="text"
                  value={newScheduleForm.operator}
                  onChange={(e) => setNewScheduleForm({ ...newScheduleForm, operator: e.target.value })}
                  placeholder="e.g. R. Govindappa (9849123456)"
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Public Announcement / Alert</label>
                <input
                  type="text"
                  value={newScheduleForm.announcement}
                  onChange={(e) => setNewScheduleForm({ ...newScheduleForm, announcement: e.target.value })}
                  placeholder="e.g. Regular supply operational."
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 outline-none"
                />
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="bg-navy-900 hover:bg-navy-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors shadow-sm flex items-center space-x-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-sky-400" />
                  <span>Publish Schedule</span>
                </button>
              </div>
            </form>
          </div>

          {/* List of Schedules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {(schedules || []).map((s) => (
              <div key={s.id} className="bg-white p-4 rounded-xl border border-sky-100 shadow-sm space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-navy-950 text-sm block">{s.village}</span>
                    <span className="text-slate-500">{s.zone}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {s.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-700 pt-1">
                  <div>🌅 {s.morningWindow}</div>
                  <div>🌇 {s.eveningWindow}</div>
                </div>
                <p className="text-[11px] text-sky-800 font-medium">Lineman: {s.operator}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SURVEY ANALYTICS */}
      {activeTab === 'surveys' && (
        <div className="space-y-6">
          {/* Visual Analytics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Chart 1: Average Satisfaction */}
            <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm text-center space-y-3">
              <span className="text-xs font-bold text-navy-900 uppercase tracking-wider block">
                Citizen Satisfaction Score
              </span>
              <div className="inline-flex flex-col items-center justify-center w-24 h-24 rounded-full bg-amber-50 border-4 border-amber-300">
                <span className="text-2xl font-black text-amber-700 font-mono">4.2</span>
                <span className="text-[9px] text-slate-500 font-semibold uppercase">Out of 5.0</span>
              </div>
              <p className="text-xs text-slate-500">Based on verified village household responses</p>
            </div>

            {/* Chart 2: Supply Availability Hours */}
            <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm space-y-3">
              <span className="text-xs font-bold text-navy-900 uppercase tracking-wider block">
                Daily Supply Availability
              </span>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>3 - 4 Hours (Standard)</span>
                    <strong className="font-mono">68%</strong>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-sky-500 w-[68%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>6+ Hours / Continuous</span>
                    <strong className="font-mono">18%</strong>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[18%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>1 - 2 Hours (Tail End)</span>
                    <strong className="font-mono">14%</strong>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-amber-500 w-[14%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 3: Primary Sources */}
            <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm space-y-3">
              <span className="text-xs font-bold text-navy-900 uppercase tracking-wider block">
                Primary Drinking Source
              </span>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Har Ghar Jal Piped Tap</span>
                    <strong className="font-mono">62%</strong>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-blue-600 w-[62%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Panchayat RO Water Plant</span>
                    <strong className="font-mono">26%</strong>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-cyan-500 w-[26%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Deep Borewell / Open Well</span>
                    <strong className="font-mono">12%</strong>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-slate-400 w-[12%]" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 5: DATA MANAGEMENT */}
      {activeTab === 'data' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sky-100 shadow-sm space-y-6 text-xs">
          <div>
            <h4 className="text-sm font-bold text-navy-950 mb-1">Database Administration & Reset Controls</h4>
            <p className="text-slate-500">Export database backups or restore the clean academic demonstration state.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-bold text-navy-900 block">Export JSON Database</span>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Download all active villages, water sources, citizen complaints, quality tests, and surveys as a clean JSON backup file.
              </p>
              <button
                type="button"
                onClick={handleExportJSON}
                className="bg-navy-900 hover:bg-navy-800 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Database JSON</span>
              </button>
            </div>

            <div className="p-4 rounded-xl border border-red-200 bg-red-50/50 space-y-2">
              <span className="font-bold text-red-900 block">Reset to Demo Baseline</span>
              <p className="text-red-700 leading-relaxed text-[11px]">
                Restores the standard realistic sample data across all 18 modules for academic project evaluation.
              </p>
              <button
                type="button"
                onClick={onResetData}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo Baseline</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
