import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Calculator, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface LoanCalculatorProps {
  vehiclePrice?: number;
  onCalculate?: (calculation: LoanCalculation) => void;
}

interface LoanCalculation {
  vehiclePrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  tenureMonths: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayable: number;
  processingFee: number;
  totalInitialCost: number;
}

export default function LoanCalculator({ vehiclePrice = 0, onCalculate }: LoanCalculatorProps) {
  const [price, setPrice] = useState(vehiclePrice);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(15);
  const [tenureMonths, setTenureMonths] = useState(60);
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null);

  const calculateLoan = () => {
    const loanAmount = price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    const totalPayable = monthlyPayment * tenureMonths;
    const totalInterest = totalPayable - loanAmount;
    const processingFee = loanAmount * 0.02; // 2% processing fee
    const totalInitialCost = downPayment + processingFee;

    const result: LoanCalculation = {
      vehiclePrice: price,
      downPayment,
      loanAmount,
      interestRate,
      tenureMonths,
      monthlyPayment,
      totalInterest,
      totalPayable,
      processingFee,
      totalInitialCost,
    };

    setCalculation(result);
    if (onCalculate) onCalculate(result);
  };

  useEffect(() => {
    if (price > 0) {
      const minDownPayment = price * 0.2; // 20% minimum
      setDownPayment(minDownPayment);
    }
  }, [price]);

  useEffect(() => {
    if (price > 0 && downPayment > 0) {
      calculateLoan();
    }
  }, [price, downPayment, interestRate, tenureMonths]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Loan Calculator
          </CardTitle>
          <CardDescription>
            Calculate your monthly payments and total loan cost
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vehicle-price">Vehicle Price (KES)</Label>
              <Input
                id="vehicle-price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="2,000,000"
              />
            </div>
            <div>
              <Label htmlFor="down-payment">Down Payment (KES)</Label>
              <Input
                id="down-payment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                placeholder="400,000"
              />
            </div>
            <div>
              <Label htmlFor="interest-rate">Interest Rate (%)</Label>
              <Input
                id="interest-rate"
                type="number"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                placeholder="15"
              />
            </div>
            <div>
              <Label htmlFor="tenure">Loan Tenure</Label>
              <Select value={tenureMonths.toString()} onValueChange={(value) => setTenureMonths(Number(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">1 Year</SelectItem>
                  <SelectItem value="24">2 Years</SelectItem>
                  <SelectItem value="36">3 Years</SelectItem>
                  <SelectItem value="48">4 Years</SelectItem>
                  <SelectItem value="60">5 Years</SelectItem>
                  <SelectItem value="72">6 Years</SelectItem>
                  <SelectItem value="84">7 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {calculation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Loan Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Vehicle Price:</span>
                  <span className="font-bold">KES {calculation.vehiclePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Down Payment:</span>
                  <span className="font-bold">KES {calculation.downPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Loan Amount:</span>
                  <span className="font-bold">KES {calculation.loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Processing Fee:</span>
                  <span className="font-bold">KES {calculation.processingFee.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Initial Cost:</span>
                  <span className="font-bold text-purple-600">KES {calculation.totalInitialCost.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Monthly Payment:</span>
                  <span className="font-bold text-green-600">KES {calculation.monthlyPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Interest:</span>
                  <span className="font-bold">KES {calculation.totalInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Payable:</span>
                  <span className="font-bold">KES {calculation.totalPayable.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Loan Duration:</span>
                  <span className="font-bold">{calculation.tenureMonths} months</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}