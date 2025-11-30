'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculateVAT, formatCurrency, VATCalculatorInput } from '@/lib/vat-logic';

const SUPPLY_TYPES = [
  { code: 'taxable', name: '과세' },
  { code: 'exempt', name: '면세' },
  { code: 'zero', name: '영세율' },
] as const;

export function VATCalculator() {
  const [input, setInput] = useState<VATCalculatorInput>({
    supplyType: 'taxable',
    totalAmount: 0,
    inputVAT: 0,
  });

  const [result, setResult] = useState<ReturnType<typeof calculateVAT> | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const totalAmountInputRef = useRef<HTMLInputElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);


  const handleCalculate = useCallback(() => {
    try {
      if (input.totalAmount <= 0) {
        alert('합계금액을 입력해주세요.');
        if (totalAmountInputRef.current) {
          totalAmountInputRef.current.focus();
        }
        return;
      }

      const calculated = calculateVAT(input);
      setResult(calculated);
      setHasCalculated(true);

      // 결과 섹션으로 스크롤
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
      supplyType: 'taxable',
      totalAmount: 0,
      inputVAT: 0,
    });
    setResult(null);
    setHasCalculated(false);
    if (totalAmountInputRef.current) {
      totalAmountInputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      {/* 페이지 제목 */}
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
            💰 무료 부가가치세 계산기
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          부가가치세 계산기
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;부가세 계산이 복잡하신가요?&rdquo;</span>
          <br />
          과세/면세/영세율을 구분하여 <strong>공급가액과 부가세</strong>를 계산하고,<br />
          <strong className="text-green-600 dark:text-green-400">환급금</strong>까지 확인하세요.
        </p>
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg max-w-xl mx-auto">
          <p className="text-sm text-foreground/80">
            ✅ <strong>100% 무료</strong> · ✅ <strong>개인정보 보호</strong> · ✅ <strong>즉시 결과 확인</strong>
          </p>
        </div>
      </header>

      {/* 입력 섹션 */}
      <Card className="focus-card border-2 border-blue-200 dark:border-blue-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">계산기 입력</CardTitle>
          </div>
          <CardDescription className="text-base">
            부가가치세 계산을 위한 정보를 입력하세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="supplyType" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">🏷️</span>
              <span>공급 유형</span>
            </Label>
            <select
              id="supplyType"
              value={input.supplyType}
              onChange={(e) => setInput({ ...input, supplyType: e.target.value as 'taxable' | 'exempt' | 'zero' })}
              className="w-full h-14 px-4 text-lg font-medium border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-background focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              aria-label="공급 유형 선택"
            >
              {SUPPLY_TYPES.map((type) => (
                <option key={type.code} value={type.code}>
                  {type.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-foreground/60 leading-relaxed">
              💡 <strong>과세</strong>: 일반적인 거래 (부가세 10% 적용)<br />
              💡 <strong>면세</strong>: 부가세가 면제되는 거래<br />
              💡 <strong>영세율</strong>: 부가세 0%이지만 매입세액 공제 가능
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="totalAmount" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">💵</span>
              <span>합계금액</span>
              <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                ref={totalAmountInputRef}
                id="totalAmount"
                type="number"
                min="0"
                step="1000"
                value={input.totalAmount === 0 ? '' : input.totalAmount}
                onChange={(e) => {
                  const value = Number(e.target.value) || 0;
                  setInput({ ...input, totalAmount: Math.max(0, value) });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCalculate();
                  }
                }}
                placeholder="예: 110000"
                className="h-14 text-lg font-medium border-2 border-gray-300 dark:border-gray-700 rounded-xl px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                aria-required="true"
              />
            </div>
            <p id="totalAmount-help" className="text-sm text-foreground/60 leading-relaxed">
              💡 부가세 포함 금액을 입력하세요 (예: 110,000원 = 공급가액 100,000원 + 부가세 10,000원)
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="inputVAT" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">📥</span>
              <span>매입세액 (선택)</span>
            </Label>
            <div className="relative">
              <Input
                id="inputVAT"
                type="number"
                min="0"
                step="1000"
                value={input.inputVAT === 0 ? '' : input.inputVAT}
                onChange={(e) => {
                  const value = Number(e.target.value) || 0;
                  setInput({ ...input, inputVAT: Math.max(0, value) });
                }}
                placeholder="예: 50000"
                className="h-14 text-lg font-medium border-2 border-gray-300 dark:border-gray-700 rounded-xl px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p id="inputVAT-help" className="text-sm text-foreground/60 leading-relaxed">
              💡 매입세액을 입력하면 환급금(또는 납부액)을 계산할 수 있습니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={handleCalculate} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all" 
              size="lg"
              aria-label="부가가치세 계산하기"
            >
              💰 부가세 계산하기
            </Button>
            <Button 
              onClick={handleReset} 
              variant="outline" 
              size="lg"
              className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
              aria-label="입력값 초기화"
            >
              🔄 초기화
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 결과 섹션 */}
      {result && hasCalculated && (
        <Card 
          ref={resultSectionRef}
          data-result-section
          className="border-2 border-green-300 dark:border-green-700 bg-gradient-to-br from-green-50 to-white dark:from-green-950/40 dark:to-gray-900 shadow-xl"
          role="region"
          aria-labelledby="result-title"
        >
          <CardHeader className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-950/20 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <CardTitle id="result-title" className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400">
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
            {result.inputVAT !== undefined && result.inputVAT > 0 && (
              <div className={`p-8 rounded-2xl border-4 shadow-2xl text-center ${
                (result.refundAmount || 0) > 0
                  ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-green-950/40 dark:via-emerald-950/40 dark:to-green-900/20 border-green-400 dark:border-green-600'
                  : 'bg-gradient-to-br from-red-50 via-orange-50 to-red-100 dark:from-red-950/40 dark:via-orange-950/40 dark:to-red-900/20 border-red-400 dark:border-red-600'
              }`}>
                <div className="mb-4">
                  <span className="text-5xl">{(result.refundAmount || 0) > 0 ? '🎉' : '⚠️'}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
                  {(result.refundAmount || 0) > 0 ? '환급받을 수 있는 금액은?' : '납부해야 할 금액은?'}
                </h3>
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${
                  (result.refundAmount || 0) > 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {formatCurrency(Math.abs(result.refundAmount || 0))}
                </div>
                <p className="text-base text-foreground/70 mt-3">
                  {(result.refundAmount || 0) > 0 
                    ? '💡 매입세액이 매출세액보다 많아서 환급받을 수 있어요!' 
                    : '💡 매출세액에서 매입세액을 차감한 금액입니다.'}
                </p>
              </div>
            )}

            {/* 상세 내역 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📊</span>
                  <div className="text-base font-semibold text-muted-foreground">공급가액</div>
                </div>
                <div className="text-xl font-bold text-foreground">
                  {formatCurrency(result.supplyAmount)}
                </div>
                <p className="text-xs text-foreground/60 mt-2">부가세 제외 금액</p>
              </div>

              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💵</span>
                  <div className="text-base font-semibold text-muted-foreground">부가세액</div>
                </div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(result.vatAmount)}
                </div>
                <p className="text-xs text-foreground/60 mt-2">공급가액의 10%</p>
              </div>

              <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📋</span>
                  <div className="text-base font-semibold text-muted-foreground">합계금액</div>
                </div>
                <div className="text-xl font-bold text-foreground">
                  {formatCurrency(result.totalAmount)}
                </div>
                <p className="text-xs text-foreground/60 mt-2">공급가액 + 부가세액</p>
              </div>

              {result.inputVAT !== undefined && result.inputVAT > 0 && (
                <>
                  <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">📥</span>
                      <div className="text-base font-semibold text-muted-foreground">매입세액</div>
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      {formatCurrency(result.inputVAT)}
                    </div>
                    <p className="text-xs text-foreground/60 mt-2">매입 시 납부한 부가세</p>
                  </div>

                  <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">📤</span>
                      <div className="text-base font-semibold text-muted-foreground">매출세액</div>
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      {formatCurrency(result.outputVAT || 0)}
                    </div>
                    <p className="text-xs text-foreground/60 mt-2">매출 시 징수한 부가세</p>
                  </div>
                </>
              )}
            </div>

            {/* 절세 팁 섹션 */}
            {result.inputVAT !== undefined && result.inputVAT > 0 && (
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  <span>부가가치세 절세 팁</span>
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-purple-200 dark:border-purple-800">
                    <p className="text-base font-semibold text-foreground mb-2">
                      ✅ 세금계산서, 현금영수증, 신용카드 매출전표 잘 챙기기
                    </p>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      매입세액 공제를 받으려면 적격증빙이 필수예요! 사업 관련 지출은 반드시 증빙을 챙기세요.
                    </p>
                  </div>
                  <div className="p-4 bg-white/80 dark:bg-gray-900/80 rounded-lg border border-purple-200 dark:border-purple-800">
                    <p className="text-base font-semibold text-foreground mb-2">
                      ✅ 초기 비용이 많다면 일반과세 고려
                    </p>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      간이과세는 편리하지만 매입세액 공제를 못 받아요. 초기 비용이 많다면 일반과세가 더 유리할 수 있어요!
                    </p>
                  </div>
                </div>
              </div>
            )}

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
                        `부가가치세 계산기로 내 예상 ${(result.refundAmount || 0) > 0 ? '환급금' : '납부액'}을 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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
                      `부가가치세 계산기로 내 예상 ${(result.refundAmount || 0) > 0 ? '환급금' : '납부액'}을 확인했어요! 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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
                <strong>면책 조항:</strong> 본 계산 결과는 모의 계산이며 법적 효력이 없습니다. 정확한 부가가치세는 홈택스에서 직접 계산하거나 세무 전문가의 도움을 받으시기 바랍니다.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Slot B: 계산 결과값 바로 하단 */}

      {/* SEO 콘텐츠 래퍼 */}
      <article className="prose prose-lg max-w-none dark:prose-invert mt-16">
        <div className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 rounded-2xl p-8 md:p-10 border-2 border-blue-200 dark:border-blue-800">
          <h2 className="text-3xl font-bold mb-6 text-foreground">부가가치세 계산기 사용 가이드</h2>
          <p className="text-lg leading-relaxed mb-8 text-foreground/80">
            부가가치세(VAT)는 재화나 용역을 공급할 때 부과되는 세금입니다. 본 계산기는 과세/면세/영세율을 구분하여 정확한 부가세를 계산합니다.
          </p>
          
          <div className="space-y-8">
            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <span>과세/면세/영세율 구분</span>
              </h3>
              <div className="space-y-3 text-base leading-relaxed text-foreground/80">
                <p><strong className="text-blue-600 dark:text-blue-400">과세</strong>: 일반적인 거래로 부가세 10%가 적용됩니다. 대부분의 상품과 서비스가 여기에 해당합니다.</p>
                <p><strong className="text-blue-600 dark:text-blue-400">면세</strong>: 부가세가 면제되는 거래입니다. 의료비, 교육비, 도서 등이 해당됩니다.</p>
                <p><strong className="text-blue-600 dark:text-blue-400">영세율</strong>: 부가세는 0%이지만 매입세액 공제가 가능합니다. 수출 거래 등이 해당됩니다.</p>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <span>환급금 계산</span>
              </h3>
              <p className="text-base leading-relaxed text-foreground/80">
                매입세액이 매출세액보다 많으면 <strong className="text-green-600 dark:text-green-400">환급금</strong>을 받을 수 있습니다. 
                반대로 매출세액이 더 많으면 <strong className="text-red-600 dark:text-red-400">납부액</strong>이 발생합니다.
              </p>
            </section>


            <section className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-800">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-yellow-800 dark:text-yellow-200">
                <span className="text-2xl">⚠️</span>
                <span>주의사항</span>
              </h3>
              <p className="text-base leading-relaxed text-foreground/90">
                본 계산기는 참고용이며, 실제 부가가치세와는 차이가 있을 수 있습니다. 
                정확한 부가가치세는 <strong>홈택스</strong>에서 직접 계산하거나 <strong>세무 전문가</strong>의 도움을 받으시기 바랍니다.
              </p>
            </section>
          </div>
        </div>
      </article>

    </div>
  );
}

