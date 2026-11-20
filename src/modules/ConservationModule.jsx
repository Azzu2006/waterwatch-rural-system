import React, { useState } from 'react';
import { 
  Leaf, 
  CloudRain, 
  Droplets, 
  Sun, 
  ShieldCheck, 
  CheckSquare, 
  Square, 
  Printer, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export default function ConservationModule({ t }) {
  const [pledges, setPledges] = useState({
    rwh: true,
    tapCheck: true,
    coveredPot: false,
    kitchenGarden: false,
    cattleTrough: false
  });

  const togglePledge = (key) => {
    setPledges(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(pledges).filter(Boolean).length;

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
          <Leaf className="w-4 h-4 text-emerald-600" />
          <span>Rural Water Stewardship</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
          {t.conservation.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          {t.conservation.subtitle}
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: RWH */}
        <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm hover:border-sky-300 transition-all space-y-3">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <CloudRain className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-950">
            {t.conservation.rwhTitle}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {t.conservation.rwhDesc}
          </p>
          <div className="pt-2 text-[11px] text-sky-700 bg-sky-50/70 p-2.5 rounded-lg border border-sky-100">
            <strong>Gram Panchayat Subsidy:</strong> Technical layout assistance available from your Village Secretariat for constructing recharge pits.
          </div>
        </div>

        {/* Card 2: Greywater Reuse */}
        <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm hover:border-sky-300 transition-all space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Droplets className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-950">
            {t.conservation.greywaterTitle}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {t.conservation.greywaterDesc}
          </p>
          <div className="pt-2 text-[11px] text-emerald-800 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100">
            <strong>Hygiene Benefit:</strong> Eliminates stagnant breeding pools for anopheles (malaria) and aedes (dengue) mosquitoes.
          </div>
        </div>

        {/* Card 3: Safe Storage Pots */}
        <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm hover:border-sky-300 transition-all space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-950">
            {t.conservation.potTitle}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {t.conservation.potDesc}
          </p>
          <div className="pt-2 text-[11px] text-amber-800 bg-amber-50/70 p-2.5 rounded-lg border border-amber-100">
            <strong>Health Note:</strong> Studies show over 60% of rural drinking water contamination occurs inside the house due to unwashed hands touching storage pots.
          </div>
        </div>

        {/* Card 4: SODIS and 3-Pot Sedimentation */}
        <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm hover:border-sky-300 transition-all space-y-3">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Sun className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-950">
            {t.conservation.chlorineTitle}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {t.conservation.chlorineDesc}
          </p>
          <div className="pt-2 text-[11px] text-orange-800 bg-orange-50/70 p-2.5 rounded-lg border border-orange-100">
            <strong>Emergency Tip:</strong> Ultraviolet UV rays from natural sunlight destroy diarrhea-causing pathogens in 6 hours of clear daylight.
          </div>
        </div>

      </div>

      {/* Household Water Saving Pledge Checklist */}
      <div className="bg-gradient-to-r from-navy-900 to-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-navy-800">
          <div>
            <div className="flex items-center space-x-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <HeartHandshake className="w-4 h-4" />
              <span>Village Water Pledge</span>
            </div>
            <h3 className="text-xl font-bold">My Family's Water Conservation Commitment</h3>
            <p className="text-xs text-slate-300 mt-1">Check off the daily water-saving practices your household adopts:</p>
          </div>

          <div className="bg-navy-800/80 px-4 py-2 rounded-xl border border-sky-800/50 text-center">
            <span className="text-[10px] text-sky-300 uppercase tracking-wider block">Pledged</span>
            <span className="text-2xl font-black text-white font-mono">{completedCount} / 5</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 text-xs">
          {[
            { key: 'rwh', title: "Collect rainwater runoff from our roof during monsoon showers." },
            { key: 'tapCheck', title: "Check standpost taps daily and never leave running taps unattended." },
            { key: 'coveredPot', title: "Store family drinking water in a covered earthen pot with a clean tap." },
            { key: 'kitchenGarden', title: "Direct vegetable and rice wash water into our backyard trees." },
            { key: 'cattleTrough', title: "Use a dedicated trough for cattle rather than washing them at the public tap." }
          ].map((item) => (
            <div
              key={item.key}
              onClick={() => togglePledge(item.key)}
              className="flex items-center space-x-3 p-3 rounded-xl bg-navy-800/50 hover:bg-navy-800 cursor-pointer border border-navy-700/60 transition-colors"
            >
              {pledges[item.key] ? (
                <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-slate-500 shrink-0" />
              )}
              <span className={pledges[item.key] ? 'text-white font-medium' : 'text-slate-400'}>
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
