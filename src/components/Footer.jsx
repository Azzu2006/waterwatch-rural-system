import React from 'react';
import { Droplets, Phone, Shield, FileText, RefreshCw, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function Footer({ setActiveTab, t, onResetData }) {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-12 pb-8 border-t border-navy-900 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-navy-800">
          
          {/* Col 1: Project Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center text-white">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">WaterWatch</span>
                <span className="block text-[11px] text-sky-400 font-semibold">Rural Water Governance</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Safe Water, Healthy Villages. A comprehensive smart rural water quality monitoring, complaint tracking, and supply management platform developed for rural communities.
            </p>
            <div className="inline-flex items-center space-x-2 bg-navy-900 text-sky-300 px-3 py-1.5 rounded-md text-xs border border-navy-800">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>IS 10500:2012 Standards</span>
            </div>
          </div>

          {/* Col 2: Citizen Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Citizen Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('quality')} className="hover:text-sky-400 transition-colors">
                  Water Quality Test Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('leakage')} className="hover:text-sky-400 transition-colors">
                  Report Pipeline Leakage / Grievance
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tracking')} className="hover:text-sky-400 transition-colors">
                  Track Grievance Status Live
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('schedules')} className="hover:text-sky-400 transition-colors">
                  Village Water Supply Timings
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sources')} className="hover:text-sky-400 transition-colors">
                  Nearby Clean Water Sources Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-sky-400 transition-colors">
                  Household 55 LPCD Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Governance */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Community & Redressal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('survey')} className="hover:text-sky-400 transition-colors">
                  Village Water Audit Survey
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('conservation')} className="hover:text-sky-400 transition-colors">
                  Rainwater Harvesting & Hygiene Tips
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-sky-400 transition-colors">
                  Gram Panchayat Admin Portal
                </button>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-navy-900 border border-navy-800 text-xs">
              <div className="flex items-center text-emerald-400 font-semibold mb-1">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                <span>Panchayat Water Helpline</span>
              </div>
              <p className="text-white font-mono text-sm">1800-425-5555</p>
              <p className="text-[11px] text-slate-400">Toll-free 24/7 for rural pipeline bursts & contamination alerts</p>
            </div>
          </div>

          {/* Col 4: Academic CSP Evaluation Badge */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Project Evaluation</h4>
            <div className="bg-navy-900/80 p-3.5 rounded-lg border border-sky-900/60 text-xs space-y-2">
              <div className="flex items-center text-sky-300 font-semibold">
                <FileText className="w-3.5 h-3.5 mr-1.5" />
                <span>College CSP Capstone Project</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Demonstration platform simulating rural water grid telemetry, citizen grievance resolution, and community hygiene awareness.
              </p>
              <div className="pt-2 border-t border-navy-800 flex justify-between items-center">
                <span className="text-[10px] text-slate-500">Demo State Persistent</span>
                <button
                  onClick={onResetData}
                  className="inline-flex items-center space-x-1 text-[11px] text-sky-400 hover:text-sky-300 font-medium underline"
                  title="Reset to default clean sample data"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Demo Data</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} WaterWatch – Smart Rural Water Management System. Built for Community Welfare.</p>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <span className="inline-flex items-center text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> All Systems Online
            </span>
            <span className="text-slate-600">|</span>
            <span>English • తెలుగు • हिन्दी</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
