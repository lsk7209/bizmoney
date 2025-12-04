'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function VatCalculator() {
  const [activeTab, setActiveTab] = useState('general');

  // General Calculator State
  const [amount, setAmount] = useState<string>('');
  const [amountType, setAmountType] = useState<'supply' | 'total'>('total');
  const [taxRate, setTaxRate] = useState<'10' | '0'>('10');
  const [result, setResult] = useState<{ supply: number; vat: number; total: number } | null>(null);

  // Refund Calculator State
  const [salesAmount, setSalesAmount] = useState<string>('');
  const [purchaseAmount, setPurchaseAmount] = useState<string>('');
  const [refundResult, setRefundResult] = useState<{ salesVat: number; purchaseVat: number; payable: number } | null>(null);

  useEffect(() => {
    calculateGeneral();
  }, [amount, amountType, taxRate]);

  useEffect(() => {
    calculateRefund();
  }, [salesAmount, purchaseAmount]);

  const calculateGeneral = () => {
    const val = parseFloat(amount.replace(/,/g, ''));
    if (isNaN(val) || val === 0) {
      setResult(null);
      return;
    }

    let supply = 0;
    let vat = 0;
    let total = 0;
    const rate = parseInt(taxRate) / 100;

    if (amountType === 'supply') {
      supply = val;
      vat = Math.floor(supply * rate);
      total = supply + vat;
    } else {
      total = val;
      if (rate === 0) {
        supply = total;
        vat = 0;
      } else {
        supply = Math.round(total / 1.1);
        vat = total - supply;
      }
    }

    setResult({ supply, vat, total });
  };

  const calculateRefund = () => {
    const sales = parseFloat(salesAmount.replace(/,/g, ''));
    const purchase = parseFloat(purchaseAmount.replace(/,/g, ''));

    if ((isNaN(sales) && isNaN(purchase)) || (sales === 0 && purchase === 0)) {
      setRefundResult(null);
      return;
    }

    const s = isNaN(sales) ? 0 : sales;
    const p = isNaN(purchase) ? 0 : purchase;

    // Assuming inputs are Supply Value
    const salesVat = Math.floor(s * 0.1);
    const purchaseVat = Math.floor(p * 0.1);
    const payable = salesVat - purchaseVat;

    setRefundResult({ salesVat, purchaseVat, payable });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setter(val);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <Card className="border-2 border-indigo-100 dark:border-indigo-900 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30">
          <CardTitle className="text-2xl font-bold text-center text-indigo-700 dark:text-indigo-300">
            🧮 부가가치세(VAT) 계산기
          </CardTitle>
          <CardDescription className="text-center">
            공급가액/합계금액 변환 및 예상 납부세액을 계산해보세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="general" className="text-lg">일반 계산 (공급가/합계)</TabsTrigger>
              <TabsTrigger value="refund" className="text-lg">예상 납부세액 계산</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label className="text-base font-semibold">계산 기준</Label>
                  <RadioGroup 
                    defaultValue="total" 
                    value={amountType} 
                    onValueChange={(v) => setAmountType(v as 'supply' | 'total')}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="total" id="r1" />
                      <Label htmlFor="r1" className="cursor-pointer">합계금액 (부가세 포함)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="supply" id="r2" />
                      <Label htmlFor="r2" className="cursor-pointer">공급가액 (부가세 별도)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label className="text-base font-semibold">과세 구분</Label>
                  <RadioGroup 
                    defaultValue="10" 
                    value={taxRate} 
                    onValueChange={(v) => setTaxRate(v as '10' | '0')}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10" id="t1" />
                      <Label htmlFor="t1" className="cursor-pointer">일반과세 (10%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="t2" />
                      <Label htmlFor="t2" className="cursor-pointer">영세율/면세 (0%)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-base font-semibold">금액 입력</Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="text"
                      value={amount ? formatNumber(parseInt(amount)) : ''}
                      onChange={(e) => handleAmountChange(e, setAmount)}
                      className="text-xl h-14 pr-10 text-right font-mono"
                      placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
                  </div>
                </div>
              </div>

              {result && (
                <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600 dark:text-gray-400">공급가액</span>
                    <span className="text-xl font-bold">{formatNumber(result.supply)}원</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600 dark:text-gray-400">부가가치세</span>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(result.vat)}원</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold">합계금액</span>
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{formatNumber(result.total)}원</span>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="refund" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sales" className="text-base font-semibold">매출 공급가액 (수익)</Label>
                  <div className="relative">
                    <Input
                      id="sales"
                      type="text"
                      value={salesAmount ? formatNumber(parseInt(salesAmount)) : ''}
                      onChange={(e) => handleAmountChange(e, setSalesAmount)}
                      className="text-lg h-12 pr-10 text-right font-mono"
                      placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchase" className="text-base font-semibold">매입 공급가액 (지출)</Label>
                  <div className="relative">
                    <Input
                      id="purchase"
                      type="text"
                      value={purchaseAmount ? formatNumber(parseInt(purchaseAmount)) : ''}
                      onChange={(e) => handleAmountChange(e, setPurchaseAmount)}
                      className="text-lg h-12 pr-10 text-right font-mono"
                      placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
                  </div>
                </div>
              </div>

              {refundResult && (
                <div className="mt-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">매출세액 (+)</div>
                      <div className="text-lg font-bold text-blue-600">{formatNumber(refundResult.salesVat)}원</div>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">매입세액 (-)</div>
                      <div className="text-lg font-bold text-red-600">{formatNumber(refundResult.purchaseVat)}원</div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl border-2 text-center ${
                    refundResult.payable < 0 
                      ? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800' 
                      : 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800'
                  }`}>
                    <div className="text-lg font-semibold mb-2">
                      {refundResult.payable < 0 ? '예상 환급 세액' : '예상 납부 세액'}
                    </div>
                    <div className={`text-4xl font-bold ${
                      refundResult.payable < 0 ? 'text-green-600' : 'text-indigo-600'
                    }`}>
                      {formatNumber(Math.abs(refundResult.payable))}원
                    </div>
                    {refundResult.payable < 0 && (
                      <p className="mt-2 text-sm text-green-700 dark:text-green-400">
                        🎉 축하합니다! 세금을 환급받으실 수 있어요.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500">
        <p>※ 본 계산기는 일반과세자(세율 10%) 기준으로 계산됩니다.</p>
        <p>※ 실제 세금 신고 시에는 세무 전문가의 검토를 받으시길 권장합니다.</p>
      </div>
    </div>
  );
}
