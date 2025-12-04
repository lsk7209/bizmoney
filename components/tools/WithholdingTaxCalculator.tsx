'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function WithholdingTaxCalculator() {
    const [amount, setAmount] = useState<string>('');
    const [calcType, setCalcType] = useState<'gross' | 'net'>('gross');
    const [result, setResult] = useState<{ gross: number; tax: number; net: number } | null>(null);

    useEffect(() => {
        calculate();
    }, [amount, calcType]);

    const calculate = () => {
        const val = parseFloat(amount.replace(/,/g, ''));
        if (isNaN(val) || val === 0) {
            setResult(null);
            return;
        }

        let gross = 0;
        let tax = 0;
        let net = 0;

        if (calcType === 'gross') {
            // Input is Gross (Pre-tax)
            gross = val;
            tax = Math.floor(gross * 0.033); // 3.3%
            net = gross - tax;
        } else {
            // Input is Net (Post-tax)
            net = val;
            // Net = Gross * (1 - 0.033) => Gross = Net / 0.967
            gross = Math.floor(net / 0.967);
            tax = gross - net;
        }

        setResult({ gross, tax, net });
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('ko-KR').format(num);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        setAmount(val);
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-8">
            <Card className="border-2 border-cyan-100 dark:border-cyan-900 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30">
                    <CardTitle className="text-2xl font-bold text-center text-cyan-700 dark:text-cyan-300">
                        🧾 3.3% 원천징수 계산기
                    </CardTitle>
                    <CardDescription className="text-center">
                        프리랜서, 아르바이트 급여 계산 시 세금(3.3%)을 제외한 실수령액을 확인하세요.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col space-y-2">
                        <Label className="text-base font-semibold">계산 기준</Label>
                        <RadioGroup
                            defaultValue="gross"
                            value={calcType}
                            onValueChange={(v) => setCalcType(v as 'gross' | 'net')}
                            className="flex space-x-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="gross" id="r1" />
                                <Label htmlFor="r1" className="cursor-pointer">세전 금액 (지급액 기준)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="net" id="r2" />
                                <Label htmlFor="r2" className="cursor-pointer">세후 금액 (실수령액 기준)</Label>
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
                                onChange={handleAmountChange}
                                className="text-xl h-14 pr-10 text-right font-mono"
                                placeholder="0"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
                        </div>
                    </div>

                    {result && (
                        <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-gray-600 dark:text-gray-400">세전 금액 (총 지급액)</span>
                                <span className="text-xl font-bold">{formatNumber(result.gross)}원</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-gray-600 dark:text-gray-400">원천징수세 (3.3%)</span>
                                <span className="text-xl font-bold text-red-600 dark:text-red-400">-{formatNumber(result.tax)}원</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-lg font-bold">세후 실수령액</span>
                                <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{formatNumber(result.net)}원</span>
                            </div>
                        </div>
                    )}

                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                        <p>💡 <strong>3.3%란?</strong> 소득세 3% + 지방소득세 0.3%를 합친 금액입니다.</p>
                        <p>💡 5월 종합소득세 신고 시, 미리 낸 3.3% 세금을 정산하여 환급받거나 추가 납부하게 됩니다.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
