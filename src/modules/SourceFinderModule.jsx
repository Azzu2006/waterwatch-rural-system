import React from 'react';
import { MapPin, Droplets, ShieldCheck, Info } from 'lucide-react';
import MapView from '../components/MapView';

export default function SourceFinderModule({ t, sources }) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>Geo-Spatial Drinking Water Grid</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
          {t.sources.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          {t.sources.subtitle}
        </p>
      </div>

      {/* Interactive Map Component */}
      <MapView sources={sources} t={t} />

      {/* Guidance Note */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 sm:p-5 flex items-start space-x-3 text-xs text-sky-900">
        <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-navy-900">How to use the Rural Water Map:</h4>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Click on any marker pin to inspect the tested pH, TDS, turbidity, and operating Gram Panchayat authority. Green pins indicate verified potable drinking water points compliant with IS 10500 standards. Amber pins indicate sources requiring boiling or filtration.
          </p>
        </div>
      </div>
    </div>
  );
}
