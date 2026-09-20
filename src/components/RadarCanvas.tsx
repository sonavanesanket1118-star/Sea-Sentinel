'use client';

import React, { useEffect, useRef } from 'react';

interface RadarTarget {
  x: number;
  y: number;
  label: string;
  type: string;
  color: string;
  risk: string;
  distance: string;
}

export default function RadarCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    // Fixed mock blips on the radar display (normalized -1 to 1)
    const targets: RadarTarget[] = [
      { x: 0.35, y: -0.42, label: 'TRG-01: Ghost Net', type: 'Entanglement', color: '#FF4444', risk: 'CRITICAL', distance: '420m' },
      { x: -0.55, y: 0.30, label: 'TRG-02: UXO Mine', type: 'Explosive Ordnance', color: '#CC0000', risk: 'CRITICAL', distance: '680m' },
      { x: 0.65, y: 0.45, label: 'TRG-03: ISO Container', type: 'Navigation Obstacle', color: '#4488FF', risk: 'MODERATE', distance: '810m' },
      { x: -0.22, y: -0.65, label: 'TRG-04: Wreckage', type: 'Subsea Structure', color: '#8844FF', risk: 'MODERATE', distance: '720m' },
      { x: 0.15, y: 0.72, label: 'TRG-05: Unknown Anomaly', type: 'Unclassified', color: '#00E5FF', risk: 'CRITICAL', distance: '750m' },
    ];

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const size = Math.min(parent.clientWidth, 600);
        canvas.width = size * window.devicePixelRatio;
        canvas.height = size * window.devicePixelRatio;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(cx, cy) * 0.92;

      ctx.clearRect(0, 0, w, h);

      // 1. Sonar Outer Background
      const radialGradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
      radialGradient.addColorStop(0, 'rgba(6, 26, 60, 0.6)');
      radialGradient.addColorStop(0.7, 'rgba(6, 17, 42, 0.85)');
      radialGradient.addColorStop(1, 'rgba(4, 10, 24, 0.98)');
      ctx.fillStyle = radialGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Concentric Range Rings
      const rings = [0.25, 0.5, 0.75, 1.0];
      rings.forEach((ring) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * ring, 0, Math.PI * 2);
        ctx.strokeStyle = ring === 1.0 ? 'rgba(0, 229, 255, 0.6)' : 'rgba(30, 58, 95, 0.6)';
        ctx.lineWidth = ring === 1.0 ? 2 * window.devicePixelRatio : 1 * window.devicePixelRatio;
        ctx.stroke();

        // Ring distance labels
        ctx.fillStyle = 'rgba(0, 229, 255, 0.5)';
        ctx.font = `${10 * window.devicePixelRatio}px "JetBrains Mono", monospace`;
        ctx.fillText(`${ring * 1000}m`, cx + 4, cy - radius * ring + 14 * window.devicePixelRatio);
      });

      // 3. Compass Crosshairs & Radial Lines
      ctx.strokeStyle = 'rgba(30, 58, 95, 0.5)';
      ctx.lineWidth = 1 * window.devicePixelRatio;

      // Cardinal axes
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Diagonal axes (45 deg)
      for (let i = 0; i < 4; i++) {
        const rad = (i * Math.PI) / 2 + Math.PI / 4;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(rad) * radius, cy + Math.sin(rad) * radius);
        ctx.stroke();
      }

      // Compass Degree Markings
      const compassLabels = [
        { text: '000° N', angle: -Math.PI / 2 },
        { text: '090° E', angle: 0 },
        { text: '180° S', angle: Math.PI / 2 },
        { text: '270° W', angle: Math.PI },
      ];

      ctx.fillStyle = '#00E5FF';
      ctx.font = `bold ${11 * window.devicePixelRatio}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      compassLabels.forEach(({ text, angle: a }) => {
        const lx = cx + Math.cos(a) * (radius - 18 * window.devicePixelRatio);
        const ly = cy + Math.sin(a) * (radius - 18 * window.devicePixelRatio);
        ctx.fillText(text, lx, ly);
      });

      // 4. Rotating Sonar Sweep Beam (Conic Gradient)
      const sweepAngle = (angle * Math.PI) / 180;
      ctx.save();
      ctx.translate(cx, cy);

      // Sweep Tail (Pie slice gradient)
      const sweepSteps = 45;
      for (let i = 0; i < sweepSteps; i++) {
        const stepAngle = sweepAngle - (i * Math.PI) / (180 * 2.5);
        const alpha = Math.max(0, (1 - i / sweepSteps) * 0.35);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, stepAngle - 0.03, stepAngle);
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.fill();
      }

      // Leading Laser Sweep Line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(sweepAngle) * radius, Math.sin(sweepAngle) * radius);
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 2.5 * window.devicePixelRatio;
      ctx.shadowColor = '#00E5FF';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.restore();

      // 5. Render Target Blips
      targets.forEach((target) => {
        const tx = cx + target.x * radius;
        const ty = cy + target.y * radius;

        // Calculate angular difference with current sweep
        const targetAngle = Math.atan2(ty - cy, tx - cx);
        let diff = (sweepAngle - targetAngle) % (Math.PI * 2);
        if (diff < 0) diff += Math.PI * 2;

        // Blip glows brightest right after sweep passes (within 60 degrees), then fades
        const intensity = diff < 1.2 ? Math.max(0.2, 1 - diff / 1.2) : 0.25;

        ctx.save();
        ctx.shadowColor = target.color;
        ctx.shadowBlur = 12 * intensity;

        // Outer pulsing ring
        ctx.beginPath();
        ctx.arc(tx, ty, 7 * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.strokeStyle = target.color;
        ctx.globalAlpha = intensity;
        ctx.lineWidth = 1.5 * window.devicePixelRatio;
        ctx.stroke();

        // Inner solid core
        ctx.beginPath();
        ctx.arc(tx, ty, 3.5 * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = target.color;
        ctx.globalAlpha = Math.min(1, intensity + 0.3);
        ctx.fill();

        // Target Tag
        if (intensity > 0.4) {
          ctx.font = `${9 * window.devicePixelRatio}px "JetBrains Mono", monospace`;
          ctx.fillStyle = '#E8EDF5';
          ctx.textAlign = 'left';
          ctx.fillText(target.label, tx + 10 * window.devicePixelRatio, ty - 6 * window.devicePixelRatio);
          ctx.fillStyle = target.color;
          ctx.fillText(`[${target.risk}] ${target.distance}`, tx + 10 * window.devicePixelRatio, ty + 6 * window.devicePixelRatio);
        }

        ctx.restore();
      });

      // 6. Central Transducer Node
      ctx.beginPath();
      ctx.arc(cx, cy, 6 * window.devicePixelRatio, 0, Math.PI * 2);
      ctx.fillStyle = '#00E5FF';
      ctx.shadowColor = '#00E5FF';
      ctx.shadowBlur = 10;
      ctx.fill();

      // Transducer ping pulse
      ctx.beginPath();
      ctx.arc(cx, cy, (angle % 60) * 0.4 * window.devicePixelRatio + 6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
      ctx.lineWidth = 1.5 * window.devicePixelRatio;
      ctx.stroke();

      angle = (angle + 1.2) % 360;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="rounded-full shadow-2xl border border-sonar-cyan/40" />
      {/* Decorative Outer Ring HUD */}
      <div className="absolute inset-0 rounded-full border border-sonar-cyan/20 pointer-events-none scale-105 animate-pulse"></div>
    </div>
  );
}
