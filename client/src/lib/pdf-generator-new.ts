import jsPDF from 'jspdf';
import type { DutyResult, VehicleReference } from '@shared/schema';
import gariyanGuLogo from '@assets/gylogo_1752064168868.png';

// Clean, professional PDF styling configuration
const PDF_CONFIG = {
  margins: { left: 25, right: 25, top: 30, bottom: 30 },
  colors: {
    primary: [116, 10, 114],    // #740a72 - Gariyangu purple
    secondary: [177, 5, 115],   // #b10573 - purple-pink
    accent: [238, 0, 116],      // #ee0074 - bright pink
    dark: [56, 16, 114],        // #381072 - dark purple
    text: [51, 51, 51],         // #333333 - dark gray
    lightText: [107, 114, 128], // #6b7280 - light gray
    border: [229, 231, 235],    // #e5e7eb - very light gray
    background: [249, 250, 251] // #f9fafb - light background
  },
  fonts: {
    title: { size: 20, style: 'bold' },
    subtitle: { size: 14, style: 'bold' },
    heading: { size: 12, style: 'bold' },
    body: { size: 10, style: 'normal' },
    small: { size: 8, style: 'normal' }
  },
  logo: {
    width: 45,   // Proportional logo size
    height: 30,  // Maintain aspect ratio
    margin: 10
  }
};

