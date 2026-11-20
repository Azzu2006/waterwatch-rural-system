import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Droplet, 
  AlertTriangle, 
  Phone, 
  CheckCircle2, 
  Search, 
  Radio, 
  Gauge, 
  BatteryMedium,
  BellRing
} from 'lucide-react';

export default function SupplyScheduleModule({ t, schedules, villages }) {
  const [selectedVillage, setSelectedVillage] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = (schedules || []).filter((s) => {
    if (selectedVillage !== 'ALL' && s.village !== selectedVillage) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        s.village.toLowerCase().includes(q) ||
        s.zone.toLowerCase().includes(q) ||
        (s.announcement || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>Rural Water Grid Timings</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
          {t.schedule.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          {t.schedule.subtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="w-full sm:w-auto text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-800 font-semibold outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="ALL">All Villages & Habitations</option>
            {villages.map((v) => (
              <option key={v.id} value={v.name}>{v.name} ({v.mandal})</option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ward, street or lineman..."
            className="w-full text-xs border border-slate-300 rounded-lg pl-9 pr-3 py-2 bg-slate-50 text-slate-800 focus:bg-white outline-none"
          />
        </div>
      </div>

      {/* Schedule Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => {
          const isMaintenance = item.status === 'Maintenance Notice';
          const isActive = item.status === 'Active';

          return (
            <div 
              key={item.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4 transition-all ${
                isMaintenance 
                  ? 'border-amber-300 bg-amber-50/20' 
                  : 'border-sky-100 hover:border-sky-300'
              }`}
            >
              <div>
                {/* Card Top */}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                      {item.village}
                    </span>
                    <h4 className="text-base font-bold text-navy-950 mt-1">{item.zone}</h4>
                  </div>
                  
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 ${
                    isMaintenance ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isMaintenance ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`}></span>
                    <span>{isMaintenance ? 'Notice' : t.schedule.activeNow}</span>
                  </span>
                </div>

                {/* Timing Blocks */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] font-semibold text-slate-500 block mb-0.5">
                      🌅 {t.schedule.morning}
                    </span>
                    <strong className="text-xs text-navy-900 font-mono">
                      {item.morningWindow}
                    </strong>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] font-semibold text-slate-500 block mb-0.5">
                      🌇 {t.schedule.evening}
                    </span>
                    <strong className="text-xs text-navy-900 font-mono">
                      {item.eveningWindow}
                    </strong>
                  </div>
                </div>

                {/* Telemetry Metrics: Pressure and Tank Level */}
                <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Gauge className="w-4 h-4 text-sky-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">{t.schedule.pressure}</span>
                      <span className="font-semibold text-navy-900">{item.pressureLevel}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-600">
                    <BatteryMedium className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">{t.schedule.tankLevel}</span>
                      <span className="font-semibold text-navy-900 font-mono">{item.tankCapacityPercent}% Storage</span>
                    </div>
                  </div>
                </div>

                {/* Announcement Note */}
                {item.announcement && (
                  <div className={`mt-3 p-2.5 rounded-xl text-xs flex items-start space-x-2 ${
                    isMaintenance ? 'bg-amber-100/70 text-amber-900 border border-amber-200' : 'bg-sky-50 text-sky-900'
                  }`}>
                    <BellRing className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isMaintenance ? 'text-amber-600' : 'text-sky-600'}`} />
                    <p className="text-[11px] leading-relaxed">{item.announcement}</p>
                  </div>
                )}
              </div>

              {/* Duty Operator Footer */}
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-500 text-[11px]">Lineman: <strong className="text-navy-900">{item.operator}</strong></span>
                <a 
                  href={`tel:${item.phone}`} 
                  className="inline-flex items-center space-x-1 text-sky-700 hover:text-sky-900 font-medium font-mono text-[11px] bg-sky-50 px-2 py-1 rounded"
                >
                  <Phone className="w-3 h-3 text-sky-600" />
                  <span>{item.phone}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white p-8 rounded-2xl border text-center text-xs text-slate-500">
          No village supply schedules matched your filter criteria.
        </div>
      )}
    </div>
  );
}
