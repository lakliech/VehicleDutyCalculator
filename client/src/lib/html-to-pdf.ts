
import { generateDutyCalculatorHTML, type PDFTemplateData } from './pdf-html-template';
import type { DutyResult, VehicleReference } from '@shared/schema';

export function generateDutyCalculationHTMLPDF(
  result: DutyResult,
  selectedVehicle: VehicleReference | null,
  yearOfManufacture: number,
  engineSize: number,
  isDirectImport: boolean
) {
  const vehicleAge = new Date().getFullYear() - yearOfManufacture + 1;
  
  const templateData: PDFTemplateData = {
    vehicleInfo: {
      make: selectedVehicle?.make,
      model: selectedVehicle?.model,
      bodyType: selectedVehicle?.bodyType || undefined,
      fuelType: selectedVehicle?.fuelType || undefined,
      engineSize,
      year: yearOfManufacture,
      age: vehicleAge,
      importType: isDirectImport ? 'Direct Import' : 'Previously Registered'
    },
    valuation: {
      crspValue: result.currentRetailPrice,
      depreciationRate: result.depreciationRate,
      depreciationAmount: result.currentRetailPrice - result.depreciatedPrice,
      customsValue: result.customsValue
    },
    taxes: {
      importDuty: result.importDuty,
      exciseDuty: result.exciseDuty,
      vat: result.vat,
      rdl: result.rdl,
      idfFees: result.idfFees,
      registrationFees: result.registrationFees || 0,
      totalPayable: result.totalPayable
    },
    generatedDate: new Date().toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    usedCrsp2020: result.usedCrsp2020
  };

  const htmlContent = generateDutyCalculatorHTML(templateData);
  
  // Create a new window/tab with the HTML content for printing/PDF conversion
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Trigger print dialog after content loads
    printWindow.onload = () => {
      printWindow.print();
    };
  }
  
  return htmlContent;
}

// Alternative method to download as HTML file
export function downloadDutyCalculationHTML(
  result: DutyResult,
  selectedVehicle: VehicleReference | null,
  yearOfManufacture: number,
  engineSize: number,
  isDirectImport: boolean
) {
  const htmlContent = generateDutyCalculationHTMLPDF(
    result,
    selectedVehicle,
    yearOfManufacture,
    engineSize,
    isDirectImport
  );
  
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const fileName = selectedVehicle 
    ? `${selectedVehicle.make}_${selectedVehicle.model}_duty_calculation.html`
    : `vehicle_duty_calculation_${yearOfManufacture}.html`;
    
  link.href = url;
  link.download = fileName;
  link.click();
  
  URL.revokeObjectURL(url);
}
