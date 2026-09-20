'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { COASTAL_SURVEY_POINTS, CoastalMarker, DEBRIS_CLASSES } from '../data/mock';
import { useDemo } from '../context/DemoContext';
import { MapPin, Filter, Layers, Flame, ShieldAlert, Waves, Compass, ArrowUpRight } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Dynamic import for Leaflet components to prevent SSR errors
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);
const Circle = dynamic(
  () => import('react-leaflet').then((mod) => mod.Circle),
  { ssr: false }
);
const Rectangle = dynamic(
  () => import('react-leaflet').then((mod) => mod.Rectangle),
  { ssr: false }
);

export default function LeafletMap() {
  const router = useRouter();
  const { setActiveSample, showToast } = useDemo();
  const [isClient, setIsClient] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [showCoverageGrid, setShowCoverageGrid] = useState<boolean>(true);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    import('leaflet').then((leaflet) => {
      setL(leaflet.default);
    });
  }, []);

  if (!isClient || !L) {
    return (
      <div className="w-full h-[600px] bg-ocean-950 rounded-xl border border-ocean-border flex flex-col items-center justify-center font-mono">
        <div className="w-12 h-12 rounded-full border-2 border-sonar-cyan border-t-transparent animate-spin mb-3"></div>
        <div className="text-xs text-sonar-cyan glow-text-cyan">INITIALIZING INDIAN COASTLINE GIS TELEMETRY...</div>
        <div className="text-[11px] text-command-muted mt-1">Loading CartoDB Dark Matter Grid (8°N - 22°N)</div>
      </div>
    );
  }

  // Create custom pulsing Leaflet DivIcons
  const createCustomIcon = (risk: string) => {
    let color = '#00FF88';
    if (risk === 'CRITICAL') color = '#FF3D3D';
    else if (risk === 'MODERATE') color = '#FFB800';
    else if (risk === 'CLEAN') color = '#00E5FF';

    const html = `
      <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
        <span style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: ${color}; opacity: 0.4; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
        <span style="position: relative; width: 12px; height: 12px; border-radius: 50%; background-color: ${color}; border: 2px solid #060D1F; box-shadow: 0 0 10px ${color};"></span>
      </div>
    `;

    return L.divIcon({
      className: 'custom-sonar-marker',
      html,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });
  };

  const filteredPoints = COASTAL_SURVEY_POINTS.filter((pt) => {
    if (selectedRisk === 'ALL') return true;
    return pt.riskLevel === selectedRisk;
  });

  return (
    <div className="relative w-full h-[700px] rounded-xl border border-ocean-border overflow-hidden shadow-2xl flex flex-col">
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Telemetry Stats Pill */}
        <div className="glass-panel px-4 py-2.5 rounded-xl flex items-center space-x-4 pointer-events-auto text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-sonar-green animate-ping"></span>
            <span className="text-command-text font-bold">20 COASTAL SECTORS</span>
          </div>
          <span className="text-ocean-border">|</span>
          <div>
            <span className="text-command-muted">SURVEYED AREA: </span>
            <span className="text-sonar-cyan font-bold">2,450 km²</span>
          </div>
          <span className="text-ocean-border hidden sm:inline">|</span>
          <div className="hidden sm:block">
            <span className="text-command-muted">ACTIVE ALERTS: </span>
            <span className="text-sonar-red font-bold">7 CRITICAL</span>
          </div>
        </div>

        {/* Filter and Layer Actions */}
        <div className="glass-panel px-3 py-1.5 rounded-xl flex items-center space-x-2 pointer-events-auto text-xs font-mono">
          <div className="flex items-center space-x-1 pr-2 border-r border-ocean-border">
            <Filter className="w-3.5 h-3.5 text-sonar-cyan" />
            <span className="text-command-muted text-[11px]">RISK:</span>
            {['ALL', 'CRITICAL', 'MODERATE', 'LOW', 'CLEAN'].map((risk) => (
              <button
                key={risk}
                onClick={() => setSelectedRisk(risk)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                  selectedRisk === risk
                    ? risk === 'CRITICAL'
                      ? 'bg-sonar-red text-white'
                      : risk === 'MODERATE'
                      ? 'bg-sonar-amber text-ocean-950'
                      : risk === 'CLEAN'
                      ? 'bg-sonar-cyan text-ocean-950'
                      : 'bg-sonar-cyan text-ocean-950'
                    : 'text-command-muted hover:text-command-text hover:bg-ocean-800'
                }`}
              >
                {risk}
              </button>
            ))}
          </div>

          {/* Heatmap & Coverage Toggles */}
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-2.5 py-1 rounded text-[11px] font-bold border flex items-center space-x-1.5 transition-colors ${
              showHeatmap
                ? 'bg-sonar-red/15 text-sonar-red border-sonar-red/40'
                : 'bg-ocean-850 text-command-muted border-ocean-border'
            }`}
            title="Toggle Debris Density Heatmap Rings"
          >
            <Flame className="w-3 h-3" />
            <span className="hidden md:inline">Heatmap</span>
          </button>

          <button
            onClick={() => setShowCoverageGrid(!showCoverageGrid)}
            className={`px-2.5 py-1 rounded text-[11px] font-bold border flex items-center space-x-1.5 transition-colors ${
              showCoverageGrid
                ? 'bg-sonar-cyan/15 text-sonar-cyan border-sonar-cyan/40'
                : 'bg-ocean-850 text-command-muted border-ocean-border'
            }`}
            title="Toggle EEZ Survey Boundary"
          >
            <Layers className="w-3 h-3" />
            <span className="hidden md:inline">Coverage Grid</span>
          </button>
        </div>
      </div>

      {/* Map Container */}
      <MapContainer
        center={[15.35, 76.5]} // Centered on Peninsular India & Arabian Sea
        zoom={6}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        {/* CartoDB Dark Matter Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a> Dark Matter | Indian Navy Hydrographic Dept'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={18}
        />

        {/* Survey Coverage Bounding Grids */}
        {showCoverageGrid && (
          <>
            {/* Arabian Sea West Coast Grid */}
            <Rectangle
              bounds={[
                [8.0, 68.5],
                [22.5, 75.5],
              ]}
              pathOptions={{
                color: '#00E5FF',
                weight: 1,
                fillColor: '#00E5FF',
                fillOpacity: 0.04,
                dashArray: '4, 8',
              }}
            />
            {/* Bay of Bengal East Coast Grid */}
            <Rectangle
              bounds={[
                [8.0, 78.0],
                [22.5, 89.5],
              ]}
              pathOptions={{
                color: '#00E5FF',
                weight: 1,
                fillColor: '#00E5FF',
                fillOpacity: 0.04,
                dashArray: '4, 8',
              }}
            />
          </>
        )}

        {/* Mock Heatmap Density Rings */}
        {showHeatmap &&
          filteredPoints.map((pt) => {
            if (pt.riskLevel === 'CLEAN') return null;
            const radius = pt.riskLevel === 'CRITICAL' ? 35000 : 20000;
            const fillColor = pt.riskLevel === 'CRITICAL' ? '#FF3D3D' : '#FFB800';
            return (
              <Circle
                key={`heat-${pt.id}`}
                center={[pt.lat, pt.lng]}
                radius={radius}
                pathOptions={{
                  fillColor,
                  fillOpacity: 0.18,
                  stroke: false,
                }}
              />
            );
          })}

        {/* Coastal Point Markers */}
        {filteredPoints.map((pt) => (
          <Marker
            key={pt.id}
            position={[pt.lat, pt.lng]}
            icon={createCustomIcon(pt.riskLevel)}
          >
            <Popup>
              <div className="w-64 p-3 bg-ocean-900 text-command-text font-sans rounded-lg">
                {/* Header with Risk Badge */}
                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-ocean-border">
                  <span className="font-mono font-bold text-xs text-sonar-cyan">
                    {pt.name}
                  </span>
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      pt.riskLevel === 'CRITICAL'
                        ? 'bg-sonar-red text-white'
                        : pt.riskLevel === 'MODERATE'
                        ? 'bg-sonar-amber text-ocean-950'
                        : pt.riskLevel === 'CLEAN'
                        ? 'bg-sonar-cyan text-ocean-950'
                        : 'bg-sonar-green text-ocean-950'
                    }`}
                  >
                    {pt.riskLevel}
                  </span>
                </div>

                {/* Sonar Thumbnail Preview */}
                <div className="relative w-full h-24 rounded overflow-hidden mb-2 border border-ocean-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pt.thumbnailUrl}
                    alt={pt.name}
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                  <div className="absolute bottom-1 right-1 px-1 rounded bg-ocean-950/80 text-[9px] font-mono text-sonar-cyan">
                    {pt.sonarFrequency}
                  </div>
                </div>

                {/* Target Details */}
                <div className="space-y-1 text-[11px] font-mono mb-2">
                  <div className="flex justify-between text-command-muted">
                    <span>Target:</span>
                    <span className="text-command-text font-bold">{pt.primaryClass}</span>
                  </div>
                  <div className="flex justify-between text-command-muted">
                    <span>Confidence:</span>
                    <span className="text-sonar-green font-bold">{(pt.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-command-muted">
                    <span>Water Depth:</span>
                    <span className="text-command-text">{pt.depth} meters</span>
                  </div>
                  <div className="flex justify-between text-command-muted">
                    <span>Survey Date:</span>
                    <span className="text-command-text">{pt.surveyDate}</span>
                  </div>
                </div>

                <p className="text-[10px] text-command-muted leading-tight mb-2 italic">
                  &quot;{pt.notes}&quot;
                </p>

                {/* Action CTA */}
                <button
                  onClick={() => {
                    showToast(`Loaded SSS telemetry for ${pt.name}`);
                    router.push('/dashboard');
                  }}
                  className="w-full py-1.5 rounded bg-sonar-cyan hover:bg-sonar-cyan/90 text-ocean-950 font-mono font-bold text-[11px] flex items-center justify-center space-x-1 shadow-sonar-cyan transition-transform active:scale-95"
                >
                  <span>INSPECT IN DASHBOARD</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Bottom Map Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] glass-panel p-3 rounded-xl font-mono text-xs text-command-muted space-y-1.5 shadow-2xl">
        <div className="text-[11px] font-bold text-command-text mb-1 uppercase tracking-wider flex items-center space-x-1.5">
          <Compass className="w-3.5 h-3.5 text-sonar-cyan" />
          <span>Naval Acoustic Legend</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sonar-red"></span>
          <span className="text-[10px]">Critical Hazard (Ghost Net / Mine)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sonar-amber"></span>
          <span className="text-[10px]">Moderate Hazard (Containers / Tires)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sonar-green"></span>
          <span className="text-[10px]">Low Hazard (Anchors / Cables)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sonar-cyan"></span>
          <span className="text-[10px]">Clean Surveyed Grid</span>
        </div>
      </div>
    </div>
  );
}
