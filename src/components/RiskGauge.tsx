'use client';

import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';

interface RiskGaugeProps {
  score: number; // 0 to 100
  cleanupPriority: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  recommendation?: string;
}

export default function RiskGauge({ score, cleanupPriority, recommendation }: RiskGaugeProps) {
  // Determine color and status
  let color = '#00FF88';
  let statusText = 'LOW ENVIRONMENTAL RISK';
  let badgeBg = 'bg-sonar-green/15 text-sonar-green border-sonar-green/40';

  if (score >= 70) {
    color = '#FF3D3D';
    statusText = 'CRITICAL BENTHIC THREAT';
    badgeBg = 'bg-sonar-red/15 text-sonar-red border-sonar-red/40 animate-pulse';
  } else if (score >= 40) {
    color = '#FFB800';
    statusText = 'MODERATE CLEARANCE PRIORITY';
    badgeBg = 'bg-sonar-amber/15 text-sonar-amber border-sonar-amber/40';
  }

  // SVG Gauge calculations
  const radius = 54;
  const circumference = Math.PI * radius; // Half circle gauge
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-ocean-850 rounded-xl border border-ocean-border p-4 shadow-lg flex flex-col items-center text-center">
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-ocean-border/60">
        <span className="text-xs font-mono font-bold text-command-text uppercase tracking-wider flex items-center space-x-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-sonar-cyan" />
          <span>Environmental Risk Matrix</span>
        </span>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${badgeBg}`}>
          {cleanupPriority}
        </span>
      </div>

      {/* Circular Half-Gauge SVG */}
      <div className="relative w-44 h-24 mt-2 flex items-center justify-center">
        <svg viewBox="0 0 140 80" className="w-full h-full overflow-visible">
          {/* Background Arc */}
          <path
            d="M 15 70 A 55 55 0 0 1 125 70"
            fill="none"
            stroke="#1E3A5F"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Progress Colored Arc */}
          <path
            d="M 15 70 A 55 55 0 0 1 125 70"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${color}88)`,
            }}
          />

          {/* Center Text */}
          <text
            x="70"
            y="62"
            textAnchor="middle"
            fill="#E8EDF5"
            fontSize="22"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {score}
          </text>
          <text
            x="70"
            y="74"
            textAnchor="middle"
            fill="#7B8FAD"
            fontSize="7"
            fontFamily="monospace"
          >
            INDEX / 100
          </text>
        </svg>
      </div>

      {/* Label and Recommendation */}
      <div className="mt-2 space-y-1">
        <div className="text-xs font-mono font-bold tracking-wider" style={{ color }}>
          {statusText}
        </div>
        <p className="text-[11px] text-command-muted max-w-xs leading-relaxed">
          {recommendation || (
            score >= 70
              ? 'Immediate containment recommended. High risk of marine fauna mortality or navigation obstruction.'
              : score >= 40
              ? 'Schedule for municipal salvage vessel on next coastal patrol cycle.'
              : 'Continuous hydrographic monitoring; zero immediate maritime hazard detected.'
          )}
        </p>
      </div>
    </div>
  );
}
