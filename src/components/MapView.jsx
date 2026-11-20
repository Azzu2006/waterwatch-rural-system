import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Filter, Droplet, ShieldCheck, AlertCircle, Phone, Info } from 'lucide-react';

export default function MapView({ sources, t }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const [filterType, setFilterType] = useState('ALL');
  const [filterSafety, setFilterSafety] = useState('ALL');
  const [selectedSource, setSelectedSource] = useState(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on Andhra Pradesh / Rural cluster area (approx 13.6288, 79.4192)
    const map = L.map(mapContainerRef.current, {
      center: [13.6288, 79.4192],
      zoom: 12,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when sources or filters change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    const filtered = (sources || []).filter((s) => {
      if (filterType !== 'ALL' && s.type !== filterType) return false;
      if (filterSafety !== 'ALL' && s.status !== filterSafety) return false;
      return true;
    });

    filtered.forEach((source) => {
      const isSafe = source.status === 'Safe';
      const isModerate = source.status === 'Moderate Risk';
      const color = isSafe ? '#16a34a' : isModerate ? '#d97706' : '#dc2626';

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background-color: ${color};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 13px;
          ">
            💧
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });

      const marker = L.marker([source.lat, source.lng], { icon: customIcon });

      const popupHtml = `
        <div style="font-family: inherit; font-size: 12px; min-width: 200px; padding: 4px;">
          <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold; color: #0c2d48;">${source.name}</h4>
          <p style="margin: 0 0 6px 0; color: #64748b; font-size: 11px;">📍 ${source.village} (${source.type})</p>
          <div style="margin-bottom: 6px;">
            <span style="
              display: inline-block;
              padding: 2px 8px;
              border-radius: 4px;
              font-weight: bold;
              font-size: 10px;
              background-color: ${isSafe ? '#dcfce7' : isModerate ? '#fef3c7' : '#fee2e2'};
              color: ${isSafe ? '#15803d' : isModerate ? '#b45309' : '#b91c1c'};
            ">
              ${source.status} (WQI: ${source.qualityScore || '--'})
            </span>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 6px;">
            <tr><td style="color:#64748b;">pH Level:</td><td><strong>${source.ph}</strong></td></tr>
            <tr><td style="color:#64748b;">TDS:</td><td><strong>${source.tds} ppm</strong></td></tr>
            <tr><td style="color:#64748b;">Turbidity:</td><td><strong>${source.turbidity} NTU</strong></td></tr>
            <tr><td style="color:#64748b;">Tested:</td><td>${source.lastTested}</td></tr>
          </table>
          <p style="margin: 4px 0 0 0; font-size: 10px; color: #0369a1;">Operated by: ${source.operator || 'Gram Panchayat'}</p>
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.on('click', () => {
        setSelectedSource(source);
      });

      markersLayerRef.current.addLayer(marker);
    });
  }, [sources, filterType, filterSafety]);

  const handleCenterOnSource = (source) => {
    setSelectedSource(source);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([source.lat, source.lng], 15, { duration: 1.2 });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4 sm:p-6 space-y-4">
      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-start md:items-center bg-slate-50 p-3 rounded-xl border border-slate-200/60">
        <div className="flex items-center space-x-2 text-xs font-semibold text-navy-900">
          <Filter className="w-4 h-4 text-sky-600" />
          <span>Filter Sources:</span>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {/* Source Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 outline-none focus:ring-1 focus:ring-sky-500 font-medium"
          >
            <option value="ALL">All Source Types</option>
            <option value="RO Plant">RO Water Plant</option>
            <option value="Borewell">Deep Borewell</option>
            <option value="Community Tap">Community Standpost</option>
            <option value="Solar Borewell">Solar Borewell</option>
            <option value="Open Well">Open Well</option>
            <option value="Hand Pump">Hand Pump</option>
          </select>

          {/* Safety Rating Filter */}
          <select
            value={filterSafety}
            onChange={(e) => setFilterSafety(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 outline-none focus:ring-1 focus:ring-sky-500 font-medium"
          >
            <option value="ALL">All Safety Ratings</option>
            <option value="Safe">🟢 Safe for Drinking</option>
            <option value="Moderate Risk">🟡 Requires Boiling / Filter</option>
            <option value="Unsafe">🔴 Unsafe / Contaminated</option>
          </select>
        </div>
      </div>

      {/* Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map Container */}
        <div className="lg:col-span-2 h-[420px] rounded-xl overflow-hidden border border-slate-200 relative shadow-inner">
          <div ref={mapContainerRef} className="w-full h-full" />
          
          {/* Map Legend Overlay */}
          <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-sm p-2.5 rounded-lg shadow-md border border-slate-200 text-[11px] space-y-1">
            <span className="font-bold text-navy-900 block mb-1">Water Quality Key (IS 10500)</span>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span className="text-slate-700 font-medium">Safe Drinking (WQI &gt; 80)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-slate-700 font-medium">Moderate (Boil / Filter)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              <span className="text-slate-700 font-medium">Unfit / Critical Hazard</span>
            </div>
          </div>
        </div>

        {/* Source Cards Sidebar */}
        <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider pb-1">
            Verified Drinking Points ({sources?.length || 0})
          </div>
          
          {(sources || []).map((source) => {
            const isSelected = selectedSource?.id === source.id;
            const isSafe = source.status === 'Safe';
            const isModerate = source.status === 'Moderate Risk';

            return (
              <div
                key={source.id}
                onClick={() => handleCenterOnSource(source)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-sky-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h5 className="font-bold text-navy-900">{source.name}</h5>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isSafe ? 'bg-emerald-100 text-emerald-800' :
                    isModerate ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {source.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-2">
                  📍 {source.village} • {source.type} {source.depthMeters > 0 ? `(${source.depthMeters}m depth)` : ''}
                </p>

                <div className="grid grid-cols-3 gap-1 bg-white p-1.5 rounded-lg border border-slate-100 text-center font-mono text-[10px]">
                  <div>
                    <span className="text-slate-400 block text-[9px]">pH</span>
                    <strong className="text-slate-700">{source.ph}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">TDS</span>
                    <strong className="text-slate-700">{source.tds}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">Turbidity</span>
                    <strong className="text-slate-700">{source.turbidity}</strong>
                  </div>
                </div>

                <div className="mt-2 flex justify-between items-center text-[10px] text-sky-700 font-medium">
                  <span>Tested: {source.lastTested}</span>
                  <span className="underline">Center on Map →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
