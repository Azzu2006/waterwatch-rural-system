import React from 'react';
import { 
  Droplets, 
  FlaskConical, 
  AlertTriangle, 
  Search, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  ArrowRight, 
  Sparkles,
  Users,
  Building,
  BellRing
} from 'lucide-react';

export default function HomeModule({ setActiveTab, t, statsData }) {
  const quickActions = [
    {
      id: 'quality',
      title: t.nav.quality,
      desc: "Input pH, TDS, and turbidity to evaluate drinking safety instantly with IS 10500 standards.",
      icon: FlaskConical,
      color: "from-sky-500 to-sky-600",
      btnText: "Check Quality Index"
    },
    {
      id: 'leakage',
      title: t.nav.leakage,
      desc: "Report pipeline leaks, contaminated tap supply, or motor breakdown to your Gram Panchayat.",
      icon: AlertTriangle,
      color: "from-amber-500 to-amber-600",
      btnText: "Register Grievance"
    },
    {
      id: 'tracking',
      title: t.nav.tracking,
      desc: "Enter your unique Grievance ID or phone number to check live inspection and repair milestones.",
      icon: Search,
      color: "from-navy-800 to-navy-900",
      btnText: "Track Status"
    },
    {
      id: 'schedules',
      title: t.nav.schedules,
      desc: "Check morning and evening piped water timings, distribution pressure, and maintenance notices.",
      icon: Clock,
      color: "from-blue-600 to-blue-700",
      btnText: "View Timings"
    },
    {
      id: 'sources',
      title: t.nav.sources,
      desc: "Explore the interactive rural map showing verified RO plants, borewells, and testing scores.",
      icon: MapPin,
      color: "from-emerald-600 to-emerald-700",
      btnText: "Open Water Map"
    },
    {
      id: 'calculator',
      title: t.nav.calculator,
      desc: "Calculate your household consumption and check against the 55 LPCD national guideline.",
      icon: Droplets,
      color: "from-cyan-600 to-cyan-700",
      btnText: "Calculate Footprint"
    }
  ];

  return (
    <div className="space-y-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-sky-50 via-white to-sky-50/50 border border-sky-100 p-8 sm:p-12 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center space-x-2 bg-sky-100/80 border border-sky-200 text-sky-800 px-3 py-1 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Smart Rural Water Quality Monitoring & Water Management</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-950 tracking-tight leading-tight">
            {t.heroHeading}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.heroSubheading}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('quality')}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-md shadow-sky-600/20 flex items-center space-x-2 transition-all hover:translate-y-[-1px]"
            >
              <span>{t.nav.quality}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('leakage')}
              className="bg-white hover:bg-slate-50 text-navy-900 border border-slate-300 font-semibold px-6 py-3 rounded-xl text-sm transition-all"
            >
              <span>{t.nav.leakage}</span>
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className="bg-navy-900 hover:bg-navy-800 text-white font-semibold px-5 py-3 rounded-xl text-sm flex items-center space-x-2 transition-all"
            >
              <Search className="w-4 h-4 text-sky-300" />
              <span>{t.nav.tracking}</span>
            </button>
          </div>

          {/* Academic CSP Badge */}
          <div className="pt-4 flex items-center space-x-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{t.demoBadge}</span>
          </div>
        </div>

        {/* Subtle Water Wave Pattern Graphic */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-sky-200/30 blur-3xl pointer-events-none" />
        <div className="absolute right-12 top-12 hidden md:block opacity-10 pointer-events-none text-sky-800">
          <Droplets className="w-64 h-64" />
        </div>
      </section>

      {/* Live Rural Telemetry Statistics Banner */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sky-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">{t.stats.sourcesMonitored}</span>
            <div className="p-1.5 bg-sky-50 rounded-lg text-sky-600">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-navy-900">
            {statsData?.totalSources || 148}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1 inline" /> 100% Geo-tagged
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sky-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">{t.stats.safePotableRate}</span>
            <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">
            91.4%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">IS 10500 Compliant</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sky-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">{t.stats.complaintsResolved}</span>
            <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-navy-900">
            {statsData?.resolvedComplaints || 342}
            <span className="text-xs text-slate-400 font-normal"> / {statsData?.totalComplaints || 365}</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">93.7% Redressal Rate</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-sky-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">{t.stats.villagesCovered}</span>
            <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-navy-900">
            28
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Chittoor & Tirupati</p>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white p-4 sm:p-5 rounded-2xl border border-sky-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">{t.stats.avgResolutionHours}</span>
            <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-navy-900">
            &lt; 24 <span className="text-sm font-semibold text-slate-500">{t.stats.hours}</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Direct Lineman Alert</p>
        </div>
      </section>

      {/* Quick Services Grid */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-navy-950">Citizen Water Services</h2>
            <p className="text-xs sm:text-sm text-slate-500">Fast, accessible modules designed for rural communities and Gram Panchayats</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div 
                key={action.id}
                onClick={() => setActiveTab(action.id)}
                className="group bg-white p-6 rounded-2xl border border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${action.color} text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-navy-900 group-hover:text-sky-600 transition-colors mb-2">
                    {action.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {action.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600 group-hover:text-sky-700">
                  <span>{action.btnText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* IS 10500 Indian Standard Drinking Water Specification Table */}
      <section className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-navy-950">National Drinking Water Quality Benchmarks</h3>
            <p className="text-xs text-slate-500">Standard acceptable parameters as per Bureau of Indian Standards (IS 10500:2012)</p>
          </div>
          <span className="self-start sm:self-auto text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
            Official Guidelines
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Parameter</th>
                <th className="py-3 px-4">Desirable Limit</th>
                <th className="py-3 px-4">Permissible (No Alternate Source)</th>
                <th className="py-3 px-4">Rural Health Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-3 px-4 font-bold text-navy-900">pH Level</td>
                <td className="py-3 px-4 font-mono font-medium text-emerald-700">6.5 to 8.5</td>
                <td className="py-3 px-4 font-mono">No Relaxation</td>
                <td className="py-3 px-4">Below 6.5 causes pipe corrosion; above 8.5 reduces chlorine disinfection.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-navy-900">Total Dissolved Solids (TDS)</td>
                <td className="py-3 px-4 font-mono font-medium text-emerald-700">&lt; 500 mg/L (ppm)</td>
                <td className="py-3 px-4 font-mono">2000 mg/L (ppm)</td>
                <td className="py-3 px-4">High TDS causes bitter taste, gastrointestinal irritation and kidney stone risks.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-navy-900">Turbidity (NTU)</td>
                <td className="py-3 px-4 font-mono font-medium text-emerald-700">&lt; 1.0 NTU</td>
                <td className="py-3 px-4 font-mono">5.0 NTU</td>
                <td className="py-3 px-4">Suspended clay shields bacteria from sunlight and disinfectants. Must be filtered.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-navy-900">Residual Free Chlorine</td>
                <td className="py-3 px-4 font-mono font-medium text-emerald-700">0.2 mg/L at tap</td>
                <td className="py-3 px-4 font-mono">0.5 mg/L</td>
                <td className="py-3 px-4">Essential to prevent water-borne cholera, typhoid, and diarrhea in pipeline network.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Village Announcement / Alert Bar */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 flex items-start space-x-4">
        <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-sm">
          <BellRing className="w-5 h-5" />
        </div>
        <div className="text-xs space-y-1">
          <h4 className="font-bold text-amber-950 text-sm">Gollapalli Habitation Water Notice</h4>
          <p className="text-amber-800 leading-relaxed">
            Booster pump maintenance is active in Gollapalli. Evening piped supply is rescheduled to 07:00 PM. Meanwhile, clean drinking water can be drawn freely from the Chandanagar Solar RO Plant.
          </p>
        </div>
      </section>

    </div>
  );
}