// Helper functions for clean PDF generation
const formatCurrency = (amount: number) => {
  return `KES ${amount.toLocaleString('en-KE', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

const addText = (doc: jsPDF, text: string, x: number, y: number, options: any = {}) => {
  const { fontSize = 10, fontStyle = 'normal', color = PDF_CONFIG.colors.text, align = 'left' } = options;
  
  doc.setFont("helvetica", fontStyle as any);
  doc.setFontSize(fontSize);
  doc.setTextColor(color[0], color[1], color[2]);
  
  if (align === 'center') {
    const pageWidth = doc.internal.pageSize.width;
    const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
    x = (pageWidth - textWidth) / 2;
  } else if (align === 'right') {
    const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
    x = x - textWidth;
  }
  
  doc.text(text, x, y);
  return y + fontSize * 0.5; // Return next line position
};

const addSection = (doc: jsPDF, title: string, y: number, backgroundColor?: number[]) => {
  const pageWidth = doc.internal.pageSize.width;
  const margins = PDF_CONFIG.margins;
  
  // Background rectangle for section headers
  if (backgroundColor) {
    doc.setFillColor(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
    doc.rect(margins.left - 5, y - 8, pageWidth - margins.left - margins.right + 10, 16, 'F');
  }
  
  return addText(doc, title, margins.left, y, {
    fontSize: PDF_CONFIG.fonts.heading.size,
    fontStyle: PDF_CONFIG.fonts.heading.style,
    color: backgroundColor ? [255, 255, 255] : PDF_CONFIG.colors.primary
  });
};

const addTableRow = (doc: jsPDF, label: string, value: string, y: number, isTotal: boolean = false) => {
  const margins = PDF_CONFIG.margins;
  const pageWidth = doc.internal.pageSize.width;
  const contentWidth = pageWidth - margins.left - margins.right;
  
  // Add subtle background for total rows
  if (isTotal) {
    doc.setFillColor(PDF_CONFIG.colors.background[0], PDF_CONFIG.colors.background[1], PDF_CONFIG.colors.background[2]);
    doc.rect(margins.left - 5, y - 8, contentWidth + 10, 14, 'F');
  }
  
  // Add border line
  doc.setDrawColor(PDF_CONFIG.colors.border[0], PDF_CONFIG.colors.border[1], PDF_CONFIG.colors.border[2]);
  doc.setLineWidth(0.5);
  doc.line(margins.left, y + 5, margins.left + contentWidth, y + 5);
  
  // Label
  addText(doc, label, margins.left, y, {
    fontSize: PDF_CONFIG.fonts.body.size,
    fontStyle: isTotal ? 'bold' : 'normal',
    color: isTotal ? PDF_CONFIG.colors.primary : PDF_CONFIG.colors.text
  });
  
  // Value (right-aligned)
  addText(doc, value, margins.left + contentWidth, y, {
    fontSize: PDF_CONFIG.fonts.body.size,
    fontStyle: isTotal ? 'bold' : 'normal',
    color: isTotal ? PDF_CONFIG.colors.primary : PDF_CONFIG.colors.text,
    align: 'right'
  });
  
  return y + 16;
};

export function generateDutyCalculationPDF(
  result: DutyResult,
  selectedVehicle: VehicleReference | null,
  yearOfManufacture: number,
  engineSize: number,
  isDirectImport: boolean
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margins = PDF_CONFIG.margins;
  let currentY = margins.top;
  
  // === HEADER SECTION ===
  // Add proportional logo at top left
  doc.addImage(gariyanGuLogo, 'PNG', margins.left, currentY, PDF_CONFIG.logo.width, PDF_CONFIG.logo.height);
  
  // Company info next to logo
  const logoRightX = margins.left + PDF_CONFIG.logo.width + PDF_CONFIG.logo.margin;
  currentY = addText(doc, "Kenya's Car Marketplace", logoRightX, currentY + 8, {
    fontSize: PDF_CONFIG.fonts.subtitle.size,
    fontStyle: PDF_CONFIG.fonts.subtitle.style,
    color: PDF_CONFIG.colors.primary
  });
  
  currentY = addText(doc, "Professional Vehicle Import Services", logoRightX, currentY + 6, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText
  });
  
  // Contact info (right-aligned)
  addText(doc, "Contact: +254 736 272719", pageWidth - margins.right, margins.top + 8, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText,
    align: 'right'
  });
  
  addText(doc, "support@gariyangu.com", pageWidth - margins.right, margins.top + 16, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText,
    align: 'right'
  });
  
  currentY = margins.top + PDF_CONFIG.logo.height + 20;
  
  // === DOCUMENT TITLE ===
  currentY = addText(doc, "MOTOR VEHICLE DUTY CALCULATION", pageWidth / 2, currentY, {
    fontSize: PDF_CONFIG.fonts.title.size,
    fontStyle: PDF_CONFIG.fonts.title.style,
    color: PDF_CONFIG.colors.primary,
    align: 'center'
  });
  
  currentY = addText(doc, "Official KRA Import Duty Assessment Report", pageWidth / 2, currentY + 8, {
    fontSize: PDF_CONFIG.fonts.body.size,
    color: PDF_CONFIG.colors.lightText,
    align: 'center'
  });
  
  // Date and report info
  const currentDate = new Date().toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  currentY = addText(doc, `Generated: ${currentDate}`, pageWidth / 2, currentY + 15, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText,
    align: 'center'
  });
  
  // Separator line
  currentY += 15;
  doc.setDrawColor(PDF_CONFIG.colors.border[0], PDF_CONFIG.colors.border[1], PDF_CONFIG.colors.border[2]);
  doc.setLineWidth(1);
  doc.line(margins.left, currentY, pageWidth - margins.right, currentY);
  
  currentY += 25;
  
  // === VEHICLE INFORMATION ===
  currentY = addSection(doc, "VEHICLE INFORMATION", currentY, PDF_CONFIG.colors.primary);
  currentY += 10;
  
  if (selectedVehicle) {
    currentY = addTableRow(doc, "Make", selectedVehicle.make, currentY);
    currentY = addTableRow(doc, "Model", selectedVehicle.model, currentY);
    currentY = addTableRow(doc, "Body Type", selectedVehicle.bodyType || 'N/A', currentY);
    currentY = addTableRow(doc, "Fuel Type", selectedVehicle.fuelType || 'N/A', currentY);
  }
  
  currentY = addTableRow(doc, "Engine Size", `${engineSize}cc`, currentY);
  currentY = addTableRow(doc, "Year of Manufacture", yearOfManufacture.toString(), currentY);
  const vehicleAge = new Date().getFullYear() - yearOfManufacture + 1;
  currentY = addTableRow(doc, "Vehicle Age", `${vehicleAge} years`, currentY);
  currentY = addTableRow(doc, "Import Type", isDirectImport ? 'Direct Import' : 'Previously Registered', currentY);
  
  currentY += 15;
  
  // === VALUATION ===
  currentY = addSection(doc, "VEHICLE VALUATION", currentY, PDF_CONFIG.colors.secondary);
  currentY += 10;
  
  currentY = addTableRow(doc, "Current Retail Price (CRSP)", formatCurrency(result.currentRetailPrice), currentY);
  currentY = addTableRow(doc, "Depreciation Rate", `${(result.depreciationRate * 100).toFixed(1)}%`, currentY);
  currentY = addTableRow(doc, "Depreciated Price", formatCurrency(result.depreciatedPrice), currentY);
  currentY = addTableRow(doc, "Customs Value", formatCurrency(result.customsValue), currentY, true);
  
  currentY += 15;
  
  // === TAX BREAKDOWN ===
  currentY = addSection(doc, "TAX BREAKDOWN", currentY, PDF_CONFIG.colors.accent);
  currentY += 10;
  
  currentY = addTableRow(doc, "Import Duty", formatCurrency(result.importDuty), currentY);
  currentY = addTableRow(doc, "Excise Duty", formatCurrency(result.exciseDuty), currentY);
  currentY = addTableRow(doc, "VAT (16%)", formatCurrency(result.vat), currentY);
  
  if (isDirectImport) {
    currentY = addTableRow(doc, "Railway Development Levy (2%)", formatCurrency(result.rdl), currentY);
    currentY = addTableRow(doc, "Import Declaration Fee (2.5%)", formatCurrency(result.idfFees), currentY);
  }
  
  currentY = addTableRow(doc, "Total Taxes", formatCurrency(result.totalTaxes), currentY, true);
  currentY = addTableRow(doc, "Registration Fees (Est.)", formatCurrency(result.registrationFees || 0), currentY);
  currentY = addTableRow(doc, "TOTAL PAYABLE", formatCurrency(result.totalPayable), currentY, true);
  
  currentY += 20;
  
  // === FOOTER ===
  // Disclaimer
  addText(doc, "DISCLAIMER", margins.left, currentY, {
    fontSize: PDF_CONFIG.fonts.small.size,
    fontStyle: 'bold',
    color: PDF_CONFIG.colors.dark
  });
  
  currentY += 8;
  const disclaimerText = "This calculation is based on current KRA rates and regulations. Actual charges may vary. " +
    "Please consult with KRA or licensed clearing agents for official assessment.";
  
  // Word wrap disclaimer
  const words = disclaimerText.split(' ');
  let line = '';
  for (const word of words) {
    const testLine = line + word + ' ';
    const textWidth = doc.getStringUnitWidth(testLine) * PDF_CONFIG.fonts.small.size / doc.internal.scaleFactor;
    if (textWidth > (pageWidth - margins.left - margins.right) && line !== '') {
      addText(doc, line.trim(), margins.left, currentY, {
        fontSize: PDF_CONFIG.fonts.small.size,
        color: PDF_CONFIG.colors.lightText
      });
      currentY += 10;
      line = word + ' ';
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    addText(doc, line.trim(), margins.left, currentY, {
      fontSize: PDF_CONFIG.fonts.small.size,
      color: PDF_CONFIG.colors.lightText
    });
  }
  
  // Footer with page info
  const footerY = doc.internal.pageSize.height - 20;
  addText(doc, "Generated by Gariyangu - Kenya's Car Marketplace", pageWidth / 2, footerY, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText,
    align: 'center'
  });
  
  // Save the PDF
  const fileName = selectedVehicle 
    ? `${selectedVehicle.make}_${selectedVehicle.model}_duty_calculation.pdf`
    : `vehicle_duty_calculation_${yearOfManufacture}.pdf`;
  
  doc.save(fileName);
}

// Export function for Import Cost Calculator PDF
export function generateImportCostPDF(
  estimateData: any,
  vehicleData: any
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margins = PDF_CONFIG.margins;
  let currentY = margins.top;
  
  // === HEADER SECTION ===
  // Add proportional logo at top left
  doc.addImage(gariyanGuLogo, 'PNG', margins.left, currentY, PDF_CONFIG.logo.width, PDF_CONFIG.logo.height);
  
  // Company info next to logo
  const logoRightX = margins.left + PDF_CONFIG.logo.width + PDF_CONFIG.logo.margin;
  currentY = addText(doc, "Kenya's Car Marketplace", logoRightX, currentY + 8, {
    fontSize: PDF_CONFIG.fonts.subtitle.size,
    fontStyle: PDF_CONFIG.fonts.subtitle.style,
    color: PDF_CONFIG.colors.primary
  });
  
  currentY = addText(doc, "Professional Vehicle Import Services", logoRightX, currentY + 6, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText
  });
  
  // Contact info (right-aligned)
  addText(doc, "Contact: +254 736 272719", pageWidth - margins.right, margins.top + 8, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText,
    align: 'right'
  });
  
  addText(doc, "support@gariyangu.com", pageWidth - margins.right, margins.top + 16, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText,
    align: 'right'
  });
  
  currentY = margins.top + PDF_CONFIG.logo.height + 20;
  
  // === DOCUMENT TITLE ===
  currentY = addText(doc, "VEHICLE IMPORT COST ESTIMATE", pageWidth / 2, currentY, {
    fontSize: PDF_CONFIG.fonts.title.size,
    fontStyle: PDF_CONFIG.fonts.title.style,
    color: PDF_CONFIG.colors.primary,
    align: 'center'
  });
  
  currentY = addText(doc, "Complete Import Cost Breakdown", pageWidth / 2, currentY + 8, {
    fontSize: PDF_CONFIG.fonts.body.size,
    color: PDF_CONFIG.colors.lightText,
    align: 'center'
  });
  
  // Date and report info
  const currentDate = new Date().toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  currentY = addText(doc, `Generated: ${currentDate}`, pageWidth / 2, currentY + 15, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText,
    align: 'center'
  });
  
  // Separator line
  currentY += 15;
  doc.setDrawColor(PDF_CONFIG.colors.border[0], PDF_CONFIG.colors.border[1], PDF_CONFIG.colors.border[2]);
  doc.setLineWidth(1);
  doc.line(margins.left, currentY, pageWidth - margins.right, currentY);
  
  currentY += 25;
  
  // === VEHICLE INFORMATION ===
  currentY = addSection(doc, "VEHICLE DETAILS", currentY, PDF_CONFIG.colors.primary);
  currentY += 10;
  
  if (vehicleData) {
    currentY = addTableRow(doc, "Make", vehicleData.make || 'Manual Entry', currentY);
    currentY = addTableRow(doc, "Model", vehicleData.model || 'Manual Entry', currentY);
    currentY = addTableRow(doc, "Engine Size", `${vehicleData.engineCapacity}cc`, currentY);
    currentY = addTableRow(doc, "Year", vehicleData.year?.toString() || 'N/A', currentY);
  }
  
  currentY += 15;
  
  // === COST BREAKDOWN ===
  currentY = addSection(doc, "IMPORT COST BREAKDOWN", currentY, PDF_CONFIG.colors.secondary);
  currentY += 10;
  
  if (estimateData.cifAmount) {
    currentY = addTableRow(doc, `CIF Price (${estimateData.currency})`, 
      estimateData.cifAmount.toLocaleString(), currentY);
  }
  
  if (estimateData.cifKes) {
    currentY = addTableRow(doc, "CIF Price (KES)", formatCurrency(estimateData.cifKes), currentY);
  }
  
  if (estimateData.dutyAmount) {
    currentY = addTableRow(doc, "Duty & Taxes", formatCurrency(estimateData.dutyAmount), currentY);
  }
  
  if (estimateData.clearingCharges) {
    currentY = addTableRow(doc, "Clearing Charges", formatCurrency(estimateData.clearingCharges), currentY);
  }
  
  if (estimateData.transportCost) {
    currentY = addTableRow(doc, "Transport Cost", formatCurrency(estimateData.transportCost), currentY);
  }
  
  if (estimateData.serviceFeeAmount) {
    currentY = addTableRow(doc, `Service Fee (${estimateData.serviceFeePercentage}%)`, 
      formatCurrency(estimateData.serviceFeeAmount), currentY);
  }
  
  if (estimateData.totalPayable) {
    currentY = addTableRow(doc, "TOTAL COST", formatCurrency(estimateData.totalPayable), currentY, true);
  }
  
  currentY += 20;
  
  // === FOOTER ===
  // Disclaimer
  addText(doc, "DISCLAIMER", margins.left, currentY, {
    fontSize: PDF_CONFIG.fonts.small.size,
    fontStyle: 'bold',
    color: PDF_CONFIG.colors.dark
  });
  
  currentY += 8;
  const disclaimerText = "This is an estimate based on current rates and may vary. " +
    "Additional costs may apply. Contact us for accurate quotation.";
  
  addText(doc, disclaimerText, margins.left, currentY, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText
  });
  
  // Footer with page info
  const footerY = doc.internal.pageSize.height - 20;
  addText(doc, "Generated by Gariyangu - Kenya's Car Marketplace", pageWidth / 2, footerY, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText,
    align: 'center'
  });
  
  // Save the PDF
  const fileName = vehicleData?.make 
    ? `${vehicleData.make}_import_cost_estimate.pdf`
    : `vehicle_import_cost_estimate.pdf`;
  
  doc.save(fileName);
}