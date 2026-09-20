import React from 'react';
import Link from 'next/link';
import { Shield, Anchor, Waves, ExternalLink, Award, Globe2, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-ocean-950 border-t border-ocean-border/80 text-command-muted font-sans pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & SIH */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-ocean-800 border border-sonar-cyan/40 flex items-center justify-center text-sonar-cyan">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-base text-command-text tracking-wider">
                SONARGUARD<span className="text-sonar-cyan">.AI</span>
              </span>
            </div>
            <p className="text-xs text-command-muted leading-relaxed">
              AI-Powered Automated Underwater Marine Debris & Acoustic Anomaly Detection for Side-Scan Sonar (SSS) Imagery.
            </p>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-ocean-800 border border-ocean-border text-[11px] font-mono text-sonar-cyan">
              <Sparkles className="w-3 h-3 text-sonar-green" />
              <span>Smart India Hackathon 2025</span>
            </div>
          </div>

          {/* Col 2: Institutional Stakeholders */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-command-text uppercase tracking-wider flex items-center space-x-2">
              <Anchor className="w-3.5 h-3.5 text-sonar-cyan" />
              <span>Institutional Partners</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-sonar-cyan transition-colors">
                Ministry of Earth Sciences (MoES), Govt. of India
              </li>
              <li className="hover:text-sonar-cyan transition-colors">
                Indian Navy Hydrographic Department (INHD)
              </li>
              <li className="hover:text-sonar-cyan transition-colors">
                National Institute of Oceanography (NIO Goa)
              </li>
              <li className="hover:text-sonar-cyan transition-colors">
                Centre for Marine Living Resources and Ecology (CMLRE)
              </li>
            </ul>
          </div>

          {/* Col 3: SDG 14 Alignment */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-command-text uppercase tracking-wider flex items-center space-x-2">
              <Globe2 className="w-3.5 h-3.5 text-sonar-green" />
              <span>UN Global Goals</span>
            </h4>
            <div className="p-3 rounded-lg bg-ocean-900 border border-ocean-border space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[10px]">
                  SDG 14
                </span>
                <span className="text-xs font-bold text-command-text">Life Below Water</span>
              </div>
              <p className="text-[11px] text-command-muted leading-snug">
                Target 14.1: By 2025, prevent and significantly reduce marine pollution of all kinds, in particular from land-based activities.
              </p>
            </div>
          </div>

          {/* Col 4: Quick Telemetry */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-command-text uppercase tracking-wider flex items-center space-x-2">
              <Waves className="w-3.5 h-3.5 text-sonar-cyan" />
              <span>Hydrographic Grid</span>
            </h4>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-ocean-border/40">
                <span className="text-command-muted">Coastline Covered</span>
                <span className="text-sonar-cyan font-bold">7,516 km</span>
              </div>
              <div className="flex justify-between py-1 border-b border-ocean-border/40">
                <span className="text-command-muted">Active Survey Grids</span>
                <span className="text-command-text">20 Coastal Sectors</span>
              </div>
              <div className="flex justify-between py-1 border-b border-ocean-border/40">
                <span className="text-command-muted">Inference Pipeline</span>
                <span className="text-sonar-green font-bold">YOLOv8m + VAE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-ocean-border/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-command-muted">
          <p>© 2025-2026 SonarGuard AI • Developed for Smart India Hackathon 2025.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0 font-mono">
            <span className="hover:text-sonar-cyan transition-colors cursor-pointer">TERMS OF PATROL</span>
            <span className="hover:text-sonar-cyan transition-colors cursor-pointer">BATHYMETRY API</span>
            <span className="hover:text-sonar-cyan transition-colors cursor-pointer">SECURITY PROTOCOL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
