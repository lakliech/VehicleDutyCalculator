import jsPDF from 'jspdf';
import type { DutyResult, VehicleReference } from '@shared/schema';
import gariyanGuLogo from '@assets/gylogo_1752064168868.png';

// Compact one-page PDF styling configuration
const PDF_CONFIG = {
  margins: { left: 15, right: 15, top: 15, bottom: 15 },
  colors: {
    primary: [116, 10, 114],    // #740a72 - Gariyangu purple
    secondary: [177, 5, 115],   // #b10573 - purple-pink
    accent: [238, 0, 116],      // #ee0074 - bright pink
    dark: [56, 16, 114],        // #381072 - dark purple
    text: [51, 51, 51],         // #333333 - dark gray
    lightText: [107, 114, 128], // #6b7280 - light gray
    border: [200, 200, 200],    // Thin gray borders
    background: [248, 250, 252] // #f8fafc - subtle background
  },
  fonts: {
    title: { size: 16, style: 'bold' },
    subtitle: { size: 12, style: 'bold' },
    heading: { size: 10, style: 'bold' },
    body: { size: 9, style: 'normal' },
    small: { size: 7, style: 'normal' }
  },
  logo: {
    width: 35,   // Compact logo size
    height: 23,  // Maintain aspect ratio
    margin: 8
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

const addCompactSection = (doc: jsPDF, title: string, y: number) => {
  const margins = PDF_CONFIG.margins;
  
  return addText(doc, title, margins.left, y, {
    fontSize: PDF_CONFIG.fonts.heading.size,
    fontStyle: PDF_CONFIG.fonts.heading.style,
    color: PDF_CONFIG.colors.primary
  });
};

const addTableRow = (doc: jsPDF, label: string, value: string, y: number, contentWidth: number, startX: number, isTotal: boolean = false, isHeader: boolean = false) => {
  const rowHeight = 10;
  
  // Table borders (thin)
  doc.setDrawColor(PDF_CONFIG.colors.border[0], PDF_CONFIG.colors.border[1], PDF_CONFIG.colors.border[2]);
  doc.setLineWidth(0.3);
  
  // Background for headers and totals
  if (isHeader) {
    doc.setFillColor(PDF_CONFIG.colors.primary[0], PDF_CONFIG.colors.primary[1], PDF_CONFIG.colors.primary[2]);
    doc.rect(startX, y - 6, contentWidth, rowHeight, 'FD');
  } else if (isTotal) {
    doc.setFillColor(PDF_CONFIG.colors.background[0], PDF_CONFIG.colors.background[1], PDF_CONFIG.colors.background[2]);
    doc.rect(startX, y - 6, contentWidth, rowHeight, 'FD');
  } else {
    // Regular row with border only
    doc.rect(startX, y - 6, contentWidth, rowHeight, 'D');
  }
  
  // Text color
  const textColor = isHeader ? [255, 255, 255] : (isTotal ? PDF_CONFIG.colors.primary : PDF_CONFIG.colors.text);
  
  // Label
  addText(doc, label, startX + 2, y, {
    fontSize: PDF_CONFIG.fonts.small.size + 1,
    fontStyle: (isTotal || isHeader) ? 'bold' : 'normal',
    color: textColor
  });
  
  // Value (right-aligned)
  addText(doc, value, startX + contentWidth - 2, y, {
    fontSize: PDF_CONFIG.fonts.small.size + 1,
    fontStyle: (isTotal || isHeader) ? 'bold' : 'normal',
    color: textColor,
    align: 'right'
  });
  
  return y + rowHeight;
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
  const pageHeight = doc.internal.pageSize.height;
  const margins = PDF_CONFIG.margins;
  let currentY = margins.top;
  
  // Split page into two columns: 70% for report, 30% for Gariyangu features
  const mainContentWidth = (pageWidth - margins.left - margins.right) * 0.68;
  const sidebarX = margins.left + mainContentWidth + 10;
  const sidebarWidth = (pageWidth - margins.left - margins.right) * 0.28;
  
  // === COMPACT HEADER ===
  doc.addImage(gariyanGuLogo, 'PNG', margins.left, currentY, PDF_CONFIG.logo.width, PDF_CONFIG.logo.height);
  
  addText(doc, "DUTY CALCULATION REPORT", margins.left + PDF_CONFIG.logo.width + 8, currentY + 8, {
    fontSize: PDF_CONFIG.fonts.title.size,
    fontStyle: PDF_CONFIG.fonts.title.style,
    color: PDF_CONFIG.colors.primary
  });
  
  addText(doc, new Date().toLocaleDateString('en-KE'), margins.left + PDF_CONFIG.logo.width + 8, currentY + 18, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText
  });
  
  currentY += PDF_CONFIG.logo.height + 10;
  
  // === MAIN CONTENT (Left Column) ===
  // Vehicle Information Table
  currentY = addCompactSection(doc, "VEHICLE DETAILS", currentY) + 5;
  currentY = addTableRow(doc, "ITEM", "VALUE", currentY, mainContentWidth, margins.left, false, true);
  
  if (selectedVehicle) {
    currentY = addTableRow(doc, "Make & Model", `${selectedVehicle.make} ${selectedVehicle.model}`, currentY, mainContentWidth, margins.left);
    currentY = addTableRow(doc, "Body Type", selectedVehicle.bodyType || 'N/A', currentY, mainContentWidth, margins.left);
    currentY = addTableRow(doc, "Fuel Type", selectedVehicle.fuelType || 'N/A', currentY, mainContentWidth, margins.left);
  }
  
  currentY = addTableRow(doc, "Engine Size", `${engineSize}cc`, currentY, mainContentWidth, margins.left);
  currentY = addTableRow(doc, "Year", yearOfManufacture.toString(), currentY, mainContentWidth, margins.left);
  const vehicleAge = new Date().getFullYear() - yearOfManufacture + 1;
  currentY = addTableRow(doc, "Age", `${vehicleAge} years`, currentY, mainContentWidth, margins.left);
  currentY = addTableRow(doc, "Import Type", isDirectImport ? 'Direct Import' : 'Previously Registered', currentY, mainContentWidth, margins.left);
  
  currentY += 8;
  
  // Valuation Table
  currentY = addCompactSection(doc, "VALUATION", currentY) + 5;
  currentY = addTableRow(doc, "COMPONENT", "AMOUNT (KES)", currentY, mainContentWidth, margins.left, false, true);
  currentY = addTableRow(doc, "CRSP Value", formatCurrency(result.currentRetailPrice), currentY, mainContentWidth, margins.left);
  currentY = addTableRow(doc, `Depreciation (${(result.depreciationRate * 100).toFixed(0)}%)`, 
    `-${formatCurrency(result.currentRetailPrice - result.depreciatedPrice)}`, currentY, mainContentWidth, margins.left);
  currentY = addTableRow(doc, "Customs Value", formatCurrency(result.customsValue), currentY, mainContentWidth, margins.left, true);
  
  currentY += 8;
  
  // Tax Breakdown Table
  currentY = addCompactSection(doc, "TAX BREAKDOWN", currentY) + 5;
  currentY = addTableRow(doc, "TAX TYPE", "AMOUNT (KES)", currentY, mainContentWidth, margins.left, false, true);
  currentY = addTableRow(doc, "Import Duty", formatCurrency(result.importDuty), currentY, mainContentWidth, margins.left);
  currentY = addTableRow(doc, "Excise Duty", formatCurrency(result.exciseDuty), currentY, mainContentWidth, margins.left);
  currentY = addTableRow(doc, "VAT (16%)", formatCurrency(result.vat), currentY, mainContentWidth, margins.left);
  
  if (isDirectImport) {
    currentY = addTableRow(doc, "RDL (2%)", formatCurrency(result.rdl), currentY, mainContentWidth, margins.left);
    currentY = addTableRow(doc, "IDF (2.5%)", formatCurrency(result.idfFees), currentY, mainContentWidth, margins.left);
  }
  
  currentY = addTableRow(doc, "Registration Fees", formatCurrency(result.registrationFees || 0), currentY, mainContentWidth, margins.left);
  currentY = addTableRow(doc, "TOTAL PAYABLE", formatCurrency(result.totalPayable), currentY, mainContentWidth, margins.left, true);
  
  // === GARIYANGU FEATURES SIDEBAR (Right Column) ===
  let sidebarY = margins.top + PDF_CONFIG.logo.height + 10;
  
  // Sidebar background
  doc.setFillColor(PDF_CONFIG.colors.background[0], PDF_CONFIG.colors.background[1], PDF_CONFIG.colors.background[2]);
  doc.rect(sidebarX - 5, sidebarY - 5, sidebarWidth + 10, pageHeight - sidebarY - margins.bottom, 'F');
  
  // Gariyangu Features Header
  addText(doc, "GARIYANGU FEATURES", sidebarX, sidebarY, {
    fontSize: PDF_CONFIG.fonts.heading.size,
    fontStyle: 'bold',
    color: PDF_CONFIG.colors.primary
  });
  sidebarY += 15;
  
  // Features list
  const features = [
    "✓ AI-Powered Vehicle Search",
    "✓ Real-time Market Pricing", 
    "✓ Import Cost Calculator",
    "✓ Duty Calculator (KRA Compliant)",
    "✓ Vehicle History Reports",
    "✓ Expert Concierge Service",
    "✓ Financing Options",
    "✓ Inspection Services"
  ];
  
  features.forEach(feature => {
    addText(doc, feature, sidebarX, sidebarY, {
      fontSize: PDF_CONFIG.fonts.small.size + 1,
      color: PDF_CONFIG.colors.text
    });
    sidebarY += 10;
  });
  
  sidebarY += 10;
  
  // Contact Information
  addText(doc, "CONTACT US", sidebarX, sidebarY, {
    fontSize: PDF_CONFIG.fonts.heading.size,
    fontStyle: 'bold',
    color: PDF_CONFIG.colors.primary
  });
  sidebarY += 12;
  
  const contactInfo = [
    "📱 +254 736 272719",
    "📧 support@gariyangu.co.ke",
    "🌐 www.gariyangu.co.ke",
    "",
    "WhatsApp: +254 736 272719",
    "Available 24/7"
  ];
  
  contactInfo.forEach(info => {
    if (info) {
      addText(doc, info, sidebarX, sidebarY, {
        fontSize: PDF_CONFIG.fonts.small.size + 1,
        color: PDF_CONFIG.colors.text
      });
    }
    sidebarY += 8;
  });
  
  sidebarY += 10;
  
  // Call to Action
  addText(doc, "READY TO IMPORT?", sidebarX, sidebarY, {
    fontSize: PDF_CONFIG.fonts.heading.size,
    fontStyle: 'bold',
    color: PDF_CONFIG.colors.accent
  });
  sidebarY += 12;
  
  const ctaText = "Get expert help with vehicle imports from Japan, UK, Dubai & more. Our team handles everything from sourcing to delivery.";
  
  // Word wrap CTA text within sidebar width
  const maxWidth = sidebarWidth * 0.85; // Use 85% of sidebar width for text wrapping
  const words = ctaText.split(' ');
  let line = '';
  for (const word of words) {
    const testLine = line + word + ' ';
    const textWidth = doc.getStringUnitWidth(testLine) * (PDF_CONFIG.fonts.small.size + 1) / doc.internal.scaleFactor;
    if (textWidth > maxWidth && line !== '') {
      addText(doc, line.trim(), sidebarX, sidebarY, {
        fontSize: PDF_CONFIG.fonts.small.size + 1,
        color: PDF_CONFIG.colors.text
      });
      sidebarY += 8;
      line = word + ' ';
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    addText(doc, line.trim(), sidebarX, sidebarY, {
      fontSize: PDF_CONFIG.fonts.small.size + 1,
      color: PDF_CONFIG.colors.text
    });
  }
  
  // Bottom disclaimer
  const footerY = pageHeight - margins.bottom - 8;
  addText(doc, "Disclaimer: Calculations based on current KRA rates. Actual charges may vary.", 
    margins.left, footerY, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText
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
  const pageHeight = doc.internal.pageSize.height;
  const margins = PDF_CONFIG.margins;
  let currentY = margins.top;
  
  // Split page into two columns: 70% for report, 30% for Gariyangu features
  const mainContentWidth = (pageWidth - margins.left - margins.right) * 0.68;
  const sidebarX = margins.left + mainContentWidth + 10;
  const sidebarWidth = (pageWidth - margins.left - margins.right) * 0.28;
  
  // === COMPACT HEADER ===
  doc.addImage(gariyanGuLogo, 'PNG', margins.left, currentY, PDF_CONFIG.logo.width, PDF_CONFIG.logo.height);
  
  addText(doc, "IMPORT COST ESTIMATE", margins.left + PDF_CONFIG.logo.width + 8, currentY + 8, {
    fontSize: PDF_CONFIG.fonts.title.size,
    fontStyle: PDF_CONFIG.fonts.title.style,
    color: PDF_CONFIG.colors.primary
  });
  
  addText(doc, new Date().toLocaleDateString('en-KE'), margins.left + PDF_CONFIG.logo.width + 8, currentY + 18, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText
  });
  
  currentY += PDF_CONFIG.logo.height + 10;
  
  // === MAIN CONTENT (Left Column) ===
  // Vehicle Information Table
  currentY = addCompactSection(doc, "VEHICLE DETAILS", currentY) + 5;
  currentY = addTableRow(doc, "ITEM", "VALUE", currentY, mainContentWidth, margins.left, false, true);
  
  if (vehicleData) {
    currentY = addTableRow(doc, "Make & Model", `${vehicleData.make || 'Manual'} ${vehicleData.model || 'Entry'}`, currentY, mainContentWidth, margins.left);
    currentY = addTableRow(doc, "Engine Size", `${vehicleData.engineCapacity}cc`, currentY, mainContentWidth, margins.left);
    currentY = addTableRow(doc, "Year", vehicleData.year?.toString() || 'N/A', currentY, mainContentWidth, margins.left);
  }
  
  currentY += 8;
  
  // Import Cost Breakdown Table
  currentY = addCompactSection(doc, "COST BREAKDOWN", currentY) + 5;
  currentY = addTableRow(doc, "COST COMPONENT", "AMOUNT", currentY, mainContentWidth, margins.left, false, true);
  
  if (estimateData.cifAmount && estimateData.currency) {
    currentY = addTableRow(doc, `CIF Price (${estimateData.currency})`, 
      estimateData.cifAmount.toLocaleString(), currentY, mainContentWidth, margins.left);
  }
  
  if (estimateData.cifKes) {
    currentY = addTableRow(doc, "CIF Price (KES)", formatCurrency(estimateData.cifKes), currentY, mainContentWidth, margins.left);
  }
  
  if (estimateData.dutyAmount) {
    currentY = addTableRow(doc, "Duty & Taxes", formatCurrency(estimateData.dutyAmount), currentY, mainContentWidth, margins.left);
  }
  
  if (estimateData.clearingCharges) {
    currentY = addTableRow(doc, "Clearing Charges", formatCurrency(estimateData.clearingCharges), currentY, mainContentWidth, margins.left);
  }
  
  if (estimateData.transportCost) {
    currentY = addTableRow(doc, "Transport Cost", formatCurrency(estimateData.transportCost), currentY, mainContentWidth, margins.left);
  }
  
  if (estimateData.serviceFeeAmount) {
    currentY = addTableRow(doc, `Service Fee (${estimateData.serviceFeePercentage || 0}%)`, 
      formatCurrency(estimateData.serviceFeeAmount), currentY, mainContentWidth, margins.left);
  }
  
  if (estimateData.totalPayable) {
    currentY = addTableRow(doc, "TOTAL COST", formatCurrency(estimateData.totalPayable), currentY, mainContentWidth, margins.left, true);
  }
  
  // === GARIYANGU FEATURES SIDEBAR (Right Column) ===
  let sidebarY = margins.top + PDF_CONFIG.logo.height + 10;
  
  // Sidebar background
  doc.setFillColor(PDF_CONFIG.colors.background[0], PDF_CONFIG.colors.background[1], PDF_CONFIG.colors.background[2]);
  doc.rect(sidebarX - 5, sidebarY - 5, sidebarWidth + 10, pageHeight - sidebarY - margins.bottom, 'F');
  
  // Gariyangu Features Header
  addText(doc, "GARIYANGU SERVICES", sidebarX, sidebarY, {
    fontSize: PDF_CONFIG.fonts.heading.size,
    fontStyle: 'bold',
    color: PDF_CONFIG.colors.primary
  });
  sidebarY += 15;
  
  // Import services list
  const services = [
    "✓ Vehicle Sourcing (Japan/UK/Dubai)",
    "✓ Import Documentation",
    "✓ Shipping & Logistics", 
    "✓ KRA Duty Clearance",
    "✓ Vehicle Inspection",
    "✓ Registration Services",
    "✓ Financing Assistance",
    "✓ Warranty & After-sales"
  ];
  
  services.forEach(service => {
    addText(doc, service, sidebarX, sidebarY, {
      fontSize: PDF_CONFIG.fonts.small.size + 1,
      color: PDF_CONFIG.colors.text
    });
    sidebarY += 10;
  });
  
  sidebarY += 10;
  
  // Contact Information
  addText(doc, "CONTACT US", sidebarX, sidebarY, {
    fontSize: PDF_CONFIG.fonts.heading.size,
    fontStyle: 'bold',
    color: PDF_CONFIG.colors.primary
  });
  sidebarY += 12;
  
  const contactInfo = [
    "📱 +254 736 272719",
    "📧 support@gariyangu.co.ke",
    "🌐 www.gariyangu.co.ke",
    "",
    "WhatsApp: +254 736 272719",
    "Available 24/7"
  ];
  
  contactInfo.forEach(info => {
    if (info) {
      addText(doc, info, sidebarX, sidebarY, {
        fontSize: PDF_CONFIG.fonts.small.size + 1,
        color: PDF_CONFIG.colors.text
      });
    }
    sidebarY += 8;
  });
  
  sidebarY += 10;
  
  // Call to Action
  addText(doc, "IMPORT WITH CONFIDENCE", sidebarX, sidebarY, {
    fontSize: PDF_CONFIG.fonts.heading.size,
    fontStyle: 'bold',
    color: PDF_CONFIG.colors.accent
  });
  sidebarY += 12;
  
  const ctaText = "Let our experts handle your vehicle import from start to finish. We provide transparent pricing, professional service, and complete peace of mind.";
  
  // Word wrap CTA text within sidebar width
  const maxWidth = sidebarWidth * 0.85; // Use 85% of sidebar width for text wrapping
  const words = ctaText.split(' ');
  let line = '';
  for (const word of words) {
    const testLine = line + word + ' ';
    const textWidth = doc.getStringUnitWidth(testLine) * (PDF_CONFIG.fonts.small.size + 1) / doc.internal.scaleFactor;
    if (textWidth > maxWidth && line !== '') {
      addText(doc, line.trim(), sidebarX, sidebarY, {
        fontSize: PDF_CONFIG.fonts.small.size + 1,
        color: PDF_CONFIG.colors.text
      });
      sidebarY += 8;
      line = word + ' ';
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    addText(doc, line.trim(), sidebarX, sidebarY, {
      fontSize: PDF_CONFIG.fonts.small.size + 1,
      color: PDF_CONFIG.colors.text
    });
  }
  
  // Bottom disclaimer
  const footerY = pageHeight - margins.bottom - 8;
  addText(doc, "Disclaimer: Estimate based on current rates. Actual costs may vary.", 
    margins.left, footerY, {
    fontSize: PDF_CONFIG.fonts.small.size,
    color: PDF_CONFIG.colors.lightText
  });
  
  // Save the PDF
  const fileName = vehicleData?.make 
    ? `${vehicleData.make}_import_cost_estimate.pdf`
    : `vehicle_import_cost_estimate.pdf`;
  
  doc.save(fileName);
}