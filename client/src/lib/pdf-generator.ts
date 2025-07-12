import jsPDF from 'jspdf';
import type { DutyResult, VehicleReference } from '@shared/schema';
import gariyanGuLogo from '@assets/gylogo_1752064168868.png';

export function generateDutyCalculationPDF(
  result: DutyResult,
  selectedVehicle: VehicleReference | null,
  yearOfManufacture: number,
  engineSize: number,
  isDirectImport: boolean
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const marginLeft = 20;
  const marginRight = 20;
  const contentWidth = pageWidth - marginLeft - marginRight;
  
  // Modern color scheme (New Gariyangu brand colors)
  const primaryColor = [116, 10, 114]; // #740a72 - medium purple
  const secondaryColor = [177, 5, 115]; // #b10573 - purple-pink
  const accentColor = [238, 0, 116]; // #ee0074 - bright pink
  const darkColor = [56, 16, 114]; // #381072 - dark purple
  const lightGray = [156, 163, 175];
  
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString('en-KE', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  // Helper function to add centered text
  const addCenteredText = (text: string, y: number, fontSize: number = 12, fontStyle: string = "normal") => {
    doc.setFont("helvetica", fontStyle);
    doc.setFontSize(fontSize);
    const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, y);
  };

  // Add white header background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Add Gariyangu Logo (larger)
  const logoWidth = 50;
  const logoHeight = 20;
  const logoX = marginLeft;
  doc.addImage(gariyanGuLogo, 'PNG', logoX, 7, logoWidth, logoHeight);
  
  // Add call-to-action text in header (compact)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Do you wish to import a car? Contact: 0736 272719", logoX + logoWidth + 10, 14);
  doc.setFontSize(7);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text("Japan • UK • South Africa • Dubai • Australia • Singapore • Thailand", logoX + logoWidth + 10, 22);
  
  // Reset text color
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  
  // Title with modern styling (compact)
  doc.setFont("helvetica", "bold");
  addCenteredText("KENYA MOTOR VEHICLE DUTY CALCULATION", 43, 15, "bold");
  
  // Subtitle
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  addCenteredText("Kenya Revenue Authority (KRA) Import Duty Assessment", 51, 9);
  
  // Date with modern styling (compact)
  const currentDate = new Date().toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFontSize(8);
  doc.text(`Report Date: ${currentDate}`, marginLeft, 60);
  
  // Modern line separator (compact)
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.8);
  doc.line(marginLeft, 63, pageWidth - marginRight, 63);
  
  let yPosition = 73;
  
  // Vehicle Information Section with modern card-like styling (compact)
  doc.setFillColor(248, 250, 252); // Light background
  doc.roundedRect(marginLeft, yPosition - 3, contentWidth, 65, 2, 2, 'F');
  
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("VEHICLE INFORMATION", marginLeft + 3, yPosition + 7);
  yPosition += 12;
  
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  
  // Use two-column layout for vehicle info to save space
  const leftCol = marginLeft + 3;
  const rightCol = marginLeft + contentWidth / 2 + 5;
  let leftY = yPosition;
  let rightY = yPosition;
  
  if (selectedVehicle) {
    doc.text(`Make: ${selectedVehicle.make}`, leftCol, leftY);
    leftY += 6;
    doc.text(`Model: ${selectedVehicle.model}`, leftCol, leftY);
    leftY += 6;
    doc.text(`Body: ${selectedVehicle.bodyType || 'N/A'}`, leftCol, leftY);
    leftY += 6;
    
    doc.text(`Fuel: ${selectedVehicle.fuelType || 'N/A'}`, rightCol, rightY);
    rightY += 6;
    doc.text(`Engine: ${engineSize}cc`, rightCol, rightY);
    rightY += 6;
    doc.text(`Year: ${yearOfManufacture}`, rightCol, rightY);
    rightY += 6;
  } else {
    doc.text(`Engine Size: ${engineSize}cc`, leftCol, leftY);
    leftY += 6;
    doc.text(`Year of Manufacture: ${yearOfManufacture}`, leftCol, leftY);
    leftY += 6;
  }
  
  const vehicleAge = new Date().getFullYear() - yearOfManufacture + 1;
  doc.text(`Age: ${vehicleAge} years`, leftCol, leftY);
  doc.text(`Import: ${isDirectImport ? 'Direct' : 'Previously Reg'}`, rightCol, rightY);
  
  yPosition = Math.max(leftY, rightY) + 12;
  
  // Valuation Section with modern card styling (compact)
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(marginLeft, yPosition - 3, contentWidth, 32, 2, 2, 'F');
  
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("VALUATION", marginLeft + 3, yPosition + 7);
  yPosition += 12;
  
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  
  doc.text(`CRSP: ${formatCurrency(result.currentRetailPrice)}`, marginLeft + 3, yPosition);
  doc.text(`Depreciation: ${(result.depreciationRate * 100).toFixed(0)}%`, marginLeft + contentWidth / 2 + 5, yPosition);
  yPosition += 6;
  doc.setFont("helvetica", "bold");
  doc.text(`Customs Value: ${formatCurrency(result.customsValue)}`, marginLeft + 3, yPosition);
  yPosition += 12;
  
  // Tax Breakdown Section with modern table design (compact)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("TAX BREAKDOWN", marginLeft, yPosition);
  yPosition += 10;
  
  // Modern table header (compact) with secondary color
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.rect(marginLeft, yPosition - 3, contentWidth, 10, 'F');
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("TAX TYPE", marginLeft + 3, yPosition + 3);
  doc.text("RATE", marginLeft + 85, yPosition + 3);
  doc.text("AMOUNT", marginLeft + 115, yPosition + 3);
  yPosition += 12;
  
  // Reset colors for content
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  
  // Extract tax items from breakdown
  const taxItems: { name: string, rate: string, amount: number }[] = [];
  
  // Import Duty
  if (result.importDuty > 0) {
    const importDutyRate = result.customsValue > 0 ? (result.importDuty / result.customsValue * 100).toFixed(0) : "0";
    taxItems.push({ name: "Import Duty", rate: `${importDutyRate}%`, amount: result.importDuty });
  }
  
  // Excise Duty
  if (result.exciseDuty > 0) {
    const exciseDutyRate = result.exciseValue > 0 ? (result.exciseDuty / result.exciseValue * 100).toFixed(0) : "0";
    taxItems.push({ name: "Excise Duty", rate: `${exciseDutyRate}%`, amount: result.exciseDuty });
  }
  
  // VAT
  if (result.vat > 0) {
    taxItems.push({ name: "VAT", rate: "16%", amount: result.vat });
  }
  
  // RDL
  if (result.rdl > 0) {
    taxItems.push({ name: "Railway Development Levy (RDL)", rate: "2%", amount: result.rdl });
  }
  
  // IDF
  if (result.idfFees > 0) {
    taxItems.push({ name: "Import Declaration Fee (IDF)", rate: "2.5%", amount: result.idfFees });
  }
  
  // Draw tax items with alternating row colors (compact)
  taxItems.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(marginLeft, yPosition - 2, contentWidth, 8, 'F');
    }
    doc.text(item.name, marginLeft + 3, yPosition + 2);
    doc.text(item.rate, marginLeft + 85, yPosition + 2);
    doc.text(formatCurrency(item.amount), marginLeft + 115, yPosition + 2);
    yPosition += 8;
  });
  
  // Registration fees (compact)
  if (result.registrationFees > 0) {
    if (taxItems.length % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(marginLeft, yPosition - 2, contentWidth, 8, 'F');
    }
    doc.text("Registration Fees", marginLeft + 3, yPosition + 2);
    doc.text("-", marginLeft + 85, yPosition + 2);
    doc.text(formatCurrency(result.registrationFees), marginLeft + 115, yPosition + 2);
    yPosition += 10;
  } else {
    yPosition += 3;
  }
  
  // Modern total section (compact) with accent color
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.roundedRect(marginLeft, yPosition, contentWidth, 12, 2, 2, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("TOTAL AMOUNT PAYABLE", marginLeft + 3, yPosition + 8);
  doc.text(formatCurrency(result.totalPayable), marginLeft + 115, yPosition + 8);
  yPosition += 18;
  
  // Compact footer - ensure it fits in remaining space
  const pageHeight = doc.internal.pageSize.height;
  const remainingSpace = pageHeight - yPosition;
  const footerHeight = 25;
  const footerY = pageHeight - footerHeight;
  
  // Only add footer if there's space, otherwise adjust position
  const actualFooterY = Math.max(yPosition + 5, footerY - 5);
  
  // Footer background (compact)
  doc.setFillColor(248, 250, 252);
  doc.rect(0, actualFooterY, pageWidth, footerHeight, 'F');
  
  // Contact section (compact)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  addCenteredText("GARIYANGU - ALL ABOUT CARS", actualFooterY + 6, 9, "bold");
  
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  addCenteredText("Need help importing? Contact: 0736 272719 • Japan • UK • SA • Dubai • Australia", actualFooterY + 12, 7);
  
  // Disclaimer (compact)
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(6);
  addCenteredText("Based on official KRA formulas. Please verify with KRA for final assessment.", actualFooterY + 18, 6);
  
  // Reset text color
  doc.setTextColor(0);
  
  // Generate filename
  const vehicleInfo = selectedVehicle 
    ? `${selectedVehicle.make}_${selectedVehicle.model}_`
    : '';
  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `Gariyangu_KRA_Duty_Calculation_${vehicleInfo}${timestamp}.pdf`;
  
  // Save the PDF
  doc.save(filename);
}

export interface ImportEstimateResult {
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    engineCapacity: number;
  };
  breakdown: {
    exchangeRate: number;
    cifAmount: number;
    cifCurrency: string;
    cifKes: number;
    dutyPayable: number;
    clearingCharges: number;
    transportCost: number;
    serviceFeePercentage: number;
    serviceFeeAmount: number;
    totalPayable: number;
  };
}

export function generateImportEstimatePDF(result: ImportEstimateResult) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const marginLeft = 20;
  const marginRight = 20;
  const contentWidth = pageWidth - marginLeft - marginRight;
  
  // Modern color scheme (New Gariyangu brand colors)
  const primaryColor = [116, 10, 114]; // #740a72 - medium purple
  const secondaryColor = [177, 5, 115]; // #b10573 - purple-pink
  const accentColor = [238, 0, 116]; // #ee0074 - bright pink
  const darkColor = [56, 16, 114]; // #381072 - dark purple
  const lightGray = [156, 163, 175];
  
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString('en-KE', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  // Helper function to add centered text
  const addCenteredText = (text: string, y: number, fontSize: number = 12, fontStyle: string = "normal") => {
    doc.setFont("helvetica", fontStyle);
    doc.setFontSize(fontSize);
    const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, y);
  };

  // Add white header background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Add Gariyangu Logo (larger)
  const logoWidth = 50;
  const logoHeight = 20;
  const logoX = marginLeft;
  doc.addImage(gariyanGuLogo, 'PNG', logoX, 7, logoWidth, logoHeight);
  
  // Add call-to-action text in header (compact)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Do you wish to import a car? Contact: 0736 272719", logoX + logoWidth + 10, 14);
  doc.setFontSize(7);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text("Japan • UK • South Africa • Dubai • Australia • Singapore • Thailand", logoX + logoWidth + 10, 22);
  
  // Reset text color
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  
  // Title with modern styling (compact)
  doc.setFont("helvetica", "bold");
  addCenteredText("VEHICLE IMPORT COST ESTIMATE", 43, 15, "bold");
  
  // Subtitle
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  addCenteredText("Comprehensive Import Cost Analysis for Kenya", 51, 9);
  
  // Date with modern styling (compact)
  const currentDate = new Date().toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  addCenteredText(`Generated on ${currentDate}`, 59, 8);
  
  let yPosition = 75;
  
  // Vehicle Information Section
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("VEHICLE INFORMATION", marginLeft, yPosition);
  
  // Add decorative line under section title
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(1);
  doc.line(marginLeft, yPosition + 2, marginLeft + 60, yPosition + 2);
  
  yPosition += 12;
  
  // Vehicle details with modern layout
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  
  const vehicleDetails = [
    { label: "Make:", value: result.vehicleInfo.make },
    { label: "Model:", value: result.vehicleInfo.model },
    { label: "Year:", value: result.vehicleInfo.year.toString() },
    { label: "Engine Capacity:", value: `${result.vehicleInfo.engineCapacity}cc` }
  ];
  
  vehicleDetails.forEach((detail, index) => {
    const x = marginLeft + (index % 2) * (contentWidth / 2);
    const y = yPosition + Math.floor(index / 2) * 10;
    
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.text(detail.label, x, y);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(detail.value, x + 35, y);
  });
  
  yPosition += 35;
  
  // Cost Breakdown Section
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("COST BREAKDOWN", marginLeft, yPosition);
  
  // Add decorative line under section title
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(1);
  doc.line(marginLeft, yPosition + 2, marginLeft + 60, yPosition + 2);
  
  yPosition += 15;
  
  // Cost breakdown items (simplified, no tax details)
  const costItems = [
    { 
      label: "CIF Value", 
      value: formatCurrency(result.breakdown.cifKes),
      description: `${result.breakdown.cifCurrency} ${result.breakdown.cifAmount.toLocaleString()} @ ${result.breakdown.exchangeRate}`
    },
    { 
      label: "Import Duty & Taxes", 
      value: formatCurrency(result.breakdown.dutyPayable),
      description: "Kenya Revenue Authority charges"
    },
    { 
      label: "Clearing Charges", 
      value: formatCurrency(result.breakdown.clearingCharges),
      description: "Freight forwarding and documentation"
    },
    { 
      label: "Transport Cost", 
      value: formatCurrency(result.breakdown.transportCost),
      description: "Local delivery and handling"
    },
    { 
      label: "Service Fee", 
      value: formatCurrency(result.breakdown.serviceFeeAmount),
      description: `${result.breakdown.serviceFeePercentage}% of total cost`
    }
  ];
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  
  costItems.forEach((item, index) => {
    const itemY = yPosition + (index * 15);
    
    // Item label
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text(item.label, marginLeft, itemY);
    
    // Item value (right-aligned)
    doc.setFont("helvetica", "bold");
    const valueWidth = doc.getStringUnitWidth(item.value) * 10 / doc.internal.scaleFactor;
    doc.text(item.value, pageWidth - marginRight - valueWidth, itemY);
    
    // Item description
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(item.description, marginLeft, itemY + 6);
    doc.setFontSize(10);
  });
  
  yPosition += costItems.length * 15 + 10;
  
  // Total section with background
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(marginLeft - 5, yPosition - 5, contentWidth + 10, 20, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("TOTAL PAYABLE", marginLeft, yPosition + 8);
  
  const totalValue = formatCurrency(result.breakdown.totalPayable);
  const totalWidth = doc.getStringUnitWidth(totalValue) * 14 / doc.internal.scaleFactor;
  doc.text(totalValue, pageWidth - marginRight - totalWidth, yPosition + 8);
  
  yPosition += 35;
  
  // Footer with disclaimer
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  
  const disclaimerText = [
    "DISCLAIMER: This estimate is for planning purposes only. Actual costs may vary based on:",
    "• Current exchange rates and market conditions",
    "• Additional inspection fees or documentation requirements", 
    "• Changes in government tax rates or import regulations",
    "• Vehicle-specific factors discovered during clearance process",
    "",
    "Contact us for the most current rates and professional import assistance.",
    "Email: info@gariyangu.co.ke | Phone: 0736 272719"
  ];
  
  disclaimerText.forEach((line, index) => {
    doc.text(line, marginLeft, yPosition + (index * 6));
  });
  
  // Save the PDF
  doc.save(`gariyangu-import-estimate-${result.vehicleInfo.make}-${result.vehicleInfo.model}-${new Date().getFullYear()}.pdf`);
}