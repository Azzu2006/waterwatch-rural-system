import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReceiptModal from './components/ReceiptModal';
import HomeModule from './modules/HomeModule';
import QualityAssessmentModule from './modules/QualityAssessmentModule';
import ComplaintModule from './modules/ComplaintModule';
import TrackingModule from './modules/TrackingModule';
import SupplyScheduleModule from './modules/SupplyScheduleModule';
import SourceFinderModule from './modules/SourceFinderModule';
import CalculatorModule from './modules/CalculatorModule';
import SurveyModule from './modules/SurveyModule';
import ConservationModule from './modules/ConservationModule';
import AdminDashboard from './modules/AdminDashboard';
import { TRANSLATIONS } from './i18n/translations';
import { 
  initDB, 
  getVillages, 
  getWaterSources, 
  getComplaints, 
  getSchedules, 
  getQualityReports, 
  getSurveys, 
  resetDemoData 
} from './db/storage';

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('home');
  const [trackingQuery, setTrackingQuery] = useState('');
  const [receiptComplaint, setReceiptComplaint] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Data states
  const [villages, setVillages] = useState([]);
  const [sources, setSources] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [qualityReports, setQualityReports] = useState([]);
  const [surveys, setSurveys] = useState([]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const refreshAllData = () => {
    setVillages(getVillages());
    setSources(getWaterSources());
    setComplaints(getComplaints());
    setSchedules(getSchedules());
    setQualityReports(getQualityReports());
    setSurveys(getSurveys());
  };

  useEffect(() => {
    initDB();
    refreshAllData();

    // Listen for custom event whenever storage changes
    const handleStorageUpdate = () => {
      refreshAllData();
    };
    window.addEventListener('waterwatch_db_updated', handleStorageUpdate);

    return () => {
      window.removeEventListener('waterwatch_db_updated', handleStorageUpdate);
    };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const handleComplaintCreated = (newComp) => {
    refreshAllData();
    setReceiptComplaint(newComp);
    showToast(`Grievance registered: ${newComp.id}`);
  };

  const handleTrackNowFromReceipt = (id) => {
    setReceiptComplaint(null);
    setTrackingQuery(id);
    setActiveTab('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all data back to the clean demonstration baseline?")) {
      resetDemoData();
      refreshAllData();
      showToast("Demo data reset to clean baseline.");
    }
  };

  const statsData = {
    totalSources: sources.length,
    totalComplaints: complaints.length,
    resolvedComplaints: complaints.filter(c => c.status === 'Resolved').length
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f9fd] text-slate-800 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-navy-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-sky-400/40 text-xs font-semibold flex items-center space-x-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
        setLang={setLang} 
        t={t} 
      />

      {/* Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'home' && (
          <HomeModule 
            setActiveTab={setActiveTab} 
            t={t} 
            statsData={statsData} 
          />
        )}

        {activeTab === 'quality' && (
          <QualityAssessmentModule 
            t={t} 
            villages={villages} 
            onReportSaved={() => {
              refreshAllData();
              showToast("Water test recorded in village quality log.");
            }} 
          />
        )}

        {activeTab === 'leakage' && (
          <ComplaintModule 
            t={t} 
            villages={villages} 
            onComplaintCreated={handleComplaintCreated} 
          />
        )}

        {activeTab === 'tracking' && (
          <TrackingModule 
            initialQuery={trackingQuery} 
            t={t} 
            onShowReceipt={(c) => setReceiptComplaint(c)} 
          />
        )}

        {activeTab === 'schedules' && (
          <SupplyScheduleModule 
            t={t} 
            schedules={schedules} 
            villages={villages} 
          />
        )}

        {activeTab === 'sources' && (
          <SourceFinderModule 
            t={t} 
            sources={sources} 
          />
        )}

        {activeTab === 'calculator' && (
          <CalculatorModule 
            t={t} 
          />
        )}

        {activeTab === 'survey' && (
          <SurveyModule 
            t={t} 
            villages={villages} 
            onSurveySubmitted={() => {
              refreshAllData();
              showToast("Survey response recorded. Thank you!");
            }} 
          />
        )}

        {activeTab === 'conservation' && (
          <ConservationModule 
            t={t} 
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard 
            t={t} 
            villages={villages} 
            complaints={complaints} 
            qualityReports={qualityReports} 
            schedules={schedules} 
            surveys={surveys} 
            onDataModified={() => {
              refreshAllData();
              showToast("Administrative update saved.");
            }} 
            onResetData={handleResetData}
          />
        )}

      </main>

      {/* Printable Receipt Modal */}
      {receiptComplaint && (
        <ReceiptModal
          complaint={receiptComplaint}
          onClose={() => setReceiptComplaint(null)}
          onTrackNow={handleTrackNowFromReceipt}
          t={t}
        />
      )}

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        t={t} 
        onResetData={handleResetData} 
      />

    </div>
  );
}
