import { DEBRIS_CLASSES, DetectionBox } from '../data/mock';

export interface DetectionResult {
  detections: DetectionBox[];
  totalObjects: number;
  knownObjects: number;
  unknownAnomalies: number;
  processingTimeMs: number;
  overallRiskScore: number; // 0 - 100
  cleanupPriority: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  hasAnomaly: boolean;
  anomalyScore?: number;
  modelName: string;
  shadowAnalysis: {
    objectHeightM: number;
    shadowLengthPx: number;
    grazingAngleDeg: number;
    sensorAltitudeM: number;
    slantRangeM: number;
  };
}

export async function simulateSonarDetection(
  imageSrc: string,
  settings: {
    confidenceThreshold: number;
    detectionMode: string;
    sonarFrequency: string;
  }
): Promise<DetectionResult> {
  const minLatency = 1800;
  const maxLatency = 2600;
  const latency = Math.floor(Math.random() * (maxLatency - minLatency + 1)) + minLatency;

  // Artificial async delay to simulate neural inference
  await new Promise((resolve) => setTimeout(resolve, latency));

  const availableClassKeys = Object.keys(DEBRIS_CLASSES).filter((k) => k !== 'unknown_anomaly');
  const detectionsCount = Math.floor(Math.random() * 4) + 3; // 3 to 6 detections
  const detections: DetectionBox[] = [];

  const includeAnomaly = Math.random() < 0.35 || settings.detectionMode.includes('Anomaly');

  // Generate standard detections
  for (let i = 0; i < detectionsCount; i++) {
    const classKey = availableClassKeys[Math.floor(Math.random() * availableClassKeys.length)];
    const cls = DEBRIS_CLASSES[classKey];
    
    // Confidence higher than threshold
    const minConf = Math.max(0.65, settings.confidenceThreshold);
    const confidence = parseFloat((Math.random() * (0.98 - minConf) + minConf).toFixed(3));

    // Bounding box: random location within bounds, non-collapsing
    const width = Math.floor(Math.random() * 25) + 15;
    const height = Math.floor(Math.random() * 25) + 15;
    const x1 = Math.floor(Math.random() * (90 - width)) + 5;
    const y1 = Math.floor(Math.random() * (90 - height)) + 5;
    const x2 = x1 + width;
    const y2 = y1 + height;

    const estHeight = parseFloat((Math.random() * 3.5 + 0.6).toFixed(2));
    const shadowPx = Math.floor(estHeight * 22 + Math.random() * 10);
    const grazingAngle = Math.floor(Math.random() * 12) + 24;

    let riskLevel: 'CRITICAL' | 'MODERATE' | 'LOW' = cls.defaultRisk;
    if (confidence > 0.88 || classKey === 'mine_uxo') {
      riskLevel = 'CRITICAL';
    } else if (confidence > 0.72) {
      riskLevel = 'MODERATE';
    } else {
      riskLevel = 'LOW';
    }

    const reasons = [
      'Significant acoustic shadow indicates elevated obstacle on seabed.',
      'High specular backscatter with characteristic synthetic polymer profile.',
      'Disrupts natural benthic strata; high risk of maritime entanglement.',
      'Clear acoustic contrast boundary detected along sonar sweep angle.',
      'Potential collision hazard for subsea ROVs and deep-draft commercial keels.',
    ];

    detections.push({
      id: `det-${Date.now()}-${i}`,
      classId: cls.id,
      className: cls.name,
      confidence,
      bbox: [x1, y1, x2, y2],
      riskLevel,
      estimatedHeight: estHeight,
      shadowLength: shadowPx,
      grazingAngle,
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      isAnomaly: false,
    });
  }

  // Include Unknown Anomaly if triggered
  if (includeAnomaly) {
    const anomalyConfidence = parseFloat((Math.random() * 0.15 + 0.83).toFixed(3));
    const estHeight = parseFloat((Math.random() * 2.8 + 1.2).toFixed(2));
    const shadowPx = Math.floor(estHeight * 24 + 15);
    const x1 = Math.floor(Math.random() * 30) + 60;
    const y1 = Math.floor(Math.random() * 40) + 10;
    const x2 = Math.min(95, x1 + 22);
    const y2 = Math.min(95, y1 + 24);

    detections.push({
      id: `anomaly-${Date.now()}`,
      classId: 'unknown_anomaly',
      className: 'Unknown Acoustic Anomaly',
      confidence: anomalyConfidence,
      bbox: [x1, y1, x2, y2],
      riskLevel: 'CRITICAL',
      estimatedHeight: estHeight,
      shadowLength: shadowPx,
      grazingAngle: 28,
      reason: 'Feature embedding distance > 0.78 in VAE latent space. No class convergence.',
      isAnomaly: true,
    });
  }

  // Filter based on threshold
  const filtered = detections.filter((d) => d.confidence >= settings.confidenceThreshold);

  const unknownCount = filtered.filter((d) => d.isAnomaly).length;
  const knownCount = filtered.length - unknownCount;

  // Compute overall risk score (0-100)
  let riskScore = 0;
  if (filtered.length > 0) {
    let sumWeight = 0;
    filtered.forEach((d) => {
      const weight = d.riskLevel === 'CRITICAL' ? 95 : d.riskLevel === 'MODERATE' ? 60 : 30;
      sumWeight += weight * d.confidence;
    });
    riskScore = Math.min(100, Math.round(sumWeight / filtered.length));
  }

  let cleanupPriority: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' = 'LOW';
  if (riskScore >= 75 || unknownCount > 0) {
    cleanupPriority = 'CRITICAL';
  } else if (riskScore >= 50) {
    cleanupPriority = 'HIGH';
  } else if (riskScore >= 30) {
    cleanupPriority = 'MODERATE';
  }

  const primaryObj = filtered[0] || { estimatedHeight: 1.8, shadowLength: 42, grazingAngle: 28 };

  return {
    detections: filtered,
    totalObjects: filtered.length,
    knownObjects: knownCount,
    unknownAnomalies: unknownCount,
    processingTimeMs: latency,
    overallRiskScore: riskScore,
    cleanupPriority,
    hasAnomaly: unknownCount > 0,
    anomalyScore: unknownCount > 0 ? 0.87 : undefined,
    modelName: 'YOLOv8m-Sonar v2.1 + VAE Anomaly Scorer',
    shadowAnalysis: {
      objectHeightM: primaryObj.estimatedHeight,
      shadowLengthPx: primaryObj.shadowLength,
      grazingAngleDeg: primaryObj.grazingAngle,
      sensorAltitudeM: 14.5,
      slantRangeM: 48.0,
    },
  };
}
