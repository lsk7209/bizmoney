'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdModal } from '@/components/ads/AdModal';
import { AdSlot } from '@/components/ads/AdSlot';

interface ChecklistItem {
  id: string;
  label: string;
  category: 'required' | 'optional' | 'important';
  description?: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // 필수 서류
  {
    id: 'income-cert',
    label: '소득금액 증명원류',
    category: 'required',
    description: '의뢰인별로 발급받은 소득금액 증명원류',
  },
  {
    id: 'withholding-receipt',
    label: '원천징수 영수증',
    category: 'required',
    description: '원천징수된 세액 확인용',
  },
  {
    id: 'business-license',
    label: '사업자등록증',
    category: 'required',
    description: '사업자 등록한 경우',
  },
  // 경비 증빙 (장부기장 사용 시)
  {
    id: 'office-rent',
    label: '사무실 임대료 영수증',
    category: 'optional',
    description: '장부기장 사용 시 필요',
  },
  {
    id: 'communication',
    label: '통신비 영수증',
    category: 'optional',
    description: '인터넷, 전화 요금',
  },
  {
    id: 'transportation',
    label: '교통비 영수증',
    category: 'optional',
    description: '업무용 교통비',
  },
  {
    id: 'supplies',
    label: '소모품 구매 영수증',
    category: 'optional',
    description: '업무용 소모품',
  },
  {
    id: 'education',
    label: '교육비 영수증',
    category: 'optional',
    description: '업무 관련 교육',
  },
  // 공제 증빙
  {
    id: 'medical',
    label: '의료비 영수증',
    category: 'important',
    description: '의료비 공제용',
  },
  {
    id: 'education-expense',
    label: '교육비 영수증 (공제용)',
    category: 'important',
    description: '자녀 교육비 공제',
  },
  {
    id: 'donation',
    label: '기부금 영수증',
    category: 'important',
    description: '기부금 공제용',
  },
  {
    id: 'insurance',
    label: '보험료 납입 증명서',
    category: 'important',
    description: '보험료 공제용',
  },
  {
    id: 'retirement',
    label: '퇴직연금 납입 증명서',
    category: 'important',
    description: '세액공제용',
  },
  // 정보 확인
  {
    id: 'annual-revenue',
    label: '연 매출 총액 확인',
    category: 'required',
  },
  {
    id: 'withholding-amount',
    label: '원천징수세액 확인',
    category: 'required',
  },
  {
    id: 'dependents',
    label: '부양가족 수 확인',
    category: 'required',
  },
  {
    id: 'deductions',
    label: '공제 항목 확인',
    category: 'required',
  },
  // 신고 전 확인
  {
    id: 'info-check',
    label: '입력 정보 정확성 확인',
    category: 'required',
  },
  {
    id: 'calculation-check',
    label: '계산 결과 확인',
    category: 'required',
  },
  {
    id: 'deduction-check',
    label: '공제 항목 누락 확인',
    category: 'required',
  },
  {
    id: 'error-check',
    label: '오류 메시지 확인',
    category: 'required',
  },
];

