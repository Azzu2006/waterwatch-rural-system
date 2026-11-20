import React, { useState } from 'react';
import { 
  FileCheck, 
  Star, 
  Send, 
  CheckCircle2, 
  Users, 
  MessageSquare,
  BarChart3,
  ThumbsUp
} from 'lucide-react';
import { addSurvey, getSurveys } from '../db/storage';

export default function SurveyModule({ t, villages, onSurveySubmitted }) {
  const [formData, setFormData] = useState({
    village: villages[0]?.name || 'Rampur',
    respondent: '',
    familySize: 5,
    primarySource: 'Piped Tap Water (Har Ghar Jal)',
    dailyHours: '3 - 4 Hours',
    distanceMeters: 0,
    waterClarity: 'Clear',
    tasteRating: 5,
    reliabilityRating: 4,
    facingShortage: 'Rarely',
    feedback: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [surveysList, setSurveysList] = useState(getSurveys());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.respondent) {
      alert('Please enter your name or anonymous identifier.');
      return;
    }

    const newEntry = addSurvey(formData);
    setSurveysList(getSurveys());
    setSubmitted(true);
    if (onSurveySubmitted) onSurveySubmitted(newEntry);

    // Reset
    setFormData(prev => ({
      ...prev,
      respondent: '',
      feedback: ''
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold">
          <FileCheck className="w-4 h-4 text-indigo-600" />
          <span>Participatory Rural Water Audit</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
          {t.survey.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          {t.survey.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-sky-100 shadow-sm space-y-5">
          
          {submitted && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.survey.surveyThankYou}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.common.village} <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white outline-none"
                required
              >
                {villages.map((v) => (
                  <option key={v.id} value={v.name}>{v.name} ({v.mandal})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Respondent Name / Family Head <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.respondent}
                onChange={(e) => setFormData({ ...formData, respondent: e.target.value })}
                placeholder="e.g. S. Venkataramana"
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.survey.qSource}
            </label>
            <select
              value={formData.primarySource}
              onChange={(e) => setFormData({ ...formData, primarySource: e.target.value })}
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white outline-none font-medium"
            >
              <option value="Piped Tap Water (Har Ghar Jal)">Piped Tap Water (Har Ghar Jal Standpost)</option>
              <option value="RO Water ATM / Plant">Panchayat RO Water ATM / Can Plant</option>
              <option value="Community Borewell">Deep Community Borewell</option>
              <option value="Open Well">Sanitary Open Well</option>
              <option value="Hand Pump">Public Hand Pump</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.survey.qHours}
              </label>
              <select
                value={formData.dailyHours}
                onChange={(e) => setFormData({ ...formData, dailyHours: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white outline-none"
              >
                <option value="Less than 1 Hour">Less than 1 Hour (Irregular)</option>
                <option value="1 - 2 Hours">1 - 2 Hours</option>
                <option value="3 - 4 Hours">3 - 4 Hours (Morning + Evening)</option>
                <option value="6+ Hours">Continuous / 6+ Hours</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.survey.qShortage}
              </label>
              <select
                value={formData.facingShortage}
                onChange={(e) => setFormData({ ...formData, facingShortage: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white outline-none"
              >
                <option value="Never">Never (Steady year-round)</option>
                <option value="Rarely">Rarely</option>
                <option value="Often during summer">Often during summer</option>
                <option value="Severe Shortage">Severe Shortage (Need tanker)</option>
              </select>
            </div>
          </div>

          {/* Star Rating for Satisfaction */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.survey.qSatisfaction}
            </label>
            <div className="flex items-center space-x-2 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setFormData({ ...formData, tasteRating: star })}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-6 h-6 ${
                      star <= formData.tasteRating 
                        ? 'text-amber-400 fill-amber-400' 
                        : 'text-slate-200'
                    }`} 
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-navy-900 ml-2">
                {formData.tasteRating} / 5 Stars
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.survey.qComments}
            </label>
            <textarea
              rows="2"
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              placeholder="e.g. Need additional tap stand near temple; evening supply timing is convenient..."
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4 text-sky-400" />
            <span>{t.survey.submitSurvey}</span>
          </button>
        </form>

        {/* Live Survey Feedback Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h4 className="font-bold text-navy-950 text-xs sm:text-sm flex items-center space-x-1.5">
                <BarChart3 className="w-4 h-4 text-sky-600" />
                <span>Recent Citizen Audits ({surveysList.length})</span>
              </h4>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {surveysList.map((s) => (
                <div key={s.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <strong className="text-navy-900">{s.respondent}</strong>
                    <div className="flex items-center text-amber-500 text-[10px]">
                      {Array.from({ length: s.tasteRating || 4 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    📍 {s.village} • {s.primarySource} ({s.dailyHours})
                  </p>
                  {s.feedback && (
                    <p className="text-slate-700 italic bg-white p-2 rounded border border-slate-100 text-[11px]">
                      "{s.feedback}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
