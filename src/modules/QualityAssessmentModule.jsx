import React, { useState } from 'react';
import { 
  FlaskConical, 
  ShieldCheck, 
  AlertTriangle, 
  AlertOctagon, 
  CheckCircle2, 
  HelpCircle, 
  Save, 
  Info,
  Droplet
} from 'lucide-react';
import { addQualityReport } from '../db/storage';

export default function QualityAssessmentModule({ t, villages, onReportSaved }) {
  const [formData, setFormData] = useState({
    village: villages[0]?.name || 'Rampur',
    sourceName: '',
    testedBy: 'Village Jal Mitra / Citizen',
    ph: 7.2,
    tds: 240,
    turbidity: 0.8,
    smell: 'None',
    color: 'Clear'
  });

  const [assessment, setAssessment] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // WQI Calculation & Algorithmic Safety Assessment Engine
  const calculateSafety = (data) => {
    const ph = parseFloat(data.ph);
    const tds = parseFloat(data.tds);
    const turb = parseFloat(data.turbidity);
    const smell = data.smell;
    const color = data.color;

    let score = 100;
    const issues = [];
    const advisories = [];

    // 1. pH Evaluation (IS 10500: 6.5 - 8.5)
    if (ph < 6.5) {
      const diff = 6.5 - ph;
      score -= Math.min(35, diff * 25);
      issues.push(`Acidic water (pH ${ph} is below 6.5 limit)`);
      advisories.push("Acidic water can leach lead and copper from older village metal pipes. Aeration or calcite filtration recommended.");
    } else if (ph > 8.5) {
      const diff = ph - 8.5;
      score -= Math.min(30, diff * 20);
      issues.push(`Alkaline / Hard water (pH ${ph} exceeds 8.5 limit)`);
      advisories.push("High alkalinity reduces the germicidal effectiveness of chlorination. May have a slippery feel and soda taste.");
    }

    // 2. TDS Evaluation (IS 10500: < 500 desirable, < 2000 max)
    if (tds > 1500) {
      score -= 40;
      issues.push(`Extremely High Dissolved Solids (${tds} ppm exceeds safe threshold)`);
      advisories.push("Excessive mineral concentration can aggravate renal calculi (kidney stones) and cause bitter taste. RO purification required.");
    } else if (tds > 800) {
      score -= 20;
      issues.push(`Elevated Mineral Hardness (${tds} ppm)`);
      advisories.push("High mineral hardness. Suitable for livestock/domestic use; filtration or RO recommended for infants.");
    } else if (tds > 500) {
      score -= 10;
      issues.push(`Moderate TDS (${tds} ppm is slightly above desirable 500 ppm benchmark)`);
    }

    // 3. Turbidity Evaluation (IS 10500: < 1 desirable, < 5 permissible)
    if (turb > 5.0) {
      score -= 35;
      issues.push(`High Turbidity (${turb} NTU - water is noticeably cloudy/sedimented)`);
      advisories.push("Suspended clay and organic particles can harbor gastrointestinal bacteria. Must be settled and filtered.");
    } else if (turb > 1.0) {
      score -= 10;
      issues.push(`Slight Turbidity (${turb} NTU above ideal 1.0 NTU)`);
      advisories.push("Allow water to settle or pass through a clean multi-layer cloth or sand-gravel filter.");
    }

    // 4. Smell / Odour Evaluation
    if (smell === 'Foul' || smell === 'Sulphur') {
      score -= 35;
      issues.push("Strong biological / septic odour detected");
      advisories.push("CRITICAL: Odour indicates potential sewage cross-contamination or anaerobic bacterial decay. DO NOT CONSUME.");
    } else if (smell === 'Metallic') {
      score -= 15;
      issues.push("Metallic odour (possible high iron or pipe rust)");
      advisories.push("Flush standpost line for 2 minutes before collection. Test for iron / manganese.");
    }

    // 5. Colour Evaluation
    if (color === 'Brownish/Muddy') {
      score -= 25;
      issues.push("Brown / Muddy discoloration");
      advisories.push("Indicates monsoon surface runoff or fractured borehole casing. Perform shock chlorination.");
    } else if (color === 'Rusty Red') {
      score -= 20;
      issues.push("Reddish corrosion tint");
      advisories.push("Excess iron precipitate. Aerate water and let rust settle in storage drums.");
    }

    score = Math.max(10, Math.min(100, Math.round(score)));

    // Categorization
    let verdict = '';
    let verdictKey = '';
    let badgeColor = '';

    if (score >= 80 && (smell === 'None' || smell === 'Chlorine') && color === 'Clear' && turb <= 2.5) {
      verdict = t.quality.verdictSafe;
      verdictKey = 'SAFE';
      badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
      if (advisories.length === 0) {
        advisories.push("Complies with Indian Standard IS 10500:2012. Water is safe and potable for direct drinking.");
      }
    } else if (score >= 50 && smell !== 'Foul' && color !== 'Brownish/Muddy') {
      verdict = t.quality.verdictModerate;
      verdictKey = 'MODERATE';
      badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
      advisories.push("Bring water to a rolling boil for at least 10 minutes or use a certified ceramic candle filter before drinking.");
    } else {
      verdict = t.quality.verdictUnsafe;
      verdictKey = 'UNSAFE';
      badgeColor = 'bg-red-100 text-red-800 border-red-300';
      advisories.push("HAZARD: Do not use for drinking or cooking. Report immediately to Gram Panchayat for emergency chlorination.");
    }

    return {
      score,
      verdict,
      verdictKey,
      badgeColor,
      issues,
      advisories
    };
  };

  const handleAssess = (e) => {
    e.preventDefault();
    const result = calculateSafety(formData);
    setAssessment(result);
    setSavedSuccess(false);
  };

  const handleSaveToDatabase = () => {
    if (!assessment) return;
    
    addQualityReport({
      village: formData.village,
      sourceName: formData.sourceName || 'Panchayat Tap / Sample',
      testedBy: formData.testedBy || 'Citizen',
      ph: parseFloat(formData.ph),
      tds: parseFloat(formData.tds),
      turbidity: parseFloat(formData.turbidity),
      smell: formData.smell,
      color: formData.color,
      wqi: assessment.score,
      verdict: assessment.verdict,
      remarks: assessment.issues.join('; ') || 'All parameters within desirable limits.'
    });

    setSavedSuccess(true);
    if (onReportSaved) onReportSaved();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-xs font-semibold">
          <FlaskConical className="w-4 h-4 text-sky-600" />
          <span>IS 10500:2012 Testing Module</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
          {t.quality.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
          {t.quality.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs (7 cols) */}
        <form onSubmit={handleAssess} className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-sky-100 shadow-sm space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
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
              <label className="block text-xs font-bold text-navy-900 mb-1">
                {t.quality.sourceName}
              </label>
              <input
                type="text"
                value={formData.sourceName}
                onChange={(e) => setFormData({ ...formData, sourceName: e.target.value })}
                placeholder="e.g. Ward 2 Borewell, School Standpost"
                className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
          </div>

          {/* 1. pH Parameter */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-navy-900 flex items-center space-x-1.5">
                <span>{t.quality.phLabel}</span>
              </label>
              <span className="font-mono font-bold text-sm text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded">
                pH {formData.ph}
              </span>
            </div>
            <input
              type="range"
              min="4.0"
              max="11.0"
              step="0.1"
              value={formData.ph}
              onChange={(e) => setFormData({ ...formData, ph: parseFloat(e.target.value) })}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Acidic (4.0)</span>
              <span className="text-emerald-700 font-semibold">Safe (6.5 - 8.5)</span>
              <span>Alkaline (11.0)</span>
            </div>
          </div>

          {/* 2. TDS Parameter */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-navy-900">
                {t.quality.tdsLabel}
              </label>
              <span className="font-mono font-bold text-sm text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded">
                {formData.tds} ppm
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="2500"
              step="10"
              value={formData.tds}
              onChange={(e) => setFormData({ ...formData, tds: parseInt(e.target.value) })}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span className="text-emerald-700 font-semibold">&lt; 300 (Excellent)</span>
              <span>500 (Desirable)</span>
              <span className="text-red-600">&gt; 1200 (Hard/Unsafe)</span>
            </div>
          </div>

          {/* 3. Turbidity Parameter */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-navy-900">
                {t.quality.turbidityLabel}
              </label>
              <span className="font-mono font-bold text-sm text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded">
                {formData.turbidity} NTU
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="15.0"
              step="0.1"
              value={formData.turbidity}
              onChange={(e) => setFormData({ ...formData, turbidity: parseFloat(e.target.value) })}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span className="text-emerald-700 font-semibold">&lt; 1.0 (Crystal Clear)</span>
              <span>1.0 - 5.0 (Acceptable)</span>
              <span className="text-red-600">&gt; 5.0 (Muddy)</span>
            </div>
          </div>

          {/* 4 & 5: Smell and Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                {t.quality.smellLabel}
              </label>
              <select
                value={formData.smell}
                onChange={(e) => setFormData({ ...formData, smell: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
              >
                <option value="None">{t.quality.smellNone}</option>
                <option value="Chlorine">{t.quality.smellChlorine}</option>
                <option value="Sulphur">{t.quality.smellSulphur}</option>
                <option value="Metallic">{t.quality.smellMetallic}</option>
                <option value="Foul">{t.quality.smellFoul}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                {t.quality.colorLabel}
              </label>
              <select
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
              >
                <option value="Clear">{t.quality.colorClear}</option>
                <option value="Light Yellow">{t.quality.colorYellow}</option>
                <option value="Brownish/Muddy">{t.quality.colorBrown}</option>
                <option value="Rusty Red">{t.quality.colorRust}</option>
                <option value="Milky">{t.quality.colorMilky}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1">
              {t.quality.testedBy}
            </label>
            <input
              type="text"
              value={formData.testedBy}
              onChange={(e) => setFormData({ ...formData, testedBy: e.target.value })}
              className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md shadow-sky-600/20 flex items-center justify-center space-x-2"
          >
            <FlaskConical className="w-4 h-4" />
            <span>{t.quality.assessBtn}</span>
          </button>
        </form>

        {/* Results Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {assessment ? (
            <div className="bg-white rounded-2xl border border-sky-100 shadow-md p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-navy-950 text-sm">{t.quality.resultTitle}</h4>
                <span className="text-[10px] font-mono text-slate-500">{formData.village}</span>
              </div>

              {/* Score Gauge */}
              <div className="text-center py-2">
                <div className="inline-flex flex-col items-center justify-center w-28 h-28 rounded-full border-4 border-sky-200 bg-sky-50/50 shadow-inner">
                  <span className="text-3xl font-black text-navy-900 font-mono">{assessment.score}</span>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">WQI Index</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`p-3 rounded-xl border text-center font-bold text-xs ${assessment.badgeColor}`}>
                {assessment.verdict}
              </div>

              {/* Identified Issues */}
              {assessment.issues.length > 0 && (
                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-slate-700 block">Detected Parameter Flags:</span>
                  <ul className="space-y-1">
                    {assessment.issues.map((issue, idx) => (
                      <li key={idx} className="flex items-start text-slate-600">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mr-1.5 mt-0.5 shrink-0" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actionable Health Advisory */}
              <div className="bg-sky-50/80 p-3.5 rounded-xl border border-sky-200 text-xs space-y-1.5">
                <span className="font-bold text-navy-900 block flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 mr-1.5" />
                  {t.quality.advisoryTitle}
                </span>
                <ul className="space-y-1">
                  {assessment.advisories.map((adv, idx) => (
                    <li key={idx} className="text-slate-700 leading-relaxed text-[11px]">
                      • {adv}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Save to DB Button */}
              <button
                type="button"
                onClick={handleSaveToDatabase}
                disabled={savedSuccess}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-colors ${
                  savedSuccess
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-navy-900 hover:bg-navy-800 text-white'
                }`}
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Saved to Village Database</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Record in Village Quality Log</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-sky-200 p-8 text-center space-y-3">
              <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mx-auto">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-navy-900 text-sm">Awaiting Parameter Input</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Adjust the pH, TDS, and turbidity sliders on the left, then click <strong>"Calculate Water Safety Index"</strong> to generate your instant safety assessment.
              </p>
            </div>
          )}

          {/* Legal / Health Disclaimer */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-[11px] text-slate-500 leading-relaxed space-y-1">
            <span className="font-bold text-navy-900 flex items-center">
              <Info className="w-3.5 h-3.5 text-sky-600 mr-1.5" />
              {t.common.disclaimer}
            </span>
            <p>{t.quality.disclaimerNote}</p>
          </div>

        </div>

      </div>

    </div>
  );
}