export function TaxFilingChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [showAdModal, setShowAdModal] = useState(false);

  const handleToggle = useCallback((id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setCheckedItems(new Set());
  }, []);

  const handleDownload = useCallback(() => {
    const checked = CHECKLIST_ITEMS.filter((item) => checkedItems.has(item.id));
    const unchecked = CHECKLIST_ITEMS.filter((item) => !checkedItems.has(item.id));
    
    const content = `# 세금 신고 체크리스트

생성일: ${new Date().toLocaleDateString('ko-KR')}

## ✅ 완료 항목 (${checked.length}개)

${checked.map((item) => `- [x] ${item.label}${item.description ? ` - ${item.description}` : ''}`).join('\n')}

## ⬜ 미완료 항목 (${unchecked.length}개)

${unchecked.map((item) => `- [ ] ${item.label}${item.description ? ` - ${item.description}` : ''}`).join('\n')}

---
본 체크리스트는 Biz-Wallet에서 생성되었습니다.
https://biz-wallet.com/tax-checklist
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `세금신고체크리스트-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [checkedItems]);

  const requiredItems = CHECKLIST_ITEMS.filter((item) => item.category === 'required');
  const optionalItems = CHECKLIST_ITEMS.filter((item) => item.category === 'optional');
  const importantItems = CHECKLIST_ITEMS.filter((item) => item.category === 'important');

  const requiredChecked = requiredItems.filter((item) => checkedItems.has(item.id)).length;
  const totalChecked = checkedItems.size;
  const totalItems = CHECKLIST_ITEMS.length;
  const progress = Math.round((totalChecked / totalItems) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
            📋 무료 세금 신고 체크리스트
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          세금 신고 체크리스트
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;세금 신고 전 무엇을 준비해야 할까요?&rdquo;</span>
          <br />
          필수 서류부터 공제 증빙까지, <strong className="text-green-600 dark:text-green-400">체계적으로 준비</strong>하세요.
        </p>
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg max-w-xl mx-auto">
          <p className="text-sm text-foreground/80">
            ✅ <strong>100% 무료</strong> · ✅ <strong>PDF 다운로드</strong> · ✅ <strong>인쇄 가능</strong>
          </p>
        </div>
      </header>

      {/* 진행률 표시 */}
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">준비 진행률</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">전체 진행률</span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-foreground/60">필수 항목: </span>
                <span className="font-semibold">
                  {requiredChecked} / {requiredItems.length}
                </span>
              </div>
              <div>
                <span className="text-foreground/60">전체 항목: </span>
                <span className="font-semibold">
                  {totalChecked} / {totalItems}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 체크리스트 */}
      <div className="space-y-6">
        {/* 필수 항목 */}
        <Card className="border-2 border-red-200 dark:border-red-800">
          <CardHeader className="bg-red-50 dark:bg-red-950/20">
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
              <span className="text-red-600 dark:text-red-400">⚠️</span>
              <span>필수 항목 ({requiredItems.length}개)</span>
            </CardTitle>
            <CardDescription>
              반드시 준비해야 하는 항목입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {requiredItems.map((item) => (
              <label
                key={item.id}
                className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => handleToggle(item.id)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  {item.description && (
                    <div className="text-sm text-foreground/60 mt-1">{item.description}</div>
                  )}
                </div>
              </label>
            ))}
          </CardContent>
        </Card>

        {/* 중요 항목 */}
        <Card className="border-2 border-yellow-200 dark:border-yellow-800">
          <CardHeader className="bg-yellow-50 dark:bg-yellow-950/20">
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
              <span className="text-yellow-600 dark:text-yellow-400">💡</span>
              <span>중요 항목 ({importantItems.length}개)</span>
            </CardTitle>
            <CardDescription>
              세금 절감을 위해 준비하면 좋은 항목입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {importantItems.map((item) => (
              <label
                key={item.id}
                className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => handleToggle(item.id)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  {item.description && (
                    <div className="text-sm text-foreground/60 mt-1">{item.description}</div>
                  )}
                </div>
              </label>
            ))}
          </CardContent>
        </Card>

        {/* 선택 항목 */}
        <Card className="border-2 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
              <span>📝</span>
              <span>선택 항목 ({optionalItems.length}개)</span>
            </CardTitle>
            <CardDescription>
              장부기장을 사용하는 경우 필요한 항목입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {optionalItems.map((item) => (
              <label
                key={item.id}
                className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => handleToggle(item.id)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  {item.description && (
                    <div className="text-sm text-foreground/60 mt-1">{item.description}</div>
                  )}
                </div>
              </label>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 액션 버튼 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleDownload}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          📥 체크리스트 다운로드 (PDF)
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

      {/* Slot B */}
      <div className="my-8 flex justify-center">
        <AdSlot slotId="slot-b" format="auto" className="w-full" style={{ minHeight: '250px' }} />
      </div>

      {/* SEO 콘텐츠 */}
      <article className="prose prose-lg max-w-none dark:prose-invert mt-16">
        <div className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 rounded-2xl p-8 md:p-10 border-2 border-blue-200 dark:border-blue-800">
          <h2 className="text-3xl font-bold mb-6">세금 신고 체크리스트 사용 가이드</h2>
          <p className="text-lg leading-relaxed mb-8 text-foreground/80">
            세금 신고 전 준비사항을 체계적으로 관리하세요. 필수 항목부터 선택 항목까지 모두 확인하여 실수를 방지하세요.
          </p>
          
          <div className="space-y-8">
            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <span>체크리스트 활용법</span>
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed text-foreground/80">
                <li>신고 전 체크리스트를 다운로드하세요</li>
                <li>각 항목을 확인하며 체크하세요</li>
                <li>필수 항목은 반드시 준비하세요</li>
                <li>중요 항목은 세금 절감을 위해 준비하세요</li>
                <li>선택 항목은 장부기장 사용 시 준비하세요</li>
              </ol>
            </section>

            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <span>서류 준비 팁</span>
              </h3>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed text-foreground/80">
                <li>영수증은 분기별로 정리하여 보관하세요</li>
                <li>디지털로 스캔하여 보관하면 관리가 편리합니다</li>
                <li>신고 후 5년간 보관하세요 (세무 조사 대비)</li>
              </ul>
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
                본 체크리스트는 참고용입니다. 실제 신고 시 필요한 서류는 상황에 따라 다를 수 있습니다. 
                복잡한 경우 <strong>세무 전문가</strong>의 도움을 받으시기 바랍니다.
              </p>
            </section>
          </div>
        </div>
      </article>

      <AdModal isOpen={showAdModal} onClose={() => setShowAdModal(false)} slotId="slot-a" />
    </div>
  );
}

