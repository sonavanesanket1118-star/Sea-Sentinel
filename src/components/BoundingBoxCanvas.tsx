'use client';

import React, { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Layers, Eye, EyeOff, Sparkles, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import { DetectionBox, DEBRIS_CLASSES } from '../data/mock';
import { DetectionResult } from '../utils/detectionEngine';

interface BoundingBoxCanvasProps {
  imageUrl: string | null;
  result: DetectionResult | null;
  isAnalyzing: boolean;
  selectedId: string | null;
  onSelectDetection: (id: string | null) => void;
}

export default function BoundingBoxCanvas({
  imageUrl,
  result,
  isAnalyzing,
  selectedId,
  onSelectDetection,
}: BoundingBoxCanvasProps) {
  const [zoom, setZoom] = useState<number>(1);
  const [showBoxes, setShowBoxes] = useState<boolean>(true);
  const [showShadows, setShowShadows] = useState<boolean>(true);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);
  const [grayscaleBoost, setGrayscaleBoost] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="flex flex-col h-full bg-ocean-900 rounded-xl border border-ocean-border overflow-hidden shadow-2xl">
      {/* Top Canvas Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-ocean-850 border-b border-ocean-border font-mono text-xs">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-sonar-cyan font-bold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>SSS CANOPY FEED</span>
          </span>
          <span className="text-ocean-border">|</span>
          <span className="text-command-muted hidden sm:inline">
            {imageUrl ? 'RESOLUTION: 1024x768 SSS CHIRP' : 'AWAITING TELEMETRY'}
          </span>
        </div>

        {/* View Controls */}
        <div className="flex items-center space-x-2">
          {/* Layer toggles */}
          <button
            onClick={() => setShowBoxes(!showBoxes)}
            className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors flex items-center space-x-1 ${
              showBoxes
                ? 'bg-sonar-cyan/15 text-sonar-cyan border-sonar-cyan/40'
                : 'bg-ocean-800 text-command-muted border-ocean-border'
            }`}
            title="Toggle Bounding Boxes"
          >
            <Layers className="w-3 h-3" />
            <span className="hidden md:inline">Boxes</span>
          </button>

          <button
            onClick={() => setShowShadows(!showShadows)}
            className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors flex items-center space-x-1 ${
              showShadows
                ? 'bg-purple-500/15 text-purple-300 border-purple-500/40'
                : 'bg-ocean-800 text-command-muted border-ocean-border'
            }`}
            title="Toggle Acoustic Shadow Projections"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            <span className="hidden md:inline">Shadows</span>
          </button>

          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors flex items-center space-x-1 ${
              showHeatmap
                ? 'bg-sonar-red/15 text-sonar-red border-sonar-red/40'
                : 'bg-ocean-800 text-command-muted border-ocean-border'
            }`}
            title="Toggle Backscatter Intensity Heatmap"
          >
            <span className="w-2 h-2 rounded-full bg-sonar-red"></span>
            <span className="hidden md:inline">Heatmap</span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center bg-ocean-800 border border-ocean-border rounded">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:text-sonar-cyan transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-[10px] text-command-text select-none">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:text-sonar-cyan transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1 border-l border-ocean-border hover:text-sonar-cyan transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Sonar Viewport */}
      <div
        ref={containerRef}
        className="relative flex-1 bg-ocean-950 flex items-center justify-center overflow-hidden p-4 select-none min-h-[420px]"
      >
        {/* Sonar Grid Overlay */}
        <div className="absolute inset-0 sonar-grid-bg opacity-30 pointer-events-none"></div>

        {/* Central Watermark / Coordinate Crosshair */}
        <div className="absolute top-3 left-3 text-[10px] font-mono text-sonar-cyan/40 pointer-events-none z-10">
          <div>SSS TRANSDUCER ALT: 14.5m</div>
          <div>SWATH WIDTH: 150m (PORT / STBD)</div>
        </div>

        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-sonar-cyan/40 pointer-events-none z-10 text-right">
          <div>SLANT-RANGE CORRECTED</div>
          <div>FREQ: 900 kHz CHIRP</div>
        </div>

        {/* Image Display + Overlays */}
        {imageUrl ? (
          <div
            className="relative transition-transform duration-200 ease-out inline-block max-w-full"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* The Sonar Image with authentic Side-Scan Sonar styling */}
            <div className="relative rounded-lg overflow-hidden border-2 border-sonar-cyan/30 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Side Scan Sonar Feed"
                className={`w-full max-h-[500px] object-cover block transition-all ${
                  grayscaleBoost ? 'grayscale contrast-125 brightness-95' : ''
                }`}
              />

              {/* Sonar Texture Tint Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-blue-950/30 pointer-events-none"></div>

              {/* Intensity Heatmap Overlay Layer */}
              {showHeatmap && (
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-yellow-500/30 to-red-600/40 mix-blend-color-dodge pointer-events-none"></div>
              )}

              {/* Real-time AI Scan Animation Beam */}
              {isAnalyzing && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
                  {/* Moving Laser Sweep Line */}
                  <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-sonar-cyan to-transparent shadow-sonar-cyan animate-scan-line"></div>
                  {/* Sweep Glow Wave */}
                  <div className="absolute inset-0 bg-sonar-cyan/10 animate-pulse"></div>

                  {/* Inference HUD Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-ocean-950/70 backdrop-blur-sm">
                    <div className="relative w-16 h-16 flex items-center justify-center mb-3">
                      <div className="absolute inset-0 rounded-full border-2 border-sonar-cyan border-t-transparent animate-spin"></div>
                      <Sparkles className="w-6 h-6 text-sonar-cyan animate-pulse" />
                    </div>
                    <div className="font-mono text-xs font-bold text-sonar-cyan tracking-wider glow-text-cyan">
                      AI INFERENCE IN PROGRESS...
                    </div>
                    <div className="font-mono text-[11px] text-command-muted mt-1">
                      Extracting Acoustic Shadows & Bounding Boxes
                    </div>
                    <div className="w-48 h-1.5 bg-ocean-800 rounded-full mt-3 overflow-hidden border border-ocean-border">
                      <div className="h-full bg-gradient-to-r from-sonar-cyan to-sonar-green animate-pulse w-3/4"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bounding Box Overlays */}
              {!isAnalyzing &&
                showBoxes &&
                result?.detections.map((det) => {
                  const isSelected = selectedId === det.id;
                  const cls = DEBRIS_CLASSES[det.classId] || {
                    color: '#00E5FF',
                    name: det.className,
                  };
                  const [x1, y1, x2, y2] = det.bbox;
                  const left = `${x1}%`;
                  const top = `${y1}%`;
                  const width = `${x2 - x1}%`;
                  const height = `${y2 - y1}%`;

                  return (
                    <div
                      key={det.id}
                      onClick={() => onSelectDetection(isSelected ? null : det.id)}
                      className={`absolute cursor-pointer transition-all z-20 ${
                        det.isAnomaly ? 'anomaly-alert-box' : ''
                      } ${isSelected ? 'scale-[1.02] z-30' : 'hover:scale-[1.01]'}`}
                      style={{
                        left,
                        top,
                        width,
                        height,
                        borderColor: det.isAnomaly ? '#FF3D3D' : cls.color,
                        borderWidth: isSelected ? '3px' : '2px',
                        borderStyle: 'solid',
                        backgroundColor: `${det.isAnomaly ? '#FF3D3D' : cls.color}22`,
                        boxShadow: isSelected
                          ? `0 0 20px ${cls.color}`
                          : `0 0 10px ${cls.color}55`,
                      }}
                    >
                      {/* Top Label Tag */}
                      <div
                        className="absolute -top-6 left-0 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap flex items-center space-x-1 shadow-md"
                        style={{
                          backgroundColor: cls.color,
                          color: '#060D1F',
                        }}
                      >
                        {det.isAnomaly && <AlertTriangle className="w-2.5 h-2.5 inline" />}
                        <span>{det.className}</span>
                        <span className="opacity-80">({(det.confidence * 100).toFixed(1)}%)</span>
                      </div>

                      {/* Acoustic Shadow Projection Polygon */}
                      {showShadows && (
                        <div
                          className="absolute -bottom-5 left-1 text-[9px] font-mono px-1 rounded bg-purple-950/80 text-purple-300 border border-purple-500/40 whitespace-nowrap pointer-events-none"
                        >
                          Shadow: {det.shadowLength}px • Est. H: {det.estimatedHeight}m
                        </div>
                      )}

                      {/* Corner Target Reticles */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white pointer-events-none"></div>
                      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white pointer-events-none"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white pointer-events-none"></div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          /* Empty State Placeholder */
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-ocean-border rounded-xl max-w-md">
            <div className="w-16 h-16 rounded-full bg-ocean-800 border border-sonar-cyan/30 flex items-center justify-center text-sonar-cyan mb-4 shadow-sonar-cyan">
              <Layers className="w-8 h-8 opacity-80" />
            </div>
            <h3 className="text-sm font-mono font-bold text-command-text uppercase tracking-wider mb-1">
              No Sonar Feed Loaded
            </h3>
            <p className="text-xs text-command-muted max-w-xs mb-4">
              Upload a side-scan sonar image (.png, .jpg, .tif) or select a sample preset from the left panel to begin neural classification.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
