import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Camera, 
  Upload, 
  CheckCircle, 
  Send, 
  MapPin, 
  Phone, 
  User, 
  FileText,
  X
} from 'lucide-react';
import { addComplaint } from '../db/storage';

export default function ComplaintModule({ t, villages, onComplaintCreated }) {
  const [formData, setFormData] = useState({
    village: villages[0]?.name || 'Rampur',
    ward: '',
    landmark: '',
    issueType: 'Pipeline Leakage',
    severity: 'High',
    description: '',
    reporterName: '',
    reporterPhone: '',
    photoData: null
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({ ...prev, photoData: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setFormData(prev => ({ ...prev, photoData: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.village || !formData.description || !formData.reporterName || !formData.reporterPhone) {
      setErrorMsg(t.common.error);
      return;
    }

    if (formData.reporterPhone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number for SMS tracking updates.');
      return;
    }

    setSubmitting(true);

    try {
      const newComplaint = addComplaint(formData);
      setSubmitting(false);
      if (onComplaintCreated) {
        onComplaintCreated(newComplaint);
      }
      // Reset form
      setFormData({
        village: villages[0]?.name || 'Rampur',
        ward: '',
        landmark: '',
        issueType: 'Pipeline Leakage',
        severity: 'High',
        description: '',
        reporterName: '',
        reporterPhone: '',
        photoData: null
      });
      setPhotoPreview(null);
    } catch (err) {
      console.error(err);
      setErrorMsg('Error submitting complaint. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Village Grievance Redressal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
          {t.complaint.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          {t.complaint.subtitle}
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-sky-100 shadow-sm space-y-6">
        
        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Location Section */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center space-x-1.5 pb-2 border-b border-slate-100">
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            <span>1. Problem Location & Habitation</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.common.village} <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                required
              >
                {villages.map((v) => (
                  <option key={v.id} value={v.name}>{v.name} ({v.mandal})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.common.ward}
              </label>
              <input
                type="text"
                value={formData.ward}
                onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                placeholder="e.g. Ward 3, Gandhi Road"
                className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.common.landmark}
              </label>
              <input
                type="text"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                placeholder="e.g. Near Water Tank, Primary School"
                className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Issue Details Section */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center space-x-1.5 pb-2 border-b border-slate-100">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>2. Nature of Problem</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.complaint.issueType} <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.issueType}
                onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none font-medium"
              >
                <option value="Pipeline Leakage">{t.complaint.issueTypes.leakage}</option>
                <option value="Low Water Pressure">{t.complaint.issueTypes.lowPressure}</option>
                <option value="Contaminated Water">{t.complaint.issueTypes.contaminated}</option>
                <option value="Broken Standpost">{t.complaint.issueTypes.brokenTap}</option>
                <option value="Tank Overflow Wastage">{t.complaint.issueTypes.overflow}</option>
                <option value="Pump / Motor Failure">{t.complaint.issueTypes.pumpFailure}</option>
                <option value="Other Water Issue">{t.complaint.issueTypes.other}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.complaint.severity} <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none font-medium"
              >
                <option value="Low">{t.complaint.severityLow}</option>
                <option value="Medium">{t.complaint.severityMed}</option>
                <option value="High">{t.complaint.severityHigh}</option>
                <option value="Emergency">{t.complaint.severityEmerg}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.complaint.description} <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide exact details (e.g. Major underground pipeline cracked opposite ration shop, potable water flowing into street drain)..."
              className="w-full text-xs border border-slate-300 rounded-lg p-3 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
              required
            ></textarea>
          </div>

          {/* Optional Photo Attachment */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.complaint.photoUpload}
            </label>
            
            {photoPreview ? (
              <div className="relative inline-block border rounded-xl overflow-hidden shadow-sm">
                <img src={photoPreview} alt="Upload preview" className="h-36 w-auto object-cover" />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 shadow"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-sky-200 rounded-xl p-4 bg-sky-50/50 hover:bg-sky-50 cursor-pointer transition-colors">
                <Camera className="w-6 h-6 text-sky-600 mb-1" />
                <span className="text-xs font-semibold text-sky-800">Click to upload photo or capture via camera</span>
                <span className="text-[10px] text-slate-500">{t.complaint.photoHint}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Reporter Information */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center space-x-1.5 pb-2 border-b border-slate-100">
            <User className="w-3.5 h-3.5 text-navy-800" />
            <span>3. Reporter Information (For SMS & Tracking)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.complaint.reporterName} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.reporterName}
                onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                placeholder="e.g. Ramesh Kumar"
                className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.complaint.reporterPhone} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.reporterPhone}
                onChange={(e) => setFormData({ ...formData, reporterPhone: e.target.value })}
                placeholder="10-digit Mobile (e.g. 9849012345)"
                maxLength="12"
                className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none font-mono"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md flex items-center justify-center space-x-2"
        >
          {submitting ? (
            <span>{t.common.submitting}</span>
          ) : (
            <>
              <Send className="w-4 h-4 text-sky-400" />
              <span>{t.common.submit}</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
}
