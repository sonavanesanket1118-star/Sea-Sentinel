'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SAMPLE_SONAR_IMAGES, SonarSample, DetectionBox } from '../data/mock';
import { simulateSonarDetection, DetectionResult } from '../utils/detectionEngine';

interface DemoContextType {
  isDemoMode: boolean;
  setDemoMode: (val: boolean) => void;
  activeSample: SonarSample;
  setActiveSample: (sample: SonarSample) => void;
  uploadedImage: string | null;
  setUploadedImage: (url: string | null) => void;
  detectionResult: DetectionResult | null;
  setDetectionResult: (res: DetectionResult | null) => void;
  isAnalyzing: boolean;
  selectedDetectionId: string | null;
  setSelectedDetectionId: (id: string | null) => void;
  confidenceThreshold: number;
  setConfidenceThreshold: (val: number) => void;
  detectionMode: string;
  setDetectionMode: (mode: string) => void;
  sonarFrequency: string;
  setSonarFrequency: (freq: string) => void;
  runAnalysis: (overrideImage?: string) => Promise<void>;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [activeSample, setActiveSample] = useState<SonarSample>(SAMPLE_SONAR_IMAGES[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(SAMPLE_SONAR_IMAGES[0].imageUrl);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [selectedDetectionId, setSelectedDetectionId] = useState<string | null>(null);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.5);
  const [detectionMode, setDetectionMode] = useState<string>('Full Pipeline (Detection + Anomaly + Shadow)');
  const [sonarFrequency, setSonarFrequency] = useState<string>('High (900 kHz) — High Detail');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  const runAnalysis = async (overrideImage?: string) => {
    const targetImage = overrideImage || uploadedImage || activeSample.imageUrl;
    setIsAnalyzing(true);
    setSelectedDetectionId(null);

    try {
      const result = await simulateSonarDetection(targetImage, {
        confidenceThreshold,
        detectionMode,
        sonarFrequency,
      });
      setDetectionResult(result);
      showToast(`Sonar analysis complete: ${result.totalObjects} objects identified in ${(result.processingTimeMs / 1000).toFixed(2)}s`);
    } catch (err) {
      console.error(err);
      showToast('Analysis error. Please retry.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Initial auto-load in Demo Mode
  useEffect(() => {
    if (isDemoMode && !detectionResult) {
      const sample = SAMPLE_SONAR_IMAGES[0];
      setUploadedImage(sample.imageUrl);
      setDetectionResult({
        detections: sample.detections,
        totalObjects: sample.detections.length,
        knownObjects: sample.detections.filter((d) => !d.isAnomaly).length,
        unknownAnomalies: sample.detections.filter((d) => d.isAnomaly).length,
        processingTimeMs: 1650,
        overallRiskScore: sample.overallRisk,
        cleanupPriority: sample.cleanupPriority,
        hasAnomaly: sample.detections.some((d) => d.isAnomaly),
        modelName: 'YOLOv8m-Sonar v2.1 + VAE Anomaly Scorer',
        shadowAnalysis: {
          objectHeightM: sample.shadowMath.objectHeight,
          shadowLengthPx: sample.shadowMath.shadowLengthPx,
          grazingAngleDeg: sample.shadowMath.grazingAngleDeg,
          sensorAltitudeM: sample.shadowMath.altitudeM,
          slantRangeM: sample.shadowMath.slantRangeM,
        },
      });
    }
  }, [isDemoMode]);

  return (
    <DemoContext.Provider
      value={{
        isDemoMode,
        setDemoMode: (val) => {
          setIsDemoMode(val);
          showToast(val ? 'Judge Demo Mode ENABLED: Sample presets loaded' : 'Demo Mode DISABLED: Manual input active');
        },
        activeSample,
        setActiveSample: (sample) => {
          setActiveSample(sample);
          setUploadedImage(sample.imageUrl);
          setDetectionResult({
            detections: sample.detections,
            totalObjects: sample.detections.length,
            knownObjects: sample.detections.filter((d) => !d.isAnomaly).length,
            unknownAnomalies: sample.detections.filter((d) => d.isAnomaly).length,
            processingTimeMs: 1420,
            overallRiskScore: sample.overallRisk,
            cleanupPriority: sample.cleanupPriority,
            hasAnomaly: sample.detections.some((d) => d.isAnomaly),
            modelName: 'YOLOv8m-Sonar v2.1',
            shadowAnalysis: {
              objectHeightM: sample.shadowMath.objectHeight,
              shadowLengthPx: sample.shadowMath.shadowLengthPx,
              grazingAngleDeg: sample.shadowMath.grazingAngleDeg,
              sensorAltitudeM: sample.shadowMath.altitudeM,
              slantRangeM: sample.shadowMath.slantRangeM,
            },
          });
        },
        uploadedImage,
        setUploadedImage,
        detectionResult,
        setDetectionResult,
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
        toastMessage,
        showToast,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
