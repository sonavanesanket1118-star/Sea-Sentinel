'use client';

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Download,
  AlertTriangle,
  ShieldCheck,
  MapPin,
  Calendar,
  Sparkles,
  PieChart as PieIcon,
  Layers,
  Activity,
} from 'lucide-react';
import {
  DEBRIS_TYPE_DISTRIBUTION,
  RISK_DISTRIBUTION,
  MONTHLY_ANALYTICS_DATA,
  TOP_HOTSPOTS,
  CONFIDENCE_CURVE_DATA,
  OVERALL_STATS,
} from '../../data/mock';
import { useDemo } from '../../context/DemoContext';

export default function AnalyticsPage() {
  const { showToast } = useDemo();
  const [timeRange, setTimeRange] = useState<'12M' | '6M' | '30D'>('12M');

  // Custom Tooltip for dark ocean command center theme
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-ocean-900 border border-sonar-cyan/40 p-2.5 rounded-lg shadow-2xl font-mono text-xs text-command-text">
          <p className="font-bold text-sonar-cyan mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></span>
              <span className="text-command-muted">{entry.name}:</span>
              <span className="font-bold">{entry.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleExportData = () => {
    showToast('Analytics Dataset Exported (CSV & GeoJSON Hydrographic Manifest)');
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-ocean-950 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Top Header & Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ocean-border/60 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-sonar-cyan">
            <span>COMMAND INTELLIGENCE</span>
            <span>/</span>
            <span>ACOUSTIC SURVEY METRICS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-command-text mt-0.5">
            Benthic Debris & Anomaly Analytics
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          {/* Time range selector */}
          <div className="bg-ocean-900 border border-ocean-border rounded-lg p-1 flex items-center space-x-1 font-mono text-xs">
            {(['12M', '6M', '30D'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  timeRange === r
                    ? 'bg-sonar-cyan text-ocean-950 font-bold shadow-sonar-cyan'
                    : 'text-command-muted hover:text-command-text'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportData}
            className="px-4 py-2 rounded-lg bg-ocean-800 hover:bg-ocean-700 border border-sonar-cyan/40 text-sonar-cyan font-mono text-xs font-bold flex items-center space-x-2 shadow-sonar-cyan transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT CSV DATA</span>
          </button>
        </div>
      </div>

      {/* 1. TOP SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-ocean-border space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-command-muted">
            <span>TOTAL SURVEYS</span>
            <Activity className="w-4 h-4 text-sonar-cyan" />
          </div>
          <div className="text-3xl font-mono font-bold text-command-text">
            {OVERALL_STATS.totalSurveys}
          </div>
          <div className="text-[11px] font-mono text-sonar-green flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% YoY hydrographic coverage</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-ocean-border space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-command-muted">
            <span>OBJECTS DETECTED</span>
            <Layers className="w-4 h-4 text-sonar-green" />
          </div>
          <div className="text-3xl font-mono font-bold text-sonar-cyan glow-text-cyan">
            {OVERALL_STATS.totalObjectsDetected.toLocaleString()}
          </div>
          <div className="text-[11px] font-mono text-command-muted">
            Across 20 Peninsular Coastal Sectors
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-ocean-border space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-command-muted">
            <span>MODEL ACCURACY (mAP)</span>
            <ShieldCheck className="w-4 h-4 text-sonar-green" />
          </div>
          <div className="text-3xl font-mono font-bold text-sonar-green glow-text-green">
            {OVERALL_STATS.modelAccuracy}
          </div>
          <div className="text-[11px] font-mono text-command-muted">
            Validated against NIO Goa ground truth
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-ocean-border space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-command-muted">
            <span>CRITICAL ALERTS</span>
            <AlertTriangle className="w-4 h-4 text-sonar-red" />
          </div>
          <div className="text-3xl font-mono font-bold text-sonar-red glow-text-red">
            {OVERALL_STATS.criticalAlerts}
          </div>
          <div className="text-[11px] font-mono text-sonar-red font-bold">
            Ordnance & Ghost Nets active
          </div>
        </div>
      </div>

      {/* 2. MAIN CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Debris by Type (Bar Chart) - 7 cols */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-ocean-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-display font-bold text-command-text flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-sonar-cyan" />
                <span>Marine Debris Classification Breakdown</span>
              </h2>
              <p className="text-xs text-command-muted">
                Cumulative objects identified by YOLOv8m-Sonar Neural Network
              </p>
            </div>
            <span className="text-[10px] font-mono text-sonar-cyan">3,842 TOTAL</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEBRIS_TYPE_DISTRIBUTION} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" opacity={0.5} />
                <XAxis
                  dataKey="name"
                  stroke="#7B8FAD"
                  fontSize={10}
                  tickLine={false}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                />
                <YAxis stroke="#7B8FAD" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {DEBRIS_TYPE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Risk Distribution (Donut Chart) - 5 cols */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-ocean-border space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-display font-bold text-command-text flex items-center space-x-2">
              <PieIcon className="w-4 h-4 text-sonar-green" />
              <span>Environmental Risk Distribution</span>
            </h2>
            <p className="text-xs text-command-muted">
              Proportion of detected targets by cleanup priority
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={RISK_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {RISK_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Donut Legend */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs pt-2 border-t border-ocean-border">
            {RISK_DISTRIBUTION.map((item) => (
              <div key={item.name} className="space-y-0.5">
                <div className="flex items-center justify-center space-x-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-[10px] text-command-muted truncate">{item.name.split(' ')[0]}</span>
                </div>
                <div className="font-bold text-command-text text-sm">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Detections Over Time (Area Chart) - 7 cols */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-ocean-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-display font-bold text-command-text flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-sonar-cyan" />
                <span>Detection & Survey Trends (Last 12 Months)</span>
              </h2>
              <p className="text-xs text-command-muted">
                Total monthly detections vs. ghost net discovery rate (sq km covered)
              </p>
            </div>
            <span className="text-[10px] font-mono text-sonar-green">ACTIVE TIME-SERIES</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorNets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" opacity={0.5} />
                <XAxis dataKey="month" stroke="#7B8FAD" fontSize={10} tickLine={false} />
                <YAxis stroke="#7B8FAD" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="totalDetections"
                  name="Total Debris"
                  stroke="#00E5FF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
                <Area
                  type="monotone"
                  dataKey="ghostNets"
                  name="Ghost Nets"
                  stroke="#FF4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorNets)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Confidence Score Histogram (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-ocean-border space-y-4">
          <div>
            <h2 className="text-base font-display font-bold text-command-text flex items-center space-x-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Confidence Score Distribution Curve</span>
            </h2>
            <p className="text-xs text-command-muted">
              Probability histogram of bounding box predictions
            </p>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CONFIDENCE_CURVE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8844FF" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#8844FF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" opacity={0.5} />
                <XAxis dataKey="confidence" stroke="#7B8FAD" fontSize={10} tickLine={false} />
                <YAxis stroke="#7B8FAD" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Predictions"
                  stroke="#8844FF"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorConf)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. TOP 5 COASTAL HOTSPOTS (12 cols) */}
        <div className="lg:col-span-12 glass-panel p-6 rounded-2xl border border-ocean-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-display font-bold text-command-text flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-sonar-red" />
                <span>Top 5 High-Density Debris Hotspots</span>
              </h2>
              <p className="text-xs text-command-muted">
                Ranked by cumulative threat index and proximity to coral ecosystems
              </p>
            </div>
            <span className="text-xs font-mono text-sonar-red font-bold">
              URGENT INTERVENTION QUEUE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
            {TOP_HOTSPOTS.map((hotspot, idx) => (
              <div
                key={hotspot.name}
                className="bg-ocean-900 p-4 rounded-xl border border-ocean-border space-y-2 relative"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-sonar-cyan font-bold">#{idx + 1} HOTSPOT</span>
                  <span className="text-sonar-red font-bold">{hotspot.riskScore}/100</span>
                </div>
                <h3 className="font-display font-bold text-sm text-command-text">
                  {hotspot.name}
                </h3>
                <p className="text-[11px] text-command-muted">{hotspot.region}</p>
                <div className="pt-2 border-t border-ocean-border/60 flex items-center justify-between text-[10px] font-mono">
                  <span>{hotspot.count} Targets</span>
                  <span className="text-sonar-amber font-bold">{hotspot.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
