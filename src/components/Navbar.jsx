import React, { useState } from 'react';
import { 
  Droplets, 
  FlaskConical, 
  AlertTriangle, 
  Search, 
  Clock, 
  MapPin, 
  Calculator, 
  FileCheck, 
  ShieldCheck, 
  Menu, 
  X,
  Globe,
  Leaf
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, lang, setLang, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Droplets },
    { id: 'quality', label: t.nav.quality, icon: FlaskConical },
    { id: 'leakage', label: t.nav.leakage, icon: AlertTriangle },
    { id: 'tracking', label: t.nav.tracking, icon: Search },
    { id: 'schedules', label: t.nav.schedules, icon: Clock },
    { id: 'sources', label: t.nav.sources, icon: MapPin },
    { id: 'calculator', label: t.nav.calculator, icon: Calculator },
    { id: 'survey', label: t.nav.survey, icon: FileCheck },
    { id: 'conservation', label: t.nav.conservation, icon: Leaf },
    { id: 'admin', label: t.nav.admin, icon: ShieldCheck, highlight: true },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-sm">
      {/* Top Government/Community Service Ribbon */}
      <div className="bg-navy-900 text-sky-100 text-xs py-1.5 px-4 font-medium flex justify-between items-center border-b border-navy-800">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white">Rural Water Governance Portal</span>
          <span className="hidden sm:inline text-sky-300">| National Rural Drinking Water Mission Standards (IS 10500)</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline text-sky-300">Helpline: <strong className="text-white">1800-425-5555</strong></span>
          {/* Language Switcher */}
          <div className="flex items-center bg-navy-800 rounded px-1.5 py-0.5 border border-sky-700/50">
            <Globe className="w-3.5 h-3.5 mr-1 text-sky-300" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-white text-xs font-semibold cursor-pointer outline-none"
              aria-label="Select Language"
            >
              <option value="en" className="text-slate-900">English</option>
              <option value="te" className="text-slate-900">తెలుగు (Telugu)</option>
              <option value="hi" className="text-slate-900">हिन्दी (Hindi)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo & Name */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-navy-900">WaterWatch</span>
                <span className="text-[10px] font-semibold bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded uppercase tracking-wider">Rural</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Safe Water, Healthy Villages</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm'
                      : item.highlight
                      ? 'bg-navy-900 text-white hover:bg-navy-800'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.highlight ? 'text-sky-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-sky-600 hover:bg-sky-50 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-sky-100 shadow-xl px-4 pt-2 pb-6 space-y-1">
          <div className="mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold uppercase">Menu Navigation</span>
            <div className="flex items-center text-xs text-sky-700 bg-sky-50 px-2 py-1 rounded">
              <Globe className="w-3.5 h-3.5 mr-1" />
              <span>{lang === 'te' ? 'తెలుగు' : lang === 'hi' ? 'हिन्दी' : 'English'}</span>
            </div>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sky-600 text-white font-semibold'
                    : item.highlight
                    ? 'bg-navy-900 text-white'
                    : 'text-slate-700 hover:bg-sky-50 hover:text-sky-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-sky-300' : 'text-sky-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
