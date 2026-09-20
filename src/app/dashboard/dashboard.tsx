'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Sliders,
  Radio,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Download,
  Flame,
  Shield,
  Layers,
  Sparkles,
  Zap,
  Check,
  Send,
  Flag,
  Crosshair,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useDemo } from '../../context/DemoContext';
import { DEBRIS_CLASSES } from '../../data/mock';
import BoundingBoxCanvas from '../../components/BoundingBoxCanvas';
import ShadowAnalysisPanel from '../../components/ShadowAnalysisPanel';
import RiskGauge from '../../components/RiskGauge';
import SamplePicker from '../../components/SamplePicker';
import { generateSonarInspectionPDF } from '../../utils/pdfGenerator';

export default function DashboardPage() {
  const {
    isDemoMode,
    activeSample,
    uploadedImage,
    setUploadedImage,
    detectionResult,
    isAnalyzing,
    selectedDetectionId,
    setSelectedDetectionId,
    confidenceThreshold,
    setConfidenceThreshold,
    detectionMode,
    setDetectionMode,
    sonarFrequency,
    setSonarFrequency,
    runAnalysis,
    showToast,
  } = useDemo();

  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // File Upload Handlers
  const handleFileUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setUploadedImage(url);
      showToast(`Sonar image loaded: ${file.name}`);
      runAnalysis(url);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // Dispatch Cleanup action
  const handleMarkCleanup = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00E5FF', '#00FF88', '#4488FF'],
    });
    showToast('DISPATCH ORDER SENT: Indian Coast Guard & NIO Recovery vessel notified.');
  };

  // Flag for review action
  const handleFlagReview = () => {
    showToast('FLAGGED FOR NAVAL REVIEW: Hydrographic office incident ticket generated.');
  };

  // Export PDF action
  const handleExportPDF = () => {
    if (!detectionResult) {
      showToast('Run analysis first to generate an inspection report.');
      return;
    }
    generateSonarInspectionPDF(detectionResult, {
      locationName: activeSample.location,
      surveyDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      coordinates: `${activeSample.coordinates[0]}° N, ${activeSample.coordinates[1]}° E`,
    });
    showToast('Inspection PDF Report downloaded successfully!');
  };

  const selectedDetection = detectionResult?.detections.find(
    (d) => d.id === selectedDetectionId
  );

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-ocean-950 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Breadcrumb & Demo Mode Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ocean-border/60 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-sonar-cyan">
            <span>COMMAND CONSOLE</span>
            <span>/</span>
            <span>SIDE-SCAN SONAR INFERENCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-command-text mt-0.5">
            Real-Time Sonar Detection Center
          </h1>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-ocean-900 border border-ocean-border flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-sonar-green animate-pulse"></span>
            <span className="text-command-muted">MODEL: </span>
            <span className="text-sonar-cyan font-bold">YOLOv8m-Sonar v2.1</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-ocean-900 border border-ocean-border flex items-center space-x-2">
            <span className="text-command-muted">LATENCY: </span>
            <span className="text-sonar-green font-bold">
              {detectionResult ? `${(detectionResult.processingTimeMs / 1000).toFixed(2)}s` : '1.4s'}
            </span>
          </div>
        </div>
      </div>

      {/* 3-COLUMN COMMAND CENTER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================== */}
        {/* LEFT PANEL (25% / 3 cols): Upload & Mission Settings */}
        {/* ======================================================== */}
        <div className="lg:col-span-3 space-y-5">
          {/* Mission Presets for Quick Testing */}
          <div className="glass-panel p-4 rounded-xl space-y-4">
            <SamplePicker />
          </div>

          {/* Drag and Drop Upload Box */}
          <div className="glass-panel p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-command-text uppercase tracking-wider flex items-center space-x-1.5">
                <Upload className="w-3.5 h-3.5 text-sonar-cyan" />
                <span>Upload Custom Sonar</span>
              </label>
              <span className="text-[10px] font-mono text-command-muted">.PNG, .JPG, .TIF</span>
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-5 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
                isDragOver
                  ? 'border-sonar-cyan bg-sonar-cyan/10'
                  : 'border-ocean-border hover:border-sonar-cyan/60 bg-ocean-900/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/tiff, image/jpg"
                className="hidden"
                onChange={handleFileSelect}
              />
              <div className="w-10 h-10 rounded-full bg-ocean-800 flex items-center justify-center text-sonar-cyan shadow-sonar-cyan">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-command-text">
                  Drop Side-Scan Sonar Image Here
                </p>
                <p className="text-[10px] text-command-muted mt-0.5">
                  or click to browse local files
                </p>
              </div>
            </div>
          </div>

          {/* Pipeline Configuration Parameters */}
          <div className="glass-panel p-4 rounded-xl space-y-4 text-xs font-mono">
            <div className="flex items-center space-x-1.5 text-command-text font-bold uppercase tracking-wider pb-2 border-b border-ocean-border/60">
              <Sliders className="w-3.5 h-3.5 text-sonar-cyan" />
              <span>Pipeline Settings</span>
            </div>

            {/* Confidence Threshold Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-command-muted">Confidence Threshold:</span>
                <span className="text-sonar-cyan font-bold">{confidenceThreshold.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                className="w-full accent-sonar-cyan bg-ocean-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-command-muted">
                <span>0.1 (High Recall)</span>
                <span>1.0 (High Precision)</span>
              </div>
            </div>

            {/* Detection Mode Dropdown */}
            <div className="space-y-1">
              <label className="text-command-muted text-[11px]">Detection Pipeline Mode:</label>
              <select
                value={detectionMode}
                onChange={(e) => setDetectionMode(e.target.value)}
                className="w-full bg-ocean-900 border border-ocean-border rounded-lg p-2 text-xs text-command-text focus:border-sonar-cyan focus:outline-none"
              >
                <option>Full Pipeline (Detection + Anomaly + Shadow)</option>
                <option>Object Detection Only</option>
                <option>Anomaly Detection Only</option>
              </select>
            </div>

            {/* Sonar Frequency */}
            <div className="space-y-1">
              <label className="text-command-muted text-[11px]">Sonar Transducer Frequency:</label>
              <select
                value={sonarFrequency}
                onChange={(e) => setSonarFrequency(e.target.value)}
                className="w-full bg-ocean-900 border border-ocean-border rounded-lg p-2 text-xs text-command-text focus:border-sonar-cyan focus:outline-none"
              >
                <option>High (900 kHz) — High Detail</option>
                <option>Low (100 kHz) — Long Range</option>
                <option>Dual Frequency Fusion</option>
              </select>
            </div>

            {/* Big Glow ANALYZE SONAR Button */}
            <button
              onClick={() => runAnalysis()}
              disabled={isAnalyzing}
              className={`w-full py-3 rounded-xl font-display font-bold text-xs tracking-wider transition-all flex items-center justify-center space-x-2 shadow-sonar-cyan-lg ${
                isAnalyzing
                  ? 'bg-ocean-800 text-command-muted cursor-wait'
                  : 'bg-gradient-to-r from-sonar-cyan to-blue-500 hover:from-sonar-cyan/90 hover:to-blue-400 text-ocean-950 active:scale-95'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-sonar-cyan" />
                  <span>AI PROCESSING INFERENCE...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-ocean-950" />
                  <span>ANALYZE SONAR STREAM</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CENTER PANEL (45% / 5.5 cols): Sonar Canvas + Shadow Math */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Visualizer */}
          <BoundingBoxCanvas
            imageUrl={uploadedImage}
            result={detectionResult}
            isAnalyzing={isAnalyzing}
            selectedId={selectedDetectionId}
            onSelectDetection={setSelectedDetectionId}
          />

          {/* Acoustic Shadow Trigonometry Sub-Panel */}
          <ShadowAnalysisPanel
            selectedDetection={selectedDetection}
            defaultData={detectionResult?.shadowAnalysis}
          />
        </div>

        {/* ======================================================== */}
        {/* RIGHT PANEL (30% / 3.5 cols): Summary, Anomaly & Actions */}
        {/* ======================================================== */}
        <div className="lg:col-span-4 space-y-4">
          {/* Section A: Detection Summary Card */}
          <div className="glass-panel p-4 rounded-xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-ocean-border/60">
              <span className="font-bold text-command-text uppercase tracking-wider flex items-center space-x-1.5">
                <Crosshair className="w-3.5 h-3.5 text-sonar-cyan" />
                <span>Target Summary</span>
              </span>
              <span className="text-sonar-green font-bold">
                {detectionResult ? `${detectionResult.totalObjects} DETECTED` : '0 TARGETS'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-ocean-900 border border-ocean-border">
                <span className="text-[10px] text-command-muted block">Known Objects:</span>
                <span className="text-sonar-cyan font-bold text-sm">
                  {detectionResult?.knownObjects ?? 0}
                </span>
              </div>
              <div className="p-2 rounded bg-ocean-900 border border-ocean-border">
                <span className="text-[10px] text-command-muted block">Unknown Anomalies:</span>
                <span className="text-sonar-red font-bold text-sm">
                  {detectionResult?.unknownAnomalies ?? 0}
                </span>
              </div>
              <div className="p-2 rounded bg-ocean-900 border border-ocean-border">
                <span className="text-[10px] text-command-muted block">Inference Time:</span>
                <span className="text-sonar-green font-bold text-sm">
                  {detectionResult ? `${(detectionResult.processingTimeMs / 1000).toFixed(2)}s` : '0.0s'}
                </span>
              </div>
              <div className="p-2 rounded bg-ocean-900 border border-ocean-border">
                <span className="text-[10px] text-command-muted block">Neural Pipeline:</span>
                <span className="text-command-text font-bold text-xs truncate block">
                  YOLOv8m-Sonar
                </span>
              </div>
            </div>
          </div>

          {/* Section C: Anomaly Alert (If anomaly detected) */}
          {detectionResult?.hasAnomaly && (
            <div className="p-3.5 rounded-xl bg-sonar-red/10 border-2 border-sonar-red animate-pulse shadow-sonar-red space-y-2">
              <div className="flex items-center space-x-2 text-sonar-red font-mono font-bold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>⚠️ UNKNOWN ACOUSTIC ANOMALY DETECTED</span>
              </div>
              <p className="text-[11px] text-command-text font-mono leading-tight">
                Anomaly Outlier Score: <span className="text-sonar-red font-bold">0.87</span> (Latent Threshold: 0.65).
                Acoustic signature does not match standard training classes.
              </p>
              <div className="p-2 rounded bg-ocean-950/80 text-[10px] font-mono text-sonar-amber border border-sonar-amber/30">
                RECOMMENDATION: Dispatch ROV (Remotely Operated Vehicle) for optical inspection.
              </div>
            </div>
          )}

          {/* Section B: Scrollable Detection List */}
          <div className="glass-panel p-4 rounded-xl space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between pb-1 border-b border-ocean-border/60">
              <span className="font-bold text-command-text uppercase tracking-wider">
                Object Detection Feed
              </span>
              <span className="text-[10px] text-command-muted">
                {detectionResult?.detections.length || 0} Targets
              </span>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {detectionResult?.detections.map((det) => {
                const isSelected = selectedDetectionId === det.id;
                const cls = DEBRIS_CLASSES[det.classId] || {
                  color: '#00E5FF',
                  name: det.className,
                };
                return (
                  <div
                    key={det.id}
                    onClick={() => setSelectedDetectionId(isSelected ? null : det.id)}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-ocean-800 border-sonar-cyan shadow-sonar-cyan'
                        : 'bg-ocean-900/80 hover:bg-ocean-800/80 border-ocean-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-1.5 truncate">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: cls.color }}
                        ></span>
                        <span className="font-bold text-command-text text-[11px] truncate">
                          {det.className}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          det.riskLevel === 'CRITICAL'
                            ? 'bg-sonar-red/20 text-sonar-red'
                            : det.riskLevel === 'MODERATE'
                            ? 'bg-sonar-amber/20 text-sonar-amber'
                            : 'bg-sonar-green/20 text-sonar-green'
                        }`}
                      >
                        {det.riskLevel}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1 text-[10px] text-command-muted mt-1">
                      <div>
                        Conf: <span className="text-sonar-green font-bold">{(det.confidence * 100).toFixed(1)}%</span>
                      </div>
                      <div>
                        Est. H: <span className="text-purple-300 font-bold">{det.estimatedHeight}m</span>
                      </div>
                      <div>
                        Shadow: <span className="text-command-text">{det.shadowLength}px</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-command-muted/80 mt-1 italic leading-snug truncate">
                      {det.reason}
                    </p>
                  </div>
                );
              })}

              {!detectionResult && (
                <div className="py-6 text-center text-command-muted text-xs">
                  Run analysis to populate detected target feed.
                </div>
              )}
            </div>
          </div>

          {/* Section D: Environmental Risk Score Gauge */}
          <RiskGauge
            score={detectionResult?.overallRiskScore ?? 84}
            cleanupPriority={detectionResult?.cleanupPriority ?? 'HIGH'}
          />

          {/* Section E: Action Buttons */}
          <div className="space-y-2 pt-1 font-mono text-xs">
            <button
              onClick={handleExportPDF}
              className="w-full py-2.5 rounded-xl bg-ocean-800 hover:bg-ocean-700 text-sonar-cyan border border-sonar-cyan/40 hover:border-sonar-cyan font-bold flex items-center justify-center space-x-2 transition-all shadow-sonar-cyan"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD INSPECTION REPORT (PDF)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleMarkCleanup}
                className="py-2 px-3 rounded-lg bg-sonar-green/15 hover:bg-sonar-green/25 text-sonar-green border border-sonar-green/40 font-bold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Mark for Cleanup</span>
              </button>

              <button
                onClick={handleFlagReview}
                className="py-2 px-3 rounded-lg bg-sonar-amber/15 hover:bg-sonar-amber/25 text-sonar-amber border border-sonar-amber/40 font-bold flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Flag for Review</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
