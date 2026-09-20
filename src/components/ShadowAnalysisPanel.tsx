'use client';

import React from 'react';
import { Ruler, Compass, Waves, ArrowDownRight, Info } from 'lucide-react';
import { DetectionBox } from '../data/mock';

interface ShadowAnalysisPanelProps {
  selectedDetection?: DetectionBox | null;
  defaultData?: {
    objectHeightM: number;
    shadowLengthPx: number;
    grazingAngleDeg: number;
    sensorAltitudeM: number;
    slantRangeM: number;
  };
}

export default function ShadowAnalysisPanel({
  selectedDetection,
  defaultData = {
    objectHeightM: 2.1,
    shadowLengthPx: 52,
    grazingAngleDeg: 28.5,
    sensorAltitudeM: 14.5,
    slantRangeM: 48.0,
  },
}: ShadowAnalysisPanelProps) {
  const height = selectedDetection?.estimatedHeight ?? defaultData.objectHeightM;
  const shadowPx = selectedDetection?.shadowLength ?? defaultData.shadowLengthPx;
  const angle = selectedDetection?.grazingAngle ?? defaultData.grazingAngleDeg;
  const altitude = defaultData.sensorAltitudeM;
  const slantRange = defaultData.slantRangeM;

  return (
    <div className="bg-ocean-850 rounded-xl border border-ocean-border p-3.5 shadow-inner">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-ocean-border/60">
        <div className="flex items-center space-x-2">
          <Ruler className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-mono font-bold text-command-text uppercase tracking-wider">
            Acoustic Shadow Trigonometry
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
          3D Elevation Math
        </span>
      </div>

      {/* Schematic Diagram + Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        {/* SVG Schematic Drawing */}
        <div className="relative bg-ocean-900 rounded-lg p-2 border border-ocean-border/80 flex items-center justify-center">
          <svg viewBox="0 0 240 100" className="w-full h-24 text-command-muted">
            {/* Seabed Line */}
            <line x1="10" y1="85" x2="230" y2="85" stroke="#1E3A5F" strokeWidth="2" strokeDasharray="3 3" />
            <text x="10" y="96" fill="#7B8FAD" fontSize="8" fontFamily="monospace">Seafloor Datum</text>

            {/* Sonar Transducer (Towfish) */}
            <circle cx="35" cy="20" r="4" fill="#00E5FF" />
            <text x="15" y="14" fill="#00E5FF" fontSize="7.5" fontFamily="monospace">Towfish (H={altitude}m)</text>

            {/* Acoustic Sound Ray */}
            <line x1="35" y1="20" x2="120" y2="60" stroke="#00E5FF" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="35" y1="20" x2="195" y2="85" stroke="#9333EA" strokeWidth="1.2" strokeDasharray="2 2" />

            {/* Debris Obstacle on seabed */}
            <rect x="115" y="60" width="16" height="25" fill="#FF4444" rx="2" />
            <text x="110" y="55" fill="#FF4444" fontSize="8" fontWeight="bold" fontFamily="monospace">Obj (H)</text>

            {/* Acoustic Shadow Void Zone */}
            <polygon points="131,85 195,85 131,60" fill="rgba(147, 51, 234, 0.25)" stroke="#9333EA" strokeWidth="1" />
            <text x="145" y="80" fill="#C084FC" fontSize="7.5" fontFamily="monospace">Shadow (L_s)</text>

            {/* Grazing Angle Arc */}
            <path d="M 60 20 A 25 25 0 0 1 70 30" fill="none" stroke="#FFB800" strokeWidth="1" />
            <text x="75" y="27" fill="#FFB800" fontSize="7.5" fontFamily="monospace">θ = {angle}°</text>
          </svg>
        </div>

        {/* Live Calculation Values */}
        <div className="space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between p-2 rounded bg-ocean-900 border border-ocean-border">
            <span className="text-command-muted flex items-center space-x-1">
              <ArrowDownRight className="w-3.5 h-3.5 text-sonar-cyan" />
              <span>Est. Object Height (H):</span>
            </span>
            <span className="text-sonar-green font-bold text-sm glow-text-green">
              {height} meters
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded bg-ocean-900 border border-ocean-border">
            <span className="text-command-muted flex items-center space-x-1">
              <Ruler className="w-3.5 h-3.5 text-purple-400" />
              <span>Shadow Pixel Extent (L):</span>
            </span>
            <span className="text-purple-300 font-bold">
              {shadowPx} pixels
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded bg-ocean-900 border border-ocean-border">
            <span className="text-command-muted flex items-center space-x-1">
              <Compass className="w-3.5 h-3.5 text-sonar-amber" />
              <span>Acoustic Grazing Angle (θ):</span>
            </span>
            <span className="text-sonar-amber font-bold">
              {angle}°
            </span>
          </div>
        </div>
      </div>

      {/* Physics Formula Footer */}
      <div className="mt-2.5 pt-2 border-t border-ocean-border/60 flex items-center justify-between text-[10px] font-mono text-command-muted">
        <span>FORMULA: H = (L_shadow × Altitude) / Slant_Range</span>
        <span className="text-sonar-cyan">GEO-CALIBRATED</span>
      </div>
    </div>
  );
}
