import React, { useState } from 'react';
import { 
  Calculator, 
  Droplets, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Leaf, 
  Sparkles,
  Info
} from 'lucide-react';

export default function CalculatorModule({ t }) {
  const [inputs, setInputs] = useState({
    familyMembers: 5,
    cattle: 2,
    smallAnimals: 0,
    bucketBaths: 5,
    cooking: 25,
    washing: 50,
    courtyard: 30
  });

  const [hasCalculated, setHasCalculated] = useState(true);

  // Computations
  const bathWater = inputs.bucketBaths * 20; // 20L per bucket
  const cattleWater = inputs.cattle * 50;    // 50L per cow/buffalo
  const smallAnimalWater = inputs.smallAnimals * 10; // 10L per goat/sheep
  const kitchenWater = parseInt(inputs.cooking) || 0;
  const washWater = parseInt(inputs.washing) || 0;
  const yardWater = parseInt(inputs.courtyard) || 0;

  // Total daily household usage in Litres
  const totalDailyLitres = bathWater + cattleWater + smallAnimalWater + kitchenWater + washWater + yardWater;
  
  // Per Capita Consumption for humans only (excluding livestock)
  const humanDomesticTotal = bathWater + kitchenWater + washWater + yardWater;
  const lpcd = inputs.familyMembers > 0 
    ? Math.round(humanDomesticTotal / inputs.familyMembers) 
    : 0;

  // National Rural Water Benchmark is 55 LPCD (Jal Jeevan Mission)
  const isEfficient = lpcd <= 55;
  const isModerate = lpcd > 55 && lpcd <= 80;
  const isHigh = lpcd > 80;

  const getRecommendations = () => {
    const list = [];
    if (cattleWater > 60) {
      list.push("Install an automatic float-valve on your livestock water trough to prevent water overflow and save 40-60 Litres every morning.");
    }
    if (yardWater > 25) {
      list.push("Avoid washing courtyards or sheds with potable drinking tap water. Use kitchen rinse greywater or rainwater collected in barrels.");
    }
    if (washWater > 50) {
      list.push("Route clothes and vessel rinse water into a backyard banana or papaya tree pit (soak trench) instead of letting it stagnant in street gutters.");
    }
    if (lpcd > 55) {
      list.push("Inspect all household tap washers and bib-cocks for slow dripping. A single dripping tap loses over 30 Litres per day.");
    }
    list.push("Cover all household overhead tanks and water storage pots to prevent evaporation and algae buildup.");
    return list;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-semibold">
          <Calculator className="w-4 h-4 text-cyan-600" />
          <span>Jal Jeevan 55 LPCD Standard Tool</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
          {t.calc.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          {t.calc.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Panel (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-sky-100 shadow-sm space-y-5">
          <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Household Parameters
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.calc.familyMembers}
              </label>
              <input
                type="number"
                min="1"
                max="25"
                value={inputs.familyMembers}
                onChange={(e) => setInputs({ ...inputs, familyMembers: Math.max(1, parseInt(e.target.value) || 1) })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.calc.cattleCount}
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={inputs.cattle}
                onChange={(e) => setInputs({ ...inputs, cattle: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.calc.smallAnimals}
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={inputs.smallAnimals}
                onChange={(e) => setInputs({ ...inputs, smallAnimals: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.calc.bucketsBath}
              </label>
              <input
                type="number"
                min="1"
                max="40"
                value={inputs.bucketBaths}
                onChange={(e) => setInputs({ ...inputs, bucketBaths: Math.max(1, parseInt(e.target.value) || 1) })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.calc.cookingWater}
              </label>
              <input
                type="number"
                min="5"
                max="200"
                value={inputs.cooking}
                onChange={(e) => setInputs({ ...inputs, cooking: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.calc.washingClothes}
              </label>
              <input
                type="number"
                min="0"
                max="300"
                value={inputs.washing}
                onChange={(e) => setInputs({ ...inputs, washing: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.calc.cleaningCourtyard}
              </label>
              <input
                type="number"
                min="0"
                max="200"
                value={inputs.courtyard}
                onChange={(e) => setInputs({ ...inputs, courtyard: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Results Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6 space-y-5">
            <h4 className="font-bold text-navy-950 text-sm pb-2 border-b border-slate-100">
              {t.calc.resultsTitle}
            </h4>

            {/* Total Daily Litres */}
            <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 text-center">
              <span className="text-[11px] font-semibold text-sky-800 uppercase tracking-wider block mb-1">
                {t.calc.totalDaily}
              </span>
              <div className="text-3xl font-black text-navy-900 font-mono">
                {totalDailyLitres} <span className="text-sm font-semibold text-slate-500">{t.calc.litres}</span>
              </div>
            </div>

            {/* LPCD vs JJM Benchmark */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">{t.calc.lpcdResult}</span>
                <span className="font-mono font-bold text-base text-navy-900">{lpcd} LPCD</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>{t.calc.targetBenchmark}</span>
                <span className="font-mono">55 LPCD</span>
              </div>

              {/* Visual Meter Bar */}
              <div className="h-3 rounded-full bg-slate-100 overflow-hidden relative">
                <div 
                  className={`h-full transition-all duration-500 ${
                    isEfficient ? 'bg-emerald-500' : isModerate ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, (lpcd / 120) * 100)}%` }}
                />
              </div>

              {/* Status Indicator */}
              <div className={`p-2.5 rounded-lg text-xs font-semibold text-center border ${
                isEfficient ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                isModerate ? 'bg-amber-50 text-amber-800 border-amber-200' :
                'bg-red-50 text-red-800 border-red-200'
              }`}>
                {isEfficient ? t.calc.statusEfficient : isModerate ? t.calc.statusModerate : t.calc.statusHigh}
              </div>
            </div>

            {/* Tailored Water Saving Recommendations */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-navy-900 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.calc.recommendationsTitle}</span>
              </span>
              <ul className="space-y-2 text-[11px] text-slate-600 leading-relaxed">
                {getRecommendations().map((rec, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-sky-600 font-bold mr-1.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
