import jsPDF from 'jspdf';
import { DetectionResult } from './detectionEngine';

export function generateSonarInspectionPDF(
  result: DetectionResult,
  metadata?: {
    locationName?: string;
    surveyDate?: string;
    operator?: string;
    coordinates?: string;
  }
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const location = metadata?.locationName || 'Indian EEZ - Goa Coastal Continental Shelf';
  const surveyDate = metadata?.surveyDate || new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const operator = metadata?.operator || 'SonarGuard AI Command Unit (SIH-2025)';
  const coordinates = metadata?.coordinates || '15.352° N, 73.748° E (Arabian Sea)';

  // Background Header Bar (Deep Navy)
  doc.setFillColor(6, 13, 31);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Accent Line (Cyan)
  doc.setDrawColor(0, 229, 255);
  doc.setLineWidth(1.2);
  doc.line(0, 42, pageWidth, 42);

  // Header Title
  doc.setTextColor(0, 229, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('SONARGUARD AI - MARITIME DEBRIS INSPECTION REPORT', 14, 16);

  doc.setTextColor(232, 237, 245);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text('Autonomous Side-Scan Sonar (SSS) Acoustic Feature & Anomaly Assessment', 14, 23);
  doc.text('Ministry of Earth Sciences | Indian Navy Hydrographic Dept | Smart India Hackathon 2025', 14, 29);

  // Status Badge in Header
  const riskColor = result.overallRiskScore >= 70 ? [255, 61, 61] : result.overallRiskScore >= 40 ? [255, 184, 0] : [0, 255, 136];
  doc.setFillColor(riskColor[0], riskColor[1], riskColor[2]);
  doc.roundedRect(pageWidth - 62, 10, 48, 18, 2, 2, 'F');
  doc.setTextColor(6, 13, 31);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('PRIORITY DISPATCH', pageWidth - 60, 16);
  doc.setFontSize(12);
  doc.text(`${result.cleanupPriority} RISK`, pageWidth - 60, 24);

  // Metadata Panel
  doc.setFillColor(245, 248, 252);
  doc.roundedRect(14, 48, pageWidth - 28, 28, 2, 2, 'F');
  doc.setDrawColor(200, 215, 230);
  doc.setLineWidth(0.3);
  doc.roundedRect(14, 48, pageWidth - 28, 28, 2, 2, 'D');

  doc.setTextColor(20, 35, 60);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('SURVEY METADATA & TELEMETRY:', 18, 54);

  doc.setFont('helvetica', 'normal');
  doc.text(`Location: ${location}`, 18, 61);
  doc.text(`Geo-Coordinates: ${coordinates}`, 18, 67);
  doc.text(`Survey Timestamp: ${surveyDate}`, 18, 73);

  doc.text(`Operating Unit: ${operator}`, 115, 61);
  doc.text(`Neural Model: ${result.modelName}`, 115, 67);
  doc.text(`Inference Latency: ${(result.processingTimeMs / 1000).toFixed(2)}s | UN SDG 14 Compliant`, 115, 73);

  // Executive Summary Cards
  const cardY = 82;
  const cardWidth = (pageWidth - 28 - 9) / 4;

  const statBoxes = [
    { label: 'Total Objects', val: `${result.totalObjects}`, color: [6, 13, 31] },
    { label: 'Classified Debris', val: `${result.knownObjects}`, color: [0, 150, 220] },
    { label: 'Unknown Anomalies', val: `${result.unknownAnomalies}`, color: result.unknownAnomalies > 0 ? [220, 40, 40] : [0, 180, 100] },
    { label: 'Risk Index (0-100)', val: `${result.overallRiskScore}/100`, color: riskColor },
  ];

  statBoxes.forEach((box, idx) => {
    const bx = 14 + idx * (cardWidth + 3);
    doc.setFillColor(240, 244, 250);
    doc.roundedRect(bx, cardY, cardWidth, 18, 1.5, 1.5, 'F');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 115, 135);
    doc.text(box.label, bx + 3, cardY + 6);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(box.color[0], box.color[1], box.color[2]);
    doc.text(box.val, bx + 3, cardY + 14);
  });

  // Section Header: Detailed Detections Table
  let currentY = 108;
  doc.setTextColor(6, 13, 31);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('ACOUSTIC FEATURE DETECTION LOG & TARGET CLASSIFICATION', 14, currentY);

  currentY += 4;
  // Table Header
  doc.setFillColor(12, 26, 58);
  doc.rect(14, currentY, pageWidth - 28, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('Target Class', 17, currentY + 5.5);
  doc.text('Confidence', 68, currentY + 5.5);
  doc.text('Est. Height', 92, currentY + 5.5);
  doc.text('Shadow L.', 116, currentY + 5.5);
  doc.text('Risk', 138, currentY + 5.5);
  doc.text('Operational Assessment', 158, currentY + 5.5);

  currentY += 8;

  // Table Rows
  doc.setFont('helvetica', 'normal');
  result.detections.forEach((item, index) => {
    const isEven = index % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(14, currentY, pageWidth - 28, 9, 'F');

    doc.setTextColor(20, 30, 50);
    doc.setFontSize(7.5);

    // Class name with anomaly indicator
    const namePrefix = item.isAnomaly ? '[!] ' : '';
    doc.setFont('helvetica', item.isAnomaly ? 'bold' : 'normal');
    doc.text(`${namePrefix}${item.className.substring(0, 24)}`, 17, currentY + 6);

    doc.setFont('helvetica', 'normal');
    doc.text(`${(item.confidence * 100).toFixed(1)}%`, 68, currentY + 6);
    doc.text(`${item.estimatedHeight} m`, 92, currentY + 6);
    doc.text(`${item.shadowLength} px`, 116, currentY + 6);

    // Risk badge text
    if (item.riskLevel === 'CRITICAL') {
      doc.setTextColor(200, 30, 30);
      doc.setFont('helvetica', 'bold');
    } else if (item.riskLevel === 'MODERATE') {
      doc.setTextColor(200, 130, 0);
    } else {
      doc.setTextColor(0, 140, 70);
    }
    doc.text(item.riskLevel, 138, currentY + 6);

    doc.setTextColor(70, 85, 105);
    doc.setFont('helvetica', 'normal');
    const reasonSnippet = item.reason ? item.reason.substring(0, 32) + '...' : 'Seabed obstacle';
    doc.text(reasonSnippet, 158, currentY + 6);

    currentY += 9;
  });

  // Acoustic Shadow Trigonometric Physics Box
  currentY += 4;
  doc.setFillColor(242, 247, 255);
  doc.roundedRect(14, currentY, pageWidth - 28, 26, 2, 2, 'F');
  doc.setDrawColor(180, 210, 245);
  doc.roundedRect(14, currentY, pageWidth - 28, 26, 2, 2, 'D');

  doc.setTextColor(12, 40, 80);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('ACOUSTIC SHADOW BATHYMETRIC CALCULATION (GEOMETRIC MODEL):', 18, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    'Formula: H_obj = (L_shadow * H_sensor_altitude) / (R_slant_range)  |  Grazing Angle (Theta) = 28.5 deg',
    18,
    currentY + 12
  );
  doc.text(
    `Estimated Primary Object Elevation: ${result.shadowAnalysis.objectHeightM}m above seafloor  |  Acoustic Shadow Extent: ${result.shadowAnalysis.shadowLengthPx}px`,
    18,
    currentY + 17
  );
  doc.text(
    'Sensor Altitude: 14.5m | Slant Range: 48.0m | SSS Beam Frequency: Dual 100/900 kHz chirp',
    18,
    currentY + 22
  );

  // Recommendations & Direct Action protocol
  currentY += 32;
  doc.setTextColor(6, 13, 31);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('NAVY & COAST GUARD INTERVENTION RECOMMENDATION:', 14, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 55, 75);

  const recommendations = [
    result.hasAnomaly
      ? '1. [URGENT] Deploy ROV (Remotely Operated Vehicle) with optical camera for visual inspection of high-outlier acoustic anomaly.'
      : '1. Standard acoustic verification complete; proceed with priority marine cleanup vessel assignment.',
    result.overallRiskScore >= 70
      ? '2. Issue Notice to Mariners (NOTMAR) regarding submerged obstruction to prevent fishing gear snagging & keel strikes.'
      : '2. Low immediate navigation hazard. Log coordinates in the National Marine Debris Repository.',
    '3. Coordinate with NIO Goa and Ministry of Earth Sciences for recovery vessel dispatch under UN SDG 14 targets.',
  ];

  recommendations.forEach((rec) => {
    doc.text(rec, 14, currentY);
    currentY += 5.5;
  });

  // Footer / Watermark
  doc.setDrawColor(200, 210, 225);
  doc.line(14, 280, pageWidth - 14, 280);
  doc.setFontSize(7.5);
  doc.setTextColor(130, 145, 165);
  doc.text(
    'SonarGuard AI - AI-Powered Marine Debris & Anomaly Detection System | Smart India Hackathon 2025 | Page 1 of 1',
    14,
    285
  );
  doc.text('CONFIDENTIAL - FOR HYDROGRAPHIC & ENVIRONMENTAL ACTION USE ONLY', pageWidth - 105, 285);

  // Save the PDF
  doc.save(`SonarGuard_Inspection_Report_${Date.now()}.pdf`);
}
