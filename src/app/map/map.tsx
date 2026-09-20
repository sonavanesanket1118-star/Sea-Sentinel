'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Filter,
  Layers,
  Flame,
  Radio,
  Compass,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Waves,
} from 'lucide-react';
import LeafletMap from '../../components/LeafletMap';
import { COASTAL_SURVEY_POINTS, OVERALL_STATS } from '../../data/mock';

export default function MapPage() {
  const [activeRegion, setActiveRegion] = useState<string>('ALL');

  const regions = [
    'ALL',
    'Arabian Sea (West Coast)',
    'Maharashtra Coast',
    'Bay of Bengal',
    'Tamil Nadu',
    'Andaman & Nicobar',
  ];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-ocean-950 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header & Telemetry Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ocean-border/60 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-sonar-cyan">
            <span>HYDROGRAPHIC GIS COMMAND</span>
            <span>/</span>
            <span>INDIAN PENINSULA BENTHIC TELEMETRY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-command-text mt-0.5">
            Indian Coastline GIS Debris Map
          </h1>
        </div>

        {/* Top 3 Live Stat Widgets */}
        <div className="grid grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-ocean-900 border border-ocean-border">
            <span className="text-[10px] text-command-muted block">Total Survey Area</span>
            <span className="text-sonar-cyan font-bold text-sm">2,450 km²</span>
          </div>
          <div className="p-2.5 rounded-xl bg-ocean-900 border border-ocean-border">
            <span className="text-[10px] text-command-muted block">Active Alerts</span>
            <span className="text-sonar-red font-bold text-sm">7 Critical</span>
          </div>
          <div className="p-2.5 rounded-xl bg-ocean-900 border border-ocean-border">
            <span className="text-[10px] text-command-muted block">Last Sonar Pass</span>
            <span className="text-sonar-green font-bold text-sm">2h 14m ago</span>
          </div>
        </div>
      </div>

      {/* Main Map Component */}
      <div className="w-full">
        <LeafletMap />
      </div>

      {/* Coastal Sector Quick Grid Table */}
      <div className="glass-panel p-6 rounded-2xl border border-ocean-border space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Waves className="w-4 h-4 text-sonar-cyan" />
            <h2 className="text-base font-display font-bold text-command-text">
              Recent Coastal Hydrographic Surveys (20 Sectors)
            </h2>
          </div>
          <span className="text-xs font-mono text-command-muted">
            Indian EEZ Benthic Coverage
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-command-muted">
            <thead>
              <tr className="border-b border-ocean-border bg-ocean-900/80 text-command-text text-[11px]">
                <th className="py-2.5 px-3">Sector Name</th>
                <th className="py-2.5 px-3">Maritime Region</th>
                <th className="py-2.5 px-3">Coordinates</th>
                <th className="py-2.5 px-3">Depth</th>
                <th className="py-2.5 px-3">Primary Target</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3">Survey Date</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ocean-border/40">
              {COASTAL_SURVEY_POINTS.slice(0, 8).map((pt) => (
                <tr key={pt.id} className="hover:bg-ocean-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-command-text">{pt.name}</td>
                  <td className="py-2.5 px-3">{pt.region}</td>
                  <td className="py-2.5 px-3 text-sonar-cyan">
                    {pt.lat}° N, {pt.lng}° E
                  </td>
                  <td className="py-2.5 px-3">{pt.depth}m</td>
                  <td className="py-2.5 px-3 text-command-text">{pt.primaryClass}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        pt.riskLevel === 'CRITICAL'
                          ? 'bg-sonar-red/20 text-sonar-red'
                          : pt.riskLevel === 'MODERATE'
                          ? 'bg-sonar-amber/20 text-sonar-amber'
                          : pt.riskLevel === 'CLEAN'
                          ? 'bg-sonar-cyan/20 text-sonar-cyan'
                          : 'bg-sonar-green/20 text-sonar-green'
                      }`}
                    >
                      {pt.riskLevel}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">{pt.surveyDate}</td>
                  <td className="py-2.5 px-3 text-right">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center space-x-1 text-sonar-cyan hover:underline text-[11px]"
                    >
                      <span>Analyze</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
