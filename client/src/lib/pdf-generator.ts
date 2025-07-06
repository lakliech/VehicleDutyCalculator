import jsPDF from 'jspdf';
import type { DutyResult, VehicleReference } from '@shared/schema';

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
  
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString('en-KE', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  // Helper function to add centered text
  const addCenteredText = (text: string, y: number, fontSize: number = 12) => {
    doc.setFontSize(fontSize);
    const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, y);
  };

  // Title
  doc.setFont("helvetica", "bold");
  addCenteredText("KENYA MOTOR VEHICLE DUTY CALCULATION", 20, 16);
  
  // Subtitle
  doc.setFont("helvetica", "normal");
  addCenteredText("Kenya Revenue Authority (KRA) Import Duty Assessment", 30, 10);
  
  // Date
  const currentDate = new Date().toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.setFontSize(10);
  doc.text(`Report Date: ${currentDate}`, marginLeft, 40);
  
  // Line separator
  doc.setLineWidth(0.5);
  doc.line(marginLeft, 45, pageWidth - marginRight, 45);
  
  let yPosition = 55;
  
  // Vehicle Information Section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("VEHICLE INFORMATION", marginLeft, yPosition);
  yPosition += 10;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  
  if (selectedVehicle) {
    doc.text(`Make: ${selectedVehicle.make}`, marginLeft, yPosition);
    yPosition += 7;
    doc.text(`Model: ${selectedVehicle.model}`, marginLeft, yPosition);
    yPosition += 7;
    doc.text(`Body Type: ${selectedVehicle.bodyType || 'N/A'}`, marginLeft, yPosition);
    yPosition += 7;
    doc.text(`Fuel Type: ${selectedVehicle.fuelType || 'N/A'}`, marginLeft, yPosition);
    yPosition += 7;
  }
  
  doc.text(`Engine Size: ${engineSize}cc`, marginLeft, yPosition);
  yPosition += 7;
  doc.text(`Year of Manufacture: ${yearOfManufacture}`, marginLeft, yPosition);
  yPosition += 7;
  
  const vehicleAge = new Date().getFullYear() - yearOfManufacture;
  doc.text(`Vehicle Age: ${vehicleAge} years`, marginLeft, yPosition);
  yPosition += 7;
  
  doc.text(`Import Type: ${isDirectImport ? 'Direct Import' : 'Previously Registered'}`, marginLeft, yPosition);
  yPosition += 15;
  
  // Valuation Section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("VALUATION", marginLeft, yPosition);
  yPosition += 10;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  
  doc.text(`Current Retail Selling Price (CRSP): ${formatCurrency(result.currentRetailPrice)}`, marginLeft, yPosition);
  yPosition += 7;
  doc.text(`Depreciation Rate: ${(result.depreciationRate * 100).toFixed(0)}%`, marginLeft, yPosition);
  yPosition += 7;
  doc.text(`Customs Value: ${formatCurrency(result.customsValue)}`, marginLeft, yPosition);
  yPosition += 15;
  
  // Tax Breakdown Section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("TAX BREAKDOWN", marginLeft, yPosition);
  yPosition += 10;
  
  // Create a table-like structure for taxes
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  
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
    taxItems.push({ name: "Import Declaration Fee (IDF)", rate: "3.5%", amount: result.idfFees });
  }
  
  // Draw tax items
  taxItems.forEach(item => {
    doc.text(item.name, marginLeft, yPosition);
    doc.text(item.rate, marginLeft + 100, yPosition);
    doc.text(formatCurrency(item.amount), marginLeft + 130, yPosition);
    yPosition += 7;
  });
  
  // Registration fees
  if (result.registrationFees > 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Registration Fees (Estimate)", marginLeft, yPosition);
    doc.text("-", marginLeft + 100, yPosition);
    doc.text(formatCurrency(result.registrationFees), marginLeft + 130, yPosition);
    yPosition += 7;
  }
  
  // Total line
  doc.setLineWidth(0.3);
  doc.line(marginLeft, yPosition, pageWidth - marginRight, yPosition);
  yPosition += 7;
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("TOTAL AMOUNT PAYABLE", marginLeft, yPosition);
  doc.text(formatCurrency(result.totalPayable), marginLeft + 130, yPosition);
  yPosition += 15;
  
  // Footer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(100);
  const footerText = "This calculation is based on official KRA valuation formulas and current tax rates.";
  addCenteredText(footerText, doc.internal.pageSize.height - 20, 9);
  
  const disclaimerText = "Please verify with KRA for final assessment.";
  addCenteredText(disclaimerText, doc.internal.pageSize.height - 15, 9);
  
  // Reset text color
  doc.setTextColor(0);
  
  // Generate filename
  const vehicleInfo = selectedVehicle 
    ? `${selectedVehicle.make}_${selectedVehicle.model}_`
    : '';
  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `KRA_Duty_Calculation_${vehicleInfo}${timestamp}.pdf`;
  
  // Save the PDF
  doc.save(filename);
}