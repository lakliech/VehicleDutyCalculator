import jsPDF from 'jspdf';
import type { DutyResult, VehicleReference } from '@shared/schema';
import gariyanGuLogo from '@assets/gariyangu_1751901637375.png';

export function generateDutyCalculationPDF(
  result: DutyResult,
  selectedVehicle: VehicleReference | null,
  yearOfManufacture: number,
  engineSize: number,
  isDirectImport: boolean
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const marginLeft = 25;
  const marginRight = 25;
  const contentWidth = pageWidth - marginLeft - marginRight;
  
  // Modern color scheme (Gariyangu purple/cyan theme)
  const primaryColor = [146, 85, 224]; // Purple
  const secondaryColor = [168, 252, 255]; // Cyan
  const darkGray = [55, 65, 81];
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

  // Add header background
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Add Gariyangu Logo
  const logoWidth = 45;
  const logoHeight = 18;
  const logoX = marginLeft;
  doc.addImage(gariyanGuLogo, 'PNG', logoX, 8, logoWidth, logoHeight);
  
  // Add call-to-action text in header
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Do you wish to import a car? Contact us: 0736 272719", logoX + logoWidth + 10, 15);
  doc.setFontSize(9);
  doc.text("Japan • UK • South Africa • Dubai • Australia • Singapore • Thailand", logoX + logoWidth + 10, 22);
  
  // Reset text color
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  
  // Title with modern styling
  doc.setFont("helvetica", "bold");
  addCenteredText("KENYA MOTOR VEHICLE DUTY CALCULATION", 50, 18, "bold");
  
  // Subtitle
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  addCenteredText("Kenya Revenue Authority (KRA) Import Duty Assessment", 60, 11);
  
  // Date with modern styling
  const currentDate = new Date().toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.setFontSize(10);
  doc.text(`Report Date: ${currentDate}`, marginLeft, 72);
  
  // Modern line separator
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(1);
  doc.line(marginLeft, 78, pageWidth - marginRight, 78);
  
  let yPosition = 92;
  
  // Vehicle Information Section with modern card-like styling
  doc.setFillColor(248, 250, 252); // Light background
  doc.roundedRect(marginLeft, yPosition - 5, contentWidth, 85, 3, 3, 'F');
  
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("VEHICLE INFORMATION", marginLeft + 5, yPosition + 5);
  yPosition += 15;
  
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  
  if (selectedVehicle) {
    doc.text(`Make: ${selectedVehicle.make}`, marginLeft + 5, yPosition);
    yPosition += 8;
    doc.text(`Model: ${selectedVehicle.model}`, marginLeft + 5, yPosition);
    yPosition += 8;
    doc.text(`Body Type: ${selectedVehicle.bodyType || 'N/A'}`, marginLeft + 5, yPosition);
    yPosition += 8;
    doc.text(`Fuel Type: ${selectedVehicle.fuelType || 'N/A'}`, marginLeft + 5, yPosition);
    yPosition += 8;
  }
  
  doc.text(`Engine Size: ${engineSize}cc`, marginLeft + 5, yPosition);
  yPosition += 8;
  doc.text(`Year of Manufacture: ${yearOfManufacture}`, marginLeft + 5, yPosition);
  yPosition += 8;
  
  const vehicleAge = new Date().getFullYear() - yearOfManufacture + 1;
  doc.text(`Vehicle Age: ${vehicleAge} years`, marginLeft + 5, yPosition);
  yPosition += 8;
  
  doc.text(`Import Type: ${isDirectImport ? 'Direct Import' : 'Previously Registered'}`, marginLeft + 5, yPosition);
  yPosition += 20;
  
  // Valuation Section with modern card styling
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(marginLeft, yPosition - 5, contentWidth, 50, 3, 3, 'F');
  
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("VALUATION", marginLeft + 5, yPosition + 5);
  yPosition += 15;
  
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  
  doc.text(`Current Retail Selling Price (CRSP): ${formatCurrency(result.currentRetailPrice)}`, marginLeft + 5, yPosition);
  yPosition += 8;
  doc.text(`Depreciation Rate: ${(result.depreciationRate * 100).toFixed(0)}%`, marginLeft + 5, yPosition);
  yPosition += 8;
  doc.setFont("helvetica", "bold");
  doc.text(`Customs Value: ${formatCurrency(result.customsValue)}`, marginLeft + 5, yPosition);
  yPosition += 20;
  
  // Tax Breakdown Section with modern table design
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("TAX BREAKDOWN", marginLeft, yPosition);
  yPosition += 15;
  
  // Modern table header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(marginLeft, yPosition - 5, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("TAX TYPE", marginLeft + 5, yPosition + 3);
  doc.text("RATE", marginLeft + 100, yPosition + 3);
  doc.text("AMOUNT", marginLeft + 130, yPosition + 3);
  yPosition += 15;
  
  // Reset colors for content
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  
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
    taxItems.push({ name: "Railway Development Levy (RDL)", rate: "1.5%", amount: result.rdl });
  }
  
  // IDF
  if (result.idfFees > 0) {
    taxItems.push({ name: "Import Declaration Fee (IDF)", rate: "2.5%", amount: result.idfFees });
  }
  
  // Draw tax items with alternating row colors
  taxItems.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(marginLeft, yPosition - 3, contentWidth, 10, 'F');
    }
    doc.text(item.name, marginLeft + 5, yPosition + 2);
    doc.text(item.rate, marginLeft + 100, yPosition + 2);
    doc.text(formatCurrency(item.amount), marginLeft + 130, yPosition + 2);
    yPosition += 10;
  });
  
  // Registration fees
  if (result.registrationFees > 0) {
    if (taxItems.length % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(marginLeft, yPosition - 3, contentWidth, 10, 'F');
    }
    doc.text("Registration Fees (Estimate)", marginLeft + 5, yPosition + 2);
    doc.text("-", marginLeft + 100, yPosition + 2);
    doc.text(formatCurrency(result.registrationFees), marginLeft + 130, yPosition + 2);
    yPosition += 15;
  } else {
    yPosition += 5;
  }
  
  // Modern total section
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.roundedRect(marginLeft, yPosition, contentWidth, 15, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("TOTAL AMOUNT PAYABLE", marginLeft + 5, yPosition + 10);
  doc.text(formatCurrency(result.totalPayable), marginLeft + 130, yPosition + 10);
  yPosition += 25;
  
  // Modern footer with contact information
  const footerY = doc.internal.pageSize.height - 40;
  
  // Footer background
  doc.setFillColor(248, 250, 252);
  doc.rect(0, footerY - 5, pageWidth, 45, 'F');
  
  // Contact section
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  addCenteredText("GARIYANGU - ALL ABOUT CARS", footerY + 5, 11, "bold");
  
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  addCenteredText("Need help importing your vehicle? Contact us: 0736 272719", footerY + 12, 9);
  addCenteredText("Professional car import services from Japan, UK, South Africa, Dubai, Australia, Singapore & Thailand", footerY + 18, 8);
  
  // Disclaimer
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  addCenteredText("This calculation is based on official KRA valuation formulas and current tax rates.", footerY + 28, 8);
  addCenteredText("Please verify with KRA for final assessment.", footerY + 33, 8);
  
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