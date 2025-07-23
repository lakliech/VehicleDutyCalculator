
export interface PDFTemplateData {
  vehicleInfo: {
    make?: string;
    model?: string;
    bodyType?: string;
    fuelType?: string;
    engineSize: number;
    year: number;
    age: number;
    importType: string;
  };
  valuation: {
    crspValue: number;
    depreciationRate: number;
    depreciationAmount: number;
    customsValue: number;
  };
  taxes: {
    importDuty: number;
    exciseDuty: number;
    vat: number;
    rdl: number;
    idfFees: number;
    registrationFees: number;
    totalPayable: number;
  };
  generatedDate: string;
  usedCrsp2020?: boolean;
}

export function generateDutyCalculatorHTML(data: PDFTemplateData): string {
  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString('en-KE', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kenya Motor Vehicle Duty Calculation Report</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Helvetica', Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #333;
            background: white;
            padding: 20px;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid #740a72;
        }
        
        .logo-section {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .logo-placeholder {
            width: 60px;
            height: 40px;
            background: linear-gradient(135deg, #740a72, #b10573);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 10px;
        }
        
        .company-info h1 {
            color: #740a72;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .company-info p {
            color: #666;
            font-size: 10px;
        }
        
        .contact-info {
            text-align: right;
            color: #666;
            font-size: 10px;
        }
        
        .document-title {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .document-title h2 {
            color: #740a72;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .document-title .subtitle {
            color: #666;
            font-size: 12px;
            margin-bottom: 15px;
        }
        
        .generated-date {
            color: #666;
            font-size: 10px;
        }
        
        .section {
            margin-bottom: 25px;
        }
        
        .section-title {
            background: #740a72;
            color: white;
            padding: 8px 12px;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 0;
        }
        
        .data-table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #ddd;
        }
        
        .data-table th {
            background: #740a72;
            color: white;
            padding: 8px 12px;
            text-align: left;
            font-size: 10px;
            font-weight: bold;
            border: 1px solid #ddd;
        }
        
        .data-table td {
            padding: 8px 12px;
            border: 1px solid #ddd;
            font-size: 10px;
        }
        
        .data-table tr:nth-child(even) {
            background: #f8fafc;
        }
        
        .amount {
            text-align: right;
            font-weight: bold;
        }
        
        .total-row {
            background: #f0f0f0 !important;
            font-weight: bold;
        }
        
        .total-row td {
            color: #740a72;
            font-size: 11px;
        }
        
        .warning-notice {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 10px;
            border-radius: 4px;
            margin: 15px 0;
            font-size: 10px;
            color: #856404;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }
        
        .platform-description {
            color: #740a72;
            font-weight: bold;
            font-size: 11px;
            margin-bottom: 10px;
            line-height: 1.5;
        }
        
        .disclaimer {
            color: #666;
            font-size: 9px;
            line-height: 1.4;
        }
        
        .two-column {
            display: flex;
            gap: 20px;
        }
        
        .column {
            flex: 1;
        }
        
        @media print {
            body {
                padding: 15px;
            }
            
            .header {
                margin-bottom: 20px;
            }
            
            .section {
                break-inside: avoid;
                margin-bottom: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo-section">
            <div class="logo-placeholder">
                LOGO
            </div>
            <div class="company-info">
                <h1>Kenya's Car Marketplace</h1>
                <p>Professional Vehicle Import Services</p>
            </div>
        </div>
        <div class="contact-info">
            <div>Contact: +254 736 272719</div>
            <div>support@gariyangu.com</div>
        </div>
    </div>

    <div class="document-title">
        <h2>KENYA MOTOR VEHICLE DUTY CALCULATION</h2>
        <div class="subtitle">Official KRA Import Duty Assessment Report</div>
        <div class="generated-date">Generated: ${data.generatedDate}</div>
    </div>

    <div class="section">
        <div class="section-title">VEHICLE DETAILS</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>ITEM</th>
                    <th>VALUE</th>
                </tr>
            </thead>
            <tbody>
                ${data.vehicleInfo.make ? `
                <tr>
                    <td>Make & Model</td>
                    <td>${data.vehicleInfo.make} ${data.vehicleInfo.model || ''}</td>
                </tr>
                ` : ''}
                ${data.vehicleInfo.bodyType ? `
                <tr>
                    <td>Body Type</td>
                    <td>${data.vehicleInfo.bodyType}</td>
                </tr>
                ` : ''}
                ${data.vehicleInfo.fuelType ? `
                <tr>
                    <td>Fuel Type</td>
                    <td>${data.vehicleInfo.fuelType}</td>
                </tr>
                ` : ''}
                <tr>
                    <td>Engine Size</td>
                    <td>${data.vehicleInfo.engineSize}cc</td>
                </tr>
                <tr>
                    <td>Year</td>
                    <td>${data.vehicleInfo.year}</td>
                </tr>
                <tr>
                    <td>Age</td>
                    <td>${data.vehicleInfo.age} years</td>
                </tr>
                <tr>
                    <td>Import Type</td>
                    <td>${data.vehicleInfo.importType}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="section">
        <div class="section-title">VALUATION</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>COMPONENT</th>
                    <th>AMOUNT (KES)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>CRSP Value${data.usedCrsp2020 ? ' (2020 CRSP)' : ''}</td>
                    <td class="amount">${formatCurrency(data.valuation.crspValue)}</td>
                </tr>
                <tr>
                    <td>Depreciation (${(data.valuation.depreciationRate * 100).toFixed(0)}%)</td>
                    <td class="amount">-${formatCurrency(data.valuation.depreciationAmount)}</td>
                </tr>
                <tr class="total-row">
                    <td>Customs Value</td>
                    <td class="amount">${formatCurrency(data.valuation.customsValue)}</td>
                </tr>
            </tbody>
        </table>
    </div>

    ${data.usedCrsp2020 ? `
    <div class="warning-notice">
        ⚠️ Calculation based on 2020 CRSP values - current market prices may differ significantly
    </div>
    ` : ''}

    <div class="section">
        <div class="section-title">TAX BREAKDOWN</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>TAX TYPE</th>
                    <th>AMOUNT (KES)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Import Duty</td>
                    <td class="amount">${formatCurrency(data.taxes.importDuty)}</td>
                </tr>
                <tr>
                    <td>Excise Duty</td>
                    <td class="amount">${formatCurrency(data.taxes.exciseDuty)}</td>
                </tr>
                <tr>
                    <td>VAT (16%)</td>
                    <td class="amount">${formatCurrency(data.taxes.vat)}</td>
                </tr>
                ${data.vehicleInfo.importType === 'Direct Import' ? `
                <tr>
                    <td>RDL (2%)</td>
                    <td class="amount">${formatCurrency(data.taxes.rdl)}</td>
                </tr>
                <tr>
                    <td>IDF (2.5%)</td>
                    <td class="amount">${formatCurrency(data.taxes.idfFees)}</td>
                </tr>
                ` : ''}
                <tr>
                    <td>Registration Fees</td>
                    <td class="amount">${formatCurrency(data.taxes.registrationFees)}</td>
                </tr>
                <tr class="total-row">
                    <td>TOTAL PAYABLE</td>
                    <td class="amount">${formatCurrency(data.taxes.totalPayable)}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="footer">
        <div class="platform-description">
            Kenya's leading automotive marketplace platform, revolutionizing how people buy, sell, and manage vehicles with cutting-edge technology and official government integration.
        </div>
        <div class="disclaimer">
            Disclaimer: Calculations based on current KRA rates. Actual charges may vary. For professional vehicle inspection and import assistance, contact Gariyangu at +254 736 272719.
        </div>
    </div>
</body>
</html>
  `;
}
