import React from 'react';
import { CheckCircle, Printer, X, Share2, ArrowRight, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function ReceiptModal({ complaint, onClose, onTrackNow, t }) {
  if (!complaint) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-sky-100 overflow-hidden">
        
        {/* Receipt Header */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold">{t.complaint.successMsg}</h3>
          <p className="text-sky-100 text-xs mt-1">Official Rural Water Governance Acknowledgement</p>
        </div>

        {/* Receipt Body */}
        <div className="p-6 space-y-5">
          
          {/* Unique ID Highlight Box */}
          <div className="bg-sky-50 border-2 border-dashed border-sky-300 rounded-xl p-4 text-center">
            <span className="text-xs font-semibold text-sky-800 uppercase tracking-wider block mb-1">
              {t.complaint.yourComplaintId}
            </span>
            <div className="font-mono text-2xl font-black text-navy-900 tracking-wider">
              {complaint.id}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {t.complaint.saveIdNote}
            </p>
          </div>

          {/* Details Table */}
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Village / Gram Panchayat:</span>
              <span className="font-semibold text-navy-900">{complaint.village}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Ward / Street:</span>
              <span className="font-semibold text-navy-900">{complaint.ward}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Nearest Landmark:</span>
              <span className="font-semibold text-navy-900">{complaint.landmark}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Problem Category:</span>
              <span className="font-semibold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                {complaint.issueType}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Urgency Level:</span>
              <span className={`font-semibold px-2 py-0.5 rounded ${
                complaint.severity === 'Emergency' ? 'bg-red-100 text-red-800' :
                complaint.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {complaint.severity}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Reported By:</span>
              <span className="font-semibold text-navy-900">{complaint.reporterName} ({complaint.reporterPhone})</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Timestamp:</span>
              <span className="font-mono text-slate-600">{new Date(complaint.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Target Resolution:</span>
              <span className="font-semibold text-emerald-700">Within 24 to 48 Hours</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => onTrackNow(complaint.id)}
              className="flex-1 bg-navy-900 hover:bg-navy-800 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-colors shadow-sm"
            >
              <span>{t.nav.tracking}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.common.printReceipt}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
