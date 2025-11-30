'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { matchGovernmentSupport, SupportMatchingInput, GovernmentSupport } from '@/lib/government-support';
import { AdModal } from '@/components/ads/AdModal';
import { AdSlot } from '@/components/ads/AdSlot';

const BUSINESS_TYPES = [
  'IT/소프트웨어',
  '디자인',
  '컨설팅',
  '교육/강사',
  '마케팅',
  '번역',
  '기타',
];

const BUSINESS_SCALES = [
  { code: 'micro', name: '영세업체 (5인 미만)' },
  { code: 'small', name: '소기업 (5-50인)' },
  { code: 'medium', name: '중기업 (50-300인)' },
];

const REGIONS = [
  '서울',
  '경기',
  '인천',
  '부산',
  '대구',
  '광주',
  '대전',
  '울산',
  '세종',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
];

export function GovernmentSupportMatcher() {
  const [input, setInput] = useState<SupportMatchingInput>({
    businessType: '',
    businessScale: 'micro',
    region: '',
  });

  const [results, setResults] = useState<GovernmentSupport[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);

  const handleSearch = useCallback(() => {
    const matched = matchGovernmentSupport(input);
    setResults(matched);
    setHasSearched(true);
  }, [input]);

  const handleReset = useCallback(() => {
    setInput({
      businessType: '',
      businessScale: 'micro',
      region: '',
    });
    setResults([]);
    setHasSearched(false);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold mb-4">
            💰 무료 정부지원금 매칭
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          정부지원금 매칭 도구
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;받을 수 있는 정부지원금이 궁금하신가요?&rdquo;</span>
          <br />
          업종과 규모를 입력하면 <strong className="text-green-600 dark:text-green-400">맞춤형 정부지원금</strong>을 추천해드립니다.
        </p>
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg max-w-xl mx-auto">
          <p className="text-sm text-foreground/80">
            ✅ <strong>100% 무료</strong> · ✅ <strong>실시간 업데이트</strong> · ✅ <strong>신청 링크 제공</strong>
          </p>
        </div>
      </header>

      <Card className="focus-card border-2 border-green-200 dark:border-green-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-white dark:from-green-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <span className="text-xl">🔍</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">지원금 검색</CardTitle>
          </div>
          <CardDescription className="text-base">
            업종과 규모를 입력하여 맞춤형 정부지원금을 찾아보세요.
          </CardDescription>
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
              onChange={(e) => setInput({ ...input, businessType: e.target.value })}
              className="w-full h-14 px-4 text-lg font-medium border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-background focus:border-green-500 focus:ring-2 focus:ring-green-500"
            >
              <option value="">업종 선택</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="businessScale" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">📊</span>
              <span>사업 규모</span>
            </Label>
            <select
              id="businessScale"
              value={input.businessScale}
              onChange={(e) => setInput({ ...input, businessScale: e.target.value as 'micro' | 'small' | 'medium' })}
              className="w-full h-14 px-4 text-lg font-medium border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-background focus:border-green-500 focus:ring-2 focus:ring-green-500"
            >
              {BUSINESS_SCALES.map((scale) => (
                <option key={scale.code} value={scale.code}>
                  {scale.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="region" className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">📍</span>
              <span>지역 (선택)</span>
            </Label>
            <select
              id="region"
              value={input.region}
              onChange={(e) => setInput({ ...input, region: e.target.value })}
              className="w-full h-14 px-4 text-lg font-medium border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-background focus:border-green-500 focus:ring-2 focus:ring-green-500"
            >
              <option value="">지역 선택</option>
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={handleSearch} 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all" 
              size="lg"
            >
              🔍 지원금 찾기
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

      {hasSearched && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">
            {results.length > 0 ? `총 ${results.length}개의 지원금을 찾았습니다` : '조건에 맞는 지원금이 없습니다'}
          </h2>
          
          {results.map((support) => (
            <Card key={support.id} className="focus-card border-2 border-green-200 dark:border-green-800">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl md:text-2xl mb-2">{support.name}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-semibold">
                        {support.category}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-semibold">
                        {support.amount}
                      </span>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base mt-2">
                  {support.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">신청 자격</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                    {support.eligibility.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">
                    <strong>신청 마감:</strong> {support.deadline}
                  </p>
                </div>
                <Button
                  onClick={() => window.open(support.link, '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  신청하기 →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {hasSearched && (
        <div className="my-8 flex justify-center">
          <AdSlot slotId="slot-b" format="auto" className="w-full" style={{ minHeight: '250px' }} />
        </div>
      )}

      <article className="prose prose-lg max-w-none dark:prose-invert mt-16">
        <div className="bg-gradient-to-r from-green-50 to-white dark:from-green-950/20 dark:to-gray-900 rounded-2xl p-8 md:p-10 border-2 border-green-200 dark:border-green-800">
          <h2 className="text-3xl font-bold mb-6">정부지원금 매칭 도구 사용 가이드</h2>
          <p className="text-lg leading-relaxed mb-8 text-foreground/80">
            정부지원금 매칭 도구는 업종, 규모, 지역을 기반으로 받을 수 있는 정부지원금을 자동으로 추천합니다.
          </p>
          
          <div className="space-y-8">
            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <span>지원금 종류</span>
              </h3>
              <div className="space-y-3 text-base leading-relaxed text-foreground/80">
                <p><strong className="text-green-600 dark:text-green-400">창업지원금</strong>: 신규 창업자를 위한 지원금</p>
                <p><strong className="text-green-600 dark:text-green-400">고용지원금</strong>: 신규 고용 창출 시 지원</p>
                <p><strong className="text-green-600 dark:text-green-400">디지털 전환 지원금</strong>: 중소기업 디지털화 지원</p>
                <p><strong className="text-green-600 dark:text-green-400">R&D 지원금</strong>: 연구개발 활동 지원</p>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <span>신청 절차</span>
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed text-foreground/80">
                <li>지원금 검색 및 자격 확인</li>
                <li>신청 서류 준비</li>
                <li>온라인 신청 또는 방문 신청</li>
                <li>심사 및 선정</li>
                <li>지원금 지급</li>
              </ol>
            </section>

            <div className="my-8 flex justify-center">
              <AdSlot slotId="slot-c" format="auto" className="w-full" style={{ minHeight: '250px' }} />
            </div>

            <section className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-800">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-yellow-800 dark:text-yellow-200">
                <span className="text-2xl">⚠️</span>
                <span>주의사항</span>
              </h3>
              <p className="text-base leading-relaxed text-foreground/90">
                본 도구는 참고용이며, 실제 지원금 정보는 각 기관 공식 사이트를 확인하시기 바랍니다. 
                지원금 정보는 수시로 변경될 수 있으므로 최신 정보를 확인하세요.
              </p>
            </section>
          </div>
        </div>
      </article>

      <AdModal isOpen={showAdModal} onClose={() => setShowAdModal(false)} slotId="slot-a" />
    </div>
  );
}

