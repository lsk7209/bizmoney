'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateWithholdingTax, formatCurrency, WithholdingTaxInput } from '@/lib/withholding-tax-logic';

const BUSINESS_TYPES = [
  { code: 'freelancer', name: '프리랜서' },
  { code: 'consulting', name: '컨설팅' },
  { code: 'design', name: '디자인' },
  { code: 'education', name: '교육/강사' },
  { code: 'other', name: '기타' },
] as const;

export function WithholdingTaxCalculator() {
  const [input, setInput] = useState<WithholdingTaxInput>({
    contractAmount: 0,
    businessType: 'freelancer',
    isVATIncluded: true,
  });

  const [result, setResult] = useState<ReturnType<typeof calculateWithholdingTax> | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const contractAmountInputRef = useRef<HTMLInputElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);


  const handleCalculate = useCallback(() => {
    try {
      if (input.contractAmount <= 0) {
        alert('계약금액을 입력해주세요.');
        if (contractAmountInputRef.current) {
          contractAmountInputRef.current.focus();
        }
        return;
      }

      const calculated = calculateWithholdingTax(input);
      setResult(calculated);
      setHasCalculated(true);

      setTimeout(() => {
        resultSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      console.error('Calculation error:', error);
      alert('계산 중 오류가 발생했습니다. 입력값을 확인해주세요.');
    }
  }, [input]);

  const handleReset = useCallback(() => {
    setInput({
      contractAmount: 0,
      businessType: 'freelancer',
      isVATIncluded: true,
    });
    setResult(null);
    setHasCalculated(false);
    if (contractAmountInputRef.current) {
      contractAmountInputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
            💰 무료 원천징수세 계산기
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          원천징수세 계산기
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;원천징수세가 얼마나 될까요?&rdquo;</span>
          <br />
          계약금액을 입력하면 <strong>원천징수세액</strong>과 <strong className="text-green-600 dark:text-green-400">실수령액</strong>을 계산합니다.
        </p>
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg max-w-xl mx-auto">
          <p className="text-sm text-foreground/80">
            ✅ <strong>100% 무료</strong> · ✅ <strong>개인정보 보호</strong> · ✅ <strong>즉시 결과 확인</strong>
          </p>
        </div>
      </header>

      <Card className="focus-card border-2 border-blue-200 dark:border-blue-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">계산기 입력</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="businessType" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">🏢</span>
              <span>업종</span>
            </Label>
            <select
              id="businessType"
              value={input.businessType}
              onChange={(e) => setInput({ ...input, businessType: e.target.value as WithholdingTaxInput['businessType'] })}
              className="w-full h-14 px-4 text-lg font-medium border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-background focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              {BUSINESS_TYPES.map((type) => (
                <option key={type.code} value={type.code}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="contractAmount" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">💵</span>
              <span>계약금액</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              ref={contractAmountInputRef}
              id="contractAmount"
              type="number"
              min="0"
              step="1000"
              value={input.contractAmount === 0 ? '' : input.contractAmount}
              onChange={(e) => {
                const value = Number(e.target.value) || 0;
                setInput({ ...input, contractAmount: Math.max(0, value) });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCalculate();
                }
              }}
              placeholder="예: 10000000"
              className="h-14 text-lg font-medium border-2 border-gray-300 dark:border-gray-700 rounded-xl px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              aria-required="true"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">📋</span>
              <span>부가세 포함 여부</span>
            </Label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={input.isVATIncluded}
                  onChange={() => setInput({ ...input, isVATIncluded: true })}
                  className="w-4 h-4"
                />
                <span>부가세 포함</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!input.isVATIncluded}
                  onChange={() => setInput({ ...input, isVATIncluded: false })}
                  className="w-4 h-4"
                />
                <span>부가세 별도</span>
              </label>
            </div>
            <p className="text-sm text-foreground/60">
              💡 계약서에 명시된 금액 기준으로 선택하세요.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={handleCalculate} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all" 
              size="lg"
            >
              💰 원천징수세 계산하기
            </Button>
            <Button 
              onClick={handleReset} 
              variant="outline" 
              size="lg"
              className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              🔄 초기화
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && hasCalculated && (
        <Card 
          ref={resultSectionRef}
          className="border-2 border-green-300 dark:border-green-700 bg-gradient-to-br from-green-50 to-white dark:from-green-950/40 dark:to-gray-900 shadow-xl"
        >
          <CardHeader className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-950/20 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400">
                  계산 결과
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  면책 조항: 본 계산 결과는 모의 계산이며 법적 효력이 없습니다.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* 핵심 결과 - 눈에 띄게 */}
            <div className="p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-green-950/40 dark:via-emerald-950/40 dark:to-green-900/20 rounded-2xl border-4 border-green-400 dark:border-green-600 shadow-2xl text-center">
              <div className="mb-4">
                <span className="text-5xl">💰</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
                실제로 받을 수 있는 금액은?
              </h3>
              <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                {formatCurrency(result.netAmount)}
              </div>
              <p className="text-base text-foreground/70 mt-3">
                💡 계약금액에서 원천징수세액(3.3%)을 제외한 실제 받을 금액이에요!
              </p>
            </div>

            {/* 상세 내역 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📋</span>
                  <div className="text-base font-semibold text-muted-foreground">계약금액</div>
                </div>
                <div className="text-xl font-bold text-foreground">{formatCurrency(result.contractAmount)}</div>
                <p className="text-xs text-foreground/60 mt-2">의뢰인과 계약한 총 금액</p>
              </div>
              {result.vatAmount > 0 && (
                <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💵</span>
                    <div className="text-base font-semibold text-muted-foreground">부가세액</div>
                  </div>
                  <div className="text-xl font-bold text-foreground">{formatCurrency(result.vatAmount)}</div>
                  <p className="text-xs text-foreground/60 mt-2">공급가액의 10%</p>
                </div>
              )}
              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📊</span>
                  <div className="text-base font-semibold text-muted-foreground">공급가액</div>
                </div>
                <div className="text-xl font-bold text-foreground">{formatCurrency(result.supplyAmount)}</div>
                <p className="text-xs text-foreground/60 mt-2">부가세 제외 금액</p>
              </div>
              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🏛️</span>
                  <div className="text-base font-semibold text-muted-foreground">원천징수세액</div>
                </div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.withholdingTax)}</div>
                <p className="text-xs text-foreground/60 mt-2">공급가액의 3.3% (미리 떼는 세금)</p>
              </div>
            </div>

            {/* 중요 안내 - 바이럴 요소 */}
            <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 rounded-xl border-2 border-orange-200 dark:border-orange-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <span>원천징수세는 나중에 정산돼요!</span>
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-orange-200 dark:border-orange-800">
                  <p className="text-base font-semibold text-foreground mb-2">
                    ✅ 5월 종합소득세 신고 시 정산
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    원천징수된 3.3%는 다음 해 5월 종합소득세 신고 시 기납부세액으로 처리돼요. 실제 세액이 적으면 환급받을 수 있어요!
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border-2 border-blue-300 dark:border-blue-700">
                  <p className="text-base font-bold text-blue-700 dark:text-blue-300 mb-2">
                    🎁 2025년 신규! 국세청 &quot;원클릭&quot; 무료 환급
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    홈택스에서 &quot;원클릭 환급 신고&quot;로 최대 5년치 환급금을 <strong className="text-blue-600 dark:text-blue-400">완전 무료</strong>로 확인할 수 있어요! 원천징수세 정산도 자동으로 해줘요.
                  </p>
                </div>
              </div>
            </div>

            {/* 공유 버튼 */}
            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
              <p className="text-center font-semibold text-base mb-4 text-foreground">
                🎉 친구들도 계산해보라고 공유해보세요!
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        `원천징수세 계산기로 내 실수령액을 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
                      );
                      alert('링크가 클립보드에 복사되었습니다!');
                    } catch (err) {
                      alert('복사에 실패했습니다.');
                    }
                  }}
                  variant="outline"
                  className="border-2 hover:bg-green-50 dark:hover:bg-green-950/50"
                  size="lg"
                >
                  📋 링크 복사
                </Button>
                <Button
                  onClick={() => {
                    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `원천징수세 계산기로 내 실수령액을 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
                    )}`;
                    window.open(twitterUrl, '_blank');
                  }}
                  variant="outline"
                  className="border-2 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                  size="lg"
                >
                  🐦 트위터 공유
                </Button>
              </div>
            </div>

            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-950/50 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl shadow-md">
              <p className="text-base font-semibold text-yellow-900 dark:text-yellow-100 leading-relaxed">
                <span className="text-xl mr-2">⚠️</span>
                <strong>면책 조항:</strong> 본 계산 결과는 모의 계산이며 법적 효력이 없습니다. 정확한 원천징수세는 세무 전문가의 도움을 받으시기 바랍니다.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {result && hasCalculated && (
        <div className="my-8 flex justify-center">
        </div>
      )}

      {/* SEO 콘텐츠 - 재미있고 유익하게 개선 */}
      <article className="prose prose-lg max-w-none dark:prose-invert mt-16">
        <div className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 rounded-2xl p-8 md:p-10 border-2 border-blue-200 dark:border-blue-800">
          <h2 className="text-3xl font-bold mb-6 text-foreground">원천징수세 계산기 완벽 가이드 (2025년 최신!)</h2>
          <p className="text-lg leading-relaxed mb-8 text-foreground/80">
            원천징수세는 프리랜서가 계약금액을 받을 때 의뢰인이 미리 징수하는 세금입니다. 본 계산기로 예상 원천징수세액과 실수령액을 확인하세요.
            <strong className="text-blue-600 dark:text-blue-400"> 2025년 최신 세법</strong>을 반영하여 계산합니다.
          </p>
          
          <div className="space-y-8">
            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <span>원천징수세란? (프리랜서 필수 지식!)</span>
              </h3>
              <div className="space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  원천징수세는 프리랜서가 받는 계약금액에서 의뢰인이 <strong className="text-blue-600 dark:text-blue-400">미리 징수하는 세금</strong>입니다. 
                  일반적으로 <strong className="text-blue-600 dark:text-blue-400">3.3%</strong>의 원천징수율이 적용되며, 
                  연말정산 시 실제 세액과 비교하여 정산됩니다.
                </p>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    💡 왜 미리 징수할까요?
                  </p>
                  <p className="text-sm text-foreground/80">
                    프리랜서는 매월 소득이 발생하지만, 세금은 다음 해 5월에 신고해요. 
                    그래서 의뢰인이 미리 세금을 떼어서 국세청에 납부하는 거예요! 
                    나중에 실제 세액과 비교해서 정산돼요.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800 mt-4">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                    💰 원천징수세 예시
                  </p>
                  <p className="text-sm text-foreground/80">
                    계약금액 100만원이면<br />
                    원천징수세 = <strong>100만원 × 3.3% = 3.3만원</strong><br />
                    실수령액 = <strong>100만원 - 3.3만원 = 96.7만원</strong>
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <span>실수령액 계산 (부가세 포함/미포함 구분 중요!)</span>
              </h3>
              <div className="space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  실수령액 = 계약금액 - 원천징수세액입니다. 
                  <strong className="text-blue-600 dark:text-blue-400">부가세 포함 계약</strong>의 경우 
                  부가세를 제외한 공급가액 기준으로 원천징수세가 계산됩니다.
                </p>
                <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800 mt-4">
                  <p className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-2">
                    💡 부가세 포함 계약 예시
                  </p>
                  <p className="text-sm text-foreground/80">
                    계약금액 110만원 (부가세 포함)이면<br />
                    공급가액 = 110만원 ÷ 1.1 = <strong>100만원</strong><br />
                    원천징수세 = 100만원 × 3.3% = <strong>3.3만원</strong><br />
                    실수령액 = 110만원 - 3.3만원 = <strong>106.7만원</strong>
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    💡 부가세 미포함 계약 예시
                  </p>
                  <p className="text-sm text-foreground/80">
                    계약금액 100만원 (부가세 미포함)이면<br />
                    원천징수세 = 100만원 × 3.3% = <strong>3.3만원</strong><br />
                    실수령액 = 100만원 - 3.3만원 = <strong>96.7만원</strong>
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <span>5월 종합소득세 신고 시 정산 (환급받을 수도 있어요!)</span>
              </h3>
              <div className="space-y-4 text-base leading-relaxed text-foreground/80">
                <p>
                  원천징수된 3.3%는 다음 해 <strong className="text-blue-600 dark:text-blue-400">5월 종합소득세 신고 시 기납부세액</strong>으로 처리돼요. 
                  실제 세액이 적으면 환급받을 수 있어요!
                </p>
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800 mt-4">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                    💰 환급 예시
                  </p>
                  <p className="text-sm text-foreground/80">
                    원천징수세 100만원, 실제 세액 50만원이면<br />
                    환급금 = <strong>100만원 - 50만원 = 50만원</strong>을 환급받아요! 🎉
                  </p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800 mt-4">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">
                    💰 추가납부 예시
                  </p>
                  <p className="text-sm text-foreground/80">
                    원천징수세 50만원, 실제 세액 100만원이면<br />
                    추가납부 = <strong>100만원 - 50만원 = 50만원</strong>을 추가로 납부해야 해요.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl p-6 border-2 border-blue-300 dark:border-blue-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-blue-700 dark:text-blue-300">
                <span className="text-2xl">🎁</span>
                <span>2025년 신규! 국세청 &quot;원클릭&quot; 무료 환급 서비스</span>
              </h3>
              <div className="space-y-3 text-base leading-relaxed text-foreground/90">
                <p>
                  <strong className="text-blue-600 dark:text-blue-400">홈택스에서 &quot;원클릭 환급 신고&quot;</strong> 메뉴를 찾아보세요!
                  최대 <strong>5년치 환급금</strong>을 <strong className="text-blue-600 dark:text-blue-400">완전 무료</strong>로 확인하고 신청할 수 있어요.
                </p>
                <p>
                  원천징수세 정산도 원클릭으로 자동으로 해줘요! 
                  삼쩜삼 같은 민간 서비스는 수수료가 있지만, 원클릭은 <strong className="text-blue-600 dark:text-blue-400">수수료 0원</strong>!
                </p>
                <div className="p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    💡 원클릭 사용 팁
                  </p>
                  <p className="text-sm text-foreground/80">
                    미리 계산기로 예상 원천징수세와 실수령액을 확인한 후 원클릭으로 실제 환급금을 확인하면 더 확실해요!
                    원클릭은 클릭 한 번으로 1분 안에 환급 신청까지 완료할 수 있어요.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-800">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-yellow-800 dark:text-yellow-200">
                <span className="text-2xl">⚠️</span>
                <span>주의사항 (반드시 확인하세요!)</span>
              </h3>
              <div className="space-y-3 text-base leading-relaxed text-foreground/90">
                <p>
                  본 계산기는 <strong>참고용</strong>이며, 실제 원천징수세와는 차이가 있을 수 있습니다. 
                  정확한 원천징수세는 <strong className="text-blue-600 dark:text-blue-400">세무 전문가</strong>의 도움을 받으시기 바랍니다.
                </p>
                <p>
                  특히 <strong>부가세 포함/미포함</strong>을 정확히 구분해야 해요! 
                  계약서에 명시되어 있지 않다면 의뢰인에게 확인하세요. 
                  부가세 포함 계약인데 미포함으로 계산하면 원천징수세가 잘못 계산될 수 있어요!
                </p>
              </div>
            </section>
          </div>
        </div>
      </article>

    </div>
  );
}

