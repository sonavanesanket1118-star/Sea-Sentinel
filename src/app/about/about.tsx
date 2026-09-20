'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Cpu,
  Layers,
  ArrowRight,
  Database,
  Code2,
  Anchor,
  Globe2,
  Users,
  Award,
  Sparkles,
  GitBranch,
  Terminal,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export default function AboutPage() {
  const pipelineSteps = [
    {
      step: '01',
      title: 'SSS Raw Sonar Ingestion',
      desc: 'Chirp/Continuous wave acoustic telemetry ingested from 100 kHz & 900 kHz side-scan sonar transducers.',
      tech: 'FastAPI / GDAL / NumPy',
      badge: 'Input Stage',
    },
    {
      step: '02',
      title: 'Preprocessing & Despeckling',
      desc: 'Adaptive Lee/Frost speckle filtering, slant-range geometric correction, and intensity normalization.',
      tech: 'OpenCV / SciPy Sonar Lib',
      badge: 'Signal Cleaning',
    },
    {
      step: '03',
      title: 'YOLOv8m-Sonar Detection',
      desc: 'Modified multi-scale YOLOv8 network trained on acoustic backscatter characteristics with CSPDarknet backbone.',
      tech: 'PyTorch / ONNX Runtime',
      badge: 'Object Localization',
    },
    {
      step: '04',
      title: 'Variational Anomaly Autoencoder',
      desc: 'Deep latent manifold estimator flags uncataloged acoustic anomalies when reconstruction loss d > 0.65.',
      tech: 'VAE / Latent Clustering',
      badge: 'Outlier Detection',
    },
    {
      step: '05',
      title: 'Acoustic Shadow Trigonometry',
      desc: 'Calculates 3D obstacle elevation above seabed using towfish altitude and grazing angle projection physics.',
      tech: 'Geometric Physics Engine',
      badge: '3D Height Math',
    },
    {
      step: '06',
      title: 'GIS Risk & Naval Dispatch',
      desc: 'Integrates geospatial coordinates with coral reef sensitivity layers to compute priority cleanup score.',
      tech: 'Next.js 14 / Leaflet / jsPDF',
      badge: 'Tactical UI',
    },
  ];

  const techStack = [
    { name: 'PyTorch & YOLOv8', category: 'Deep Learning', desc: 'Acoustic object detection and spatial bounding box inference.' },
    { name: 'ONNX Runtime', category: 'Acceleration', desc: 'Sub-second model quantization and low-power edge inference on towfish.' },
    { name: 'FastAPI & Python', category: 'Backend Microservices', desc: 'Asynchronous bathymetric stream processing and GIS endpoint handling.' },
    { name: 'Next.js 14 (App Router)', category: 'Frontend Architecture', desc: 'High-performance React command center interface with SSR & TypeScript.' },
    { name: 'Leaflet & CartoDB', category: 'GIS Geospatial', desc: 'Dark matter bathymetry mapping with real-time Indian coastline coordinates.' },
    { name: 'Recharts', category: 'Data Visualization', desc: 'Real-time telemetry, time-series analysis, and environmental risk charts.' },
    { name: 'jsPDF', category: 'Reporting Engine', desc: 'Automated naval inspection and prioritized recovery dispatch PDFs.' },
    { name: 'Docker & Kubernetes', category: 'Deployment', desc: 'Containerized microservices for naval vessel edge workstations.' },
  ];

  const teamMembers = [
    {
      name: 'Team Leader & Systems Architect',
      role: 'Project Lead',
      focus: 'Hydrographic Integration, Naval Command Pipeline, Project Pitch',
      avatar: '👨‍✈️',
    },
    {
      name: 'Lead AI & Computer Vision Engineer',
      role: 'Deep Learning Lead',
      focus: 'YOLOv8m-Sonar Custom Weights, VAE Anomaly Scoring, ONNX Optimization',
      avatar: '🤖',
    },
    {
      name: 'Hydrographic Data & GIS Specialist',
      role: 'Bathymetry & Mapping',
      focus: 'Acoustic Shadow Physics, Leaflet Geospatial Telemetry, Coordinate Transforms',
      avatar: '🌊',
    },
    {
      name: 'Full-Stack & Systems Engineer',
      role: 'Tactical UI & Cloud',
      focus: 'Next.js 14 Command Center, Real-Time Radar HUD, Automated PDF Reporting',
      avatar: '💻',
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-ocean-950 p-4 sm:p-6 lg:p-8 space-y-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ocean-border/60 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-sonar-cyan">
            <span>TECHNICAL SPECIFICATIONS</span>
            <span>/</span>
            <span>SMART INDIA HACKATHON 2025</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-command-text mt-0.5">
            Architecture, Methodology & Team
          </h1>
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-ocean-900 border border-sonar-cyan/40 text-xs font-mono text-sonar-cyan">
          <Award className="w-4 h-4 text-sonar-green" />
          <span>MINISTRY OF EARTH SCIENCES PROBLEM STATEMENT</span>
        </div>
      </div>

      {/* 1. PROBLEM STATEMENT & BACKGROUND */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-ocean-border space-y-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-sonar-cyan" />
          <h2 className="text-lg sm:text-xl font-display font-bold text-command-text">
            Smart India Hackathon 2025 — Problem Alignment
          </h2>
        </div>
        <div className="text-xs sm:text-sm text-command-muted leading-relaxed space-y-3 font-sans">
          <p>
            <strong className="text-command-text">Problem Statement:</strong> Automated detection, localization, and classification of underwater marine debris (ghost nets, tires, discarded industrial equipment, containers, and unexploded ordnances) using Side-Scan Sonar (SSS) imagery to protect Indian coastal biodiversity and maritime navigation.
          </p>
          <p>
            <strong className="text-command-text">Operational Challenge:</strong> Traditional manual acoustic interpretation takes hydrographers 48–72 hours per 10km survey line. Human fatigue leads to missed submerged ghost nets that trap marine life for decades. SonarGuard AI reduces this time to <strong>under 2 seconds per image</strong> while simultaneously estimating 3D object height from acoustic shadows and scoring environmental risk.
          </p>
        </div>
      </div>

      {/* 2. HIGH-TECH END-TO-END PIPELINE ARCHITECTURE */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-mono text-sonar-cyan uppercase tracking-wider">
              END-TO-END METHODOLOGY
            </div>
            <h2 className="text-2xl font-display font-bold text-command-text">
              SonarGuard AI Processing Pipeline Flow
            </h2>
          </div>
          <span className="text-xs font-mono text-command-muted">
            Raw Waterfall Stream → Classified Dispatch Action
          </span>
        </div>

        {/* Pipeline Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pipelineSteps.map((step) => (
            <div
              key={step.step}
              className="glass-panel p-6 rounded-2xl border border-ocean-border hover:border-sonar-cyan/50 transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-mono font-bold text-sonar-cyan glow-text-cyan">
                  {step.step}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ocean-800 text-sonar-green border border-ocean-border">
                  {step.badge}
                </span>
              </div>
              <h3 className="text-base font-display font-bold text-command-text group-hover:text-sonar-cyan transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-command-muted leading-relaxed">
                {step.desc}
              </p>
              <div className="pt-2 text-[10px] font-mono text-command-text/80 border-t border-ocean-border/60">
                Stack: <span className="text-sonar-cyan">{step.tech}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. TECHNOLOGY STACK MATRIX */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-ocean-border space-y-6">
        <div>
          <div className="text-xs font-mono text-sonar-green uppercase tracking-wider">
            PRODUCTION READY STACK
          </div>
          <h2 className="text-xl font-display font-bold text-command-text">
            Enterprise & Naval Technology Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="bg-ocean-900 p-4 rounded-xl border border-ocean-border space-y-1.5"
            >
              <div className="text-[10px] font-mono text-sonar-cyan uppercase">
                {tech.category}
              </div>
              <h4 className="font-mono font-bold text-xs text-command-text">
                {tech.name}
              </h4>
              <p className="text-[11px] text-command-muted leading-snug">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. TEAM MEMBERS SHOWCASE */}
      <div className="space-y-6">
        <div>
          <div className="text-xs font-mono text-sonar-cyan uppercase tracking-wider">
            DEVELOPED FOR SIH 2025
          </div>
          <h2 className="text-2xl font-display font-bold text-command-text">
            Hackathon Engineering Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-ocean-border hover:border-sonar-cyan/40 transition-all text-center space-y-3"
            >
              <div className="w-16 h-16 rounded-full bg-ocean-800 border border-sonar-cyan/40 flex items-center justify-center text-3xl mx-auto shadow-sonar-cyan">
                {member.avatar}
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-command-text">
                  {member.name}
                </h3>
                <span className="text-[11px] font-mono text-sonar-cyan font-bold">
                  {member.role}
                </span>
              </div>
              <p className="text-[11px] text-command-muted leading-relaxed">
                {member.focus}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Launch Banner */}
      <div className="glass-panel-glow p-8 rounded-3xl border border-sonar-cyan/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1">
          <h3 className="text-xl font-display font-bold text-command-text">
            Ready to Inspect Live Sonar Telemetry?
          </h3>
          <p className="text-xs text-command-muted">
            Launch the detection center to test real-time YOLOv8 bounding boxes and acoustic shadow calculations.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-xl bg-sonar-cyan hover:bg-sonar-cyan/90 text-ocean-950 font-display font-bold text-xs shadow-sonar-cyan-lg flex items-center space-x-2 shrink-0 transition-all"
        >
          <span>OPEN DETECTION DASHBOARD</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
