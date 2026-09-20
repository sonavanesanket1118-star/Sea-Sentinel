'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Radio, MapPin, BarChart3, Info, LayoutDashboard, Shield, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export default function Navbar() {
  const pathname = usePathname();
  const { isDemoMode, setDemoMode, toastMessage } = useDemo();

  const navLinks = [
    { href: '/', label: 'Overview', icon: Shield },
    { href: '/dashboard', label: 'Detection Center', icon: LayoutDashboard },
    { href: '/map', label: 'GIS Coastline Map', icon: MapPin },
    { href: '/analytics', label: 'Analytics & Hotspots', icon: BarChart3 },
    { href: '/about', label: 'Architecture & Team', icon: Info },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-ocean-950/90 backdrop-blur-md border-b border-ocean-border">
        {/* Top Naval Classification Bar */}
        <div className="w-full bg-ocean-900 border-b border-ocean-border/50 px-4 py-1 text-xs text-command-muted flex items-center justify-between font-mono">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center text-sonar-green font-semibold">
              <span className="w-2 h-2 rounded-full bg-sonar-green animate-ping mr-1.5 inline-block"></span>
              SYS-STATUS: OPERATIONAL
            </span>
            <span className="hidden sm:inline text-ocean-border">|</span>
            <span className="hidden sm:inline text-command-muted">MINISTRY OF EARTH SCIENCES • INDIAN NAVY HYDROGRAPHIC CELL</span>
          </div>
          <div className="flex items-center space-x-3">
            {/* <span className="text-sonar-cyan">SIH-2025 GRAND FINALE PROTOTYPE</span> */}
            <span className="text-ocean-border">|</span>
            <span className="text-command-text">LATENCY: 1.4s</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded-lg bg-ocean-800 border border-sonar-cyan/40 flex items-center justify-center shadow-sonar-cyan group-hover:border-sonar-cyan transition-colors">
              <Radio className="w-5 h-5 text-sonar-cyan animate-pulse" />
              <div className="absolute inset-0 rounded-lg bg-sonar-cyan/10 animate-ping pointer-events-none"></div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-display font-bold tracking-wider text-command-text group-hover:text-sonar-cyan transition-colors">
                  SONARGUARD<span className="text-sonar-cyan">.AI</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-sonar-cyan/15 text-sonar-cyan border border-sonar-cyan/30">
                  v2.1
                </span>
              </div>
              <p className="text-[10px] text-command-muted tracking-tight hidden md:block">
                Subsea Debris & Anomaly Detection Pipeline
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium font-display transition-all ${isActive
                      ? 'bg-sonar-cyan/15 text-sonar-cyan border border-sonar-cyan/40 shadow-sonar-cyan'
                      : 'text-command-muted hover:text-command-text hover:bg-ocean-800/80 border border-transparent'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sonar-cyan' : 'text-command-muted'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Demo Mode Toggle & Quick Actions */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-ocean-800/90 border border-ocean-border rounded-lg p-1.5 shadow-inner">
              <button
                onClick={() => setDemoMode(!isDemoMode)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${isDemoMode
                    ? 'bg-gradient-to-r from-sonar-cyan to-blue-600 text-ocean-950 shadow-sonar-cyan'
                    : 'text-command-muted hover:text-command-text'
                  }`}
                title="Toggle Judge Demo Mode to instantly auto-load sample sonar images and detections"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isDemoMode ? 'text-ocean-950 animate-spin' : 'text-command-muted'}`} />
                <span>DEMO MODE</span>
                <span
                  className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-ocean-950 animate-pulse' : 'bg-ocean-600'
                    }`}
                />
              </button>
            </div>

            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-sonar-cyan hover:bg-sonar-cyan/90 text-ocean-950 font-display font-bold text-xs shadow-sonar-cyan transition-transform active:scale-95"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>LAUNCH RADAR</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center justify-around bg-ocean-900 border-t border-ocean-border/60 py-2 px-2 overflow-x-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center py-1 px-2.5 rounded text-[11px] font-medium ${isActive ? 'text-sonar-cyan font-bold' : 'text-command-muted hover:text-command-text'
                  }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span>{link.label.split(' ')[0]}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 bg-ocean-800/95 border border-sonar-cyan/60 text-command-text px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-sonar-green shrink-0" />
          <span className="text-xs font-mono">{toastMessage}</span>
        </div>
      )}
    </>
  );
}
