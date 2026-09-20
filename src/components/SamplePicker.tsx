'use client';

import React from 'react';
import { Sparkles, Check, Anchor, AlertCircle, Waves, Target } from 'lucide-react';
import { SAMPLE_SONAR_IMAGES, SonarSample } from '../data/mock';
import { useDemo } from '../context/DemoContext';

export default function SamplePicker() {
  const { activeSample, setActiveSample, isAnalyzing } = useDemo();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-bold text-command-text uppercase tracking-wider flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sonar-cyan" />
          <span>Preset Sonar Missions</span>
        </label>
        <span className="text-[10px] font-mono text-sonar-cyan">1-CLICK TEST</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {SAMPLE_SONAR_IMAGES.map((sample) => {
          const isSelected = activeSample.id === sample.id;
          return (
            <button
              key={sample.id}
              disabled={isAnalyzing}
              onClick={() => setActiveSample(sample)}
              className={`p-2 rounded-lg border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-sonar-cyan/15 border-sonar-cyan shadow-sonar-cyan text-command-text'
                  : 'bg-ocean-850 hover:bg-ocean-800 border-ocean-border text-command-muted hover:text-command-text'
              } ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[11px] font-mono font-bold truncate max-w-[120px] text-command-text">
                  {sample.location}
                </span>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-sonar-cyan text-ocean-950 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-sonar-cyan">{sample.frequency.split(' ')[0]}</span>
                <span
                  className={`font-bold ${
                    sample.cleanupPriority === 'CRITICAL'
                      ? 'text-sonar-red'
                      : sample.cleanupPriority === 'HIGH'
                      ? 'text-sonar-amber'
                      : 'text-sonar-green'
                  }`}
                >
                  {sample.cleanupPriority}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
