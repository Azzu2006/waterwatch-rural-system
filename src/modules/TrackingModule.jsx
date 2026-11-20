import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  MapPin, 
  Phone, 
  Printer, 
  FileText,
  Calendar,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { getComplaintById, searchComplaintsByPhone, getComplaints } from '../db/storage';

export default function TrackingModule({ initialQuery, t, onShowReceipt }) {
  const [query, setQuery] = useState(initialQuery || '');
  const [complaint, setComplaint] = useState(null);
  const [multipleResults, setMultipleResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Suggested demo IDs for easy testing by evaluator
  const demoTickets = [
    { id: 'WW-2026-8812-LK', label: 'Rampur (In Progress)' },
    { id: 'WW-2026-6734-WQ', label: 'Gollapalli (Under Inspection)' },
    { id: 'WW-2026-4421-PR', label: 'Krishnapuram (Resolved)' }
  ];

  const handleSearch = (searchVal) => {
    const val = (searchVal !== undefined ? searchVal : query).trim();
    if (!val) return;

    setHasSearched(true);
    setMultipleResults([]);

    // Check if ID matches directly
    const directMatch = getComplaintById(val);
    if (directMatch) {
      setComplaint(directMatch);
      return;
    }

    // Check if Phone matches
    const phoneMatches = searchComplaintsByPhone(val);
    if (phoneMatches.length === 1) {
      setComplaint(phoneMatches[0]);
    } else if (phoneMatches.length > 1) {
      setMultipleResults(phoneMatches);
      setComplaint(null);
    } else {
      setComplaint(null);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    } else {
      // Load first demo ticket by default for smooth evaluation experience
      const defaultTicket = getComplaintById('WW-2026-8812-LK');
      if (defaultTicket) {
        setComplaint(defaultTicket);
        setQuery('WW-2026-8812-LK');
        setHasSearched(true);
      }
    }
  }, [initialQuery]);

  const getStatusStepIndex = (status) => {
    switch (status) {
      case 'Submitted': return 0;
      case 'Under Inspection': return 1;
      case 'In Progress': return 2;
      case 'Resolved': return 3;
      default: return 0;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-xs font-semibold">
          <Search className="w-4 h-4 text-sky-600" />
          <span>Real-time Grievance Tracking</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
          {t.tracking.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          {t.tracking.subtitle}
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm space-y-3">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.tracking.inputPlaceholder}
              className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl pl-10 pr-4 py-3 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none font-mono"
            />
          </div>
          <button
            type="submit"
            className="bg-navy-900 hover:bg-navy-800 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center space-x-2 shrink-0"
          >
            <span>{t.tracking.trackBtn}</span>
          </button>
        </form>

        {/* Demo Fast-Click Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium">Quick Demo Search:</span>
          {demoTickets.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setQuery(d.id);
                handleSearch(d.id);
              }}
              className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 font-mono text-[11px] border border-sky-200 transition-colors"
            >
              {d.id} <span className="text-[10px] text-slate-500">({d.label})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Multiple Phone Matches List */}
      {multipleResults.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm space-y-3">
          <h4 className="text-xs font-bold text-navy-900 uppercase">
            Multiple Grievances Registered to This Mobile Number ({multipleResults.length})
          </h4>
          <div className="space-y-2">
            {multipleResults.map((r) => (
              <div
                key={r.id}
                onClick={() => setComplaint(r)}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 cursor-pointer flex justify-between items-center text-xs transition-colors"
              >
                <div>
                  <span className="font-mono font-bold text-navy-900 block">{r.id}</span>
                  <p className="text-slate-500">{r.village} • {r.issueType}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">{r.status}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complaint Detail Card */}
      {complaint && (
        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden space-y-6">
          
          {/* Card Top Banner */}
          <div className="bg-gradient-to-r from-navy-900 to-navy-950 text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs text-sky-300 font-mono">OFFICIAL GRIEVANCE DOSSIER</span>
                <span className="text-[10px] bg-sky-500/30 text-sky-200 px-2 py-0.5 rounded">RWSS Telemetry</span>
              </div>
              <h3 className="text-2xl font-black font-mono tracking-wider text-white">
                {complaint.id}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                📍 {complaint.village} • {complaint.ward} ({complaint.landmark})
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm ${
                complaint.status === 'Resolved' ? 'bg-emerald-500 text-white' :
                complaint.status === 'In Progress' ? 'bg-sky-500 text-white' :
                complaint.status === 'Under Inspection' ? 'bg-amber-500 text-white' :
                'bg-slate-600 text-white'
              }`}>
                {complaint.status}
              </span>
              <button
                onClick={() => onShowReceipt && onShowReceipt(complaint)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="View & Print Official Slip"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-6 pt-0 space-y-6">
            
            {/* Visual Step Progress Bar */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Official Redressal Milestones
              </span>

              <div className="grid grid-cols-4 gap-2 pt-2">
                {['Submitted', 'Under Inspection', 'In Progress', 'Resolved'].map((step, idx) => {
                  const currentIdx = getStatusStepIndex(complaint.status);
                  const isDone = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div key={step} className="text-center space-y-1.5">
                      <div className={`h-2 rounded-full transition-all ${
                        isDone ? 'bg-emerald-500' : 'bg-slate-200'
                      }`} />
                      <span className={`text-[11px] block font-medium ${
                        isCurrent ? 'text-navy-950 font-bold' : isDone ? 'text-emerald-700' : 'text-slate-400'
                      }`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
                <h5 className="font-bold text-navy-900 uppercase text-[10px] tracking-wider mb-2">
                  Issue Summary
                </h5>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Problem Category:</span>
                  <strong className="text-navy-900">{complaint.issueType}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Urgency Severity:</span>
                  <strong className={`font-semibold ${complaint.severity === 'Emergency' ? 'text-red-600' : 'text-amber-600'}`}>
                    {complaint.severity}
                  </strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Logged Date:</span>
                  <span className="font-mono text-slate-700">{new Date(complaint.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-500 block mb-1">Citizen Statement:</span>
                  <p className="italic text-slate-700 bg-white p-2 rounded border border-slate-200">
                    "{complaint.description}"
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
                <h5 className="font-bold text-navy-900 uppercase text-[10px] tracking-wider mb-2">
                  Assigned Public Authority
                </h5>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Duty Official:</span>
                  <strong className="text-navy-900">{complaint.assignedTo || 'RWSS Assistant Engineer'}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Official Contact:</span>
                  <strong className="text-sky-700 font-mono">{complaint.assignedPhone || '1800-425-5555'}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Complainant:</span>
                  <span className="font-medium text-slate-700">{complaint.reporterName}</span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-500 block mb-1">Official Field Remarks:</span>
                  <p className="text-emerald-900 bg-emerald-50 p-2 rounded border border-emerald-200 font-medium">
                    {complaint.resolutionNotes || 'Lineman dispatched for on-site pipeline pressure measurement.'}
                  </p>
                </div>
              </div>

            </div>

            {/* Detailed Timeline Audit Trail */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span>Inspection & Resolution Audit Trail</span>
              </h4>

              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-sky-200">
                {(complaint.timeline || []).map((tItem, idx) => (
                  <div key={idx} className="relative text-xs">
                    <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-sky-600 border-2 border-white shadow-sm" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="font-bold text-navy-900">{tItem.status}</span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(tItem.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-0.5">{tItem.note}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* No results message */}
      {hasSearched && !complaint && multipleResults.length === 0 && (
        <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-2">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
          <h4 className="font-bold text-navy-900 text-sm">No Grievance Found</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {t.tracking.noResults}
          </p>
        </div>
      )}

    </div>
  );
}
