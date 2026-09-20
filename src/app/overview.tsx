'use client';

import React from 'react';
import Link from 'next/link';
import {
  Radio,
  MapPin,
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
  Waves,
  Eye,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Anchor,
  Globe,
  Terminal,
  Activity,
} from 'lucide-react';
import RadarCanvas from '../components/RadarCanvas';
import { DEBRIS_CLASSES, OVERALL_STATS } from '../data/mock';

export default function OverviewPage() {
  return (
    <div className="flex flex-col items-center w-full overflow-hidden bg-ocean-950">
      {/* 1. HERO SECTION WITH RADAR SWEEP */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 sonar-radial-bg">
        {/* Background Grid & Ambient Glows */}
        <div className="absolute inset-0 sonar-grid-bg opacity-30 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sonar-cyan/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Ministry / SIH Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-ocean-800/80 border border-sonar-cyan/40 backdrop-blur-md shadow-sonar-cyan">
              <span className="w-2 h-2 rounded-full bg-sonar-cyan animate-ping"></span>
              {/* <span className="text-xs font-mono font-bold text-sonar-cyan tracking-wide">
                SMART INDIA HACKATHON 2025 GRAND FINALE
              </span> */}
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-command-text tracking-tight leading-tight">
              SONARGUARD <span className="text-sonar-cyan glow-text-cyan">AI</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-display font-medium text-command-text/90 leading-snug">
              AI-Powered Marine Debris & Acoustic Anomaly Detection using Side-Scan Sonar Imagery
            </p>

            {/* Tagline */}
            <p className="text-sm sm:text-base text-command-muted font-sans max-w-2xl leading-relaxed">
              Protecting India&apos;s <span className="text-sonar-cyan font-bold font-mono">7,516 km</span> Coastline
              with deep learning object localization, acoustic shadow height estimation, and autonomous risk prioritization.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/dashboard"
                className="px-6 py-3.5 rounded-xl bg-sonar-cyan hover:bg-sonar-cyan/90 text-ocean-950 font-display font-bold text-sm shadow-sonar-cyan-lg flex items-center space-x-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>LAUNCH DETECTION CENTER</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/map"
                className="px-6 py-3.5 rounded-xl bg-ocean-800/90 hover:bg-ocean-700 text-command-text border border-ocean-border hover:border-sonar-cyan/50 font-display font-semibold text-sm flex items-center space-x-2 transition-all"
              >
                <MapPin className="w-4 h-4 text-sonar-cyan" />
                <span>VIEW COASTLINE GIS MAP</span>
              </Link>
            </div>

            {/* Micro Badge */}
            <div className="pt-2 flex items-center justify-center lg:justify-start space-x-4 text-xs font-mono text-command-muted">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sonar-green" />
                <span>YOLOv8m-Sonar Model</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sonar-green" />
                <span>Zero Latency Local Inference</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sonar-green" />
                <span>UN SDG 14 Aligned</span>
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Live Radar Canvas Display */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[480px] p-2 rounded-2xl bg-ocean-900/60 border border-ocean-border/80 shadow-2xl backdrop-blur-md">
              <RadarCanvas className="w-full aspect-square" />

              {/* Bottom Radar Telemetry Status Bar */}
              <div className="mt-2.5 p-3 rounded-xl bg-ocean-850 border border-ocean-border flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-sonar-green animate-pulse" />
                  <span className="text-command-text font-bold">RADAR SWEEP ACTIVE</span>
                </div>
                <div className="text-sonar-cyan">RANGE: 1000m CHIRP</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ANIMATED STATS COUNTER STRIP */}
      <section className="w-full bg-ocean-900 border-y border-ocean-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-mono font-bold text-sonar-cyan glow-text-cyan">
              {OVERALL_STATS.coastlineKm}
            </div>
            <p className="text-xs font-mono uppercase text-command-muted tracking-wider">
              Indian Coastline Monitored
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-mono font-bold text-sonar-red glow-text-red">
              {OVERALL_STATS.debrisPerYear}
            </div>
            <p className="text-xs font-mono uppercase text-command-muted tracking-wider">
              Marine Debris / Year in Oceans
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-mono font-bold text-sonar-amber">
              {OVERALL_STATS.marineDeaths}
            </div>
            <p className="text-xs font-mono uppercase text-command-muted tracking-wider">
              Annual Marine Life Deaths
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-mono font-bold text-sonar-green glow-text-green">
              {OVERALL_STATS.modelAccuracy}
            </div>
            <p className="text-xs font-mono uppercase text-command-muted tracking-wider">
              Autonomous Detection Accuracy
            </p>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM & SOLUTION CARDS (CRISIS / GAP / SOLUTION) */}
      <section className="w-full max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-ocean-800 text-sonar-cyan text-xs font-mono border border-sonar-cyan/30">
            <Shield className="w-3.5 h-3.5" />
            <span>THE NATIONAL CHALLENGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-command-text">
            Autonomous Underwater Threat Intelligence
          </h2>
          <p className="text-sm text-command-muted leading-relaxed">
            Bridging the critical gap between raw acoustic side-scan sonar feeds and instantaneous naval cleanup actions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: The Crisis */}
          <div className="glass-panel p-6 rounded-2xl border border-ocean-border hover:border-sonar-red/40 transition-all hover:shadow-sonar-red space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-sonar-red/10 border border-sonar-red/30 flex items-center justify-center text-sonar-red">
              <Waves className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-command-text group-hover:text-sonar-red transition-colors flex items-center space-x-2">
              <span>01. The Crisis</span>
            </h3>
            <p className="text-xs text-command-muted leading-relaxed">
              India is among the world&apos;s top 12 marine polluters. Synthetic ghost nets, industrial tires, lost shipping containers, and historical ordnance choke fragile coral reefs and disrupt vital commercial shipping lanes.
            </p>
            <div className="pt-2 text-[11px] font-mono text-sonar-red flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Ghost nets kill 100K+ marine species yearly</span>
            </div>
          </div>

          {/* Card 2: The Gap */}
          <div className="glass-panel p-6 rounded-2xl border border-ocean-border hover:border-sonar-amber/40 transition-all space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-sonar-amber/10 border border-sonar-amber/30 flex items-center justify-center text-sonar-amber">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-command-text group-hover:text-sonar-amber transition-colors flex items-center space-x-2">
              <span>02. The Gap</span>
            </h3>
            <p className="text-xs text-command-muted leading-relaxed">
              Optical underwater cameras fail in murky, turbid Indian coastal waters. Manual hydrographic acoustic inspection takes 2–3 days per 10km survey with only 60–70% human operator consistency, causing severe backlog.
            </p>
            <div className="pt-2 text-[11px] font-mono text-sonar-amber flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Optical cameras zero visibility below 15m</span>
            </div>
          </div>

          {/* Card 3: Our Solution */}
          <div className="glass-panel-glow p-6 rounded-2xl border border-sonar-cyan/40 hover:border-sonar-cyan transition-all space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-sonar-cyan/15 border border-sonar-cyan/40 flex items-center justify-center text-sonar-cyan shadow-sonar-cyan">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-command-text group-hover:text-sonar-cyan transition-colors flex items-center space-x-2">
              <span>03. Our AI Solution</span>
            </h3>
            <p className="text-xs text-command-muted leading-relaxed">
              SonarGuard AI processes raw SSS waterfall imagery in sub-2 seconds. It pinpoints debris bounding boxes, calculates 3D height using acoustic shadow trigonometry, identifies unknown anomalies, and outputs actionable risk scores.
            </p>
            <div className="pt-2 text-[11px] font-mono text-sonar-green flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>1.4s inference with 87.4% mAP accuracy</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TARGET DETECTION CLASSIFICATION TAXONOMY */}
      <section className="w-full bg-ocean-900 border-y border-ocean-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-sonar-cyan uppercase tracking-wider mb-1">
                COMPREHENSIVE BENTHIC REPERTOIRE
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-command-text">
                8 Specialized Acoustic Debris & Threat Classes
              </h2>
            </div>
            <Link
              href="/dashboard"
              className="text-xs font-mono text-sonar-cyan hover:underline flex items-center space-x-1"
            >
              <span>TEST IN DASHBOARD</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(DEBRIS_CLASSES).map(([key, cls]) => (
              <div
                key={key}
                className="bg-ocean-850 p-4 rounded-xl border border-ocean-border/80 hover:border-ocean-border transition-all space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: cls.color }}
                    ></span>
                    <span className="font-mono font-bold text-xs text-command-text truncate">
                      {cls.name}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      cls.defaultRisk === 'CRITICAL'
                        ? 'bg-sonar-red/20 text-sonar-red'
                        : cls.defaultRisk === 'MODERATE'
                        ? 'bg-sonar-amber/20 text-sonar-amber'
                        : 'bg-sonar-green/20 text-sonar-green'
                    }`}
                  >
                    {cls.defaultRisk}
                  </span>
                </div>

                <p className="text-[11px] text-command-muted leading-tight">
                  {cls.description}
                </p>

                <div className="pt-1 text-[10px] font-mono text-sonar-cyan/70 border-t border-ocean-border/40">
                  Sig: {cls.acousticSignature.substring(0, 45)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. UN SDG 14 "LIFE BELOW WATER" OFFICIAL CERTIFICATION BADGE */}
      <section className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-glow p-8 rounded-3xl border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex flex-col items-center justify-center text-white shadow-xl shrink-0 p-2 text-center">
              <span className="text-xl font-black font-display">14</span>
              <span className="text-[9px] font-bold leading-none uppercase">LIFE BELOW WATER</span>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-sonar-green font-bold flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>UN SUSTAINABLE DEVELOPMENT GOAL 14 COMPLIANT</span>
              </div>
              <h3 className="text-xl font-display font-bold text-command-text">
                Target 14.1: Subsea Debris & Abandoned Fishing Gear Eradication
              </h3>
              <p className="text-xs text-command-muted max-w-2xl leading-relaxed">
                SonarGuard AI directly automates acoustic debris detection for governmental clearance vessels, saving millions of marine organisms and protecting vital blue economy biodiversity along the Indian subcontinent.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-display font-bold text-xs shrink-0 shadow-lg flex items-center space-x-2"
          >
            <span>START AI ANALYSIS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
