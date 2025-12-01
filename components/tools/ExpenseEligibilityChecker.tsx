'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EXPENSE_CATEGORIES, getExpenseByCategory, ExpenseItem } from '@/lib/expense-eligibility-checker';

const CATEGORIES = ['전체', '사무실', '통신비', '교통비', '장비', '소모품', '교육비', '식대', '의류', '오락'];

export function ExpenseEligibilityChecker() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedItem, setSelectedItem] = useState<ExpenseItem | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === '전체') {
      return EXPENSE_CATEGORIES;
    }
    return getExpenseByCategory(selectedCategory);
  }, [selectedCategory]);

  const eligibleCount = useMemo(() => filteredItems.filter(item => item.eligible).length, [filteredItems]);
  const ineligibleCount = useMemo(() => filteredItems.filter(item => !item.eligible).length, [filteredItems]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-8">
      <header className="text-center mb-10">
        <div className="mb-4">
          <span className="inline-block px-5 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-base font-semibold mb-4">
            ✅ 경비 인정 가능 여부 체크리스트
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          경비 인정 가능 여부 체크리스트
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          <span className="empathy-text">&ldquo;이 지출은 경비로 인정될까?&rdquo;</span>
          <br />
          업무 관련 지출의 <strong>경비 인정 여부</strong>를 확인하고,<br />
          <strong className="text-green-600 dark:text-green-400">절세 팁</strong>까지 알아보세요!
        </p>
        <div className="mt-6 p-5 bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-300 dark:border-blue-700 rounded-xl max-w-xl mx-auto shadow-sm">
          <p className="text-base font-medium text-foreground/90">
            ✅ <strong>2025년 최신 세법 반영</strong> · ✅ <strong>실용적인 팁 제공</strong> · ✅ <strong>증빙 요건 안내</strong>
          </p>
        </div>
      </header>

      <Card className="focus-card border-2 border-blue-200 dark:border-blue-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-xl">📋</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">카테고리 선택</CardTitle>
          </div>
          <CardDescription className="text-base">
            확인하고 싶은 경비 카테고리를 선택하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedItem(null);
                }}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={selectedCategory === category ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid gap-4">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  item.eligible
                    ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20'
                    : 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20'
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-2xl ${item.eligible ? 'text-green-600' : 'text-red-600'}`}>
                          {item.eligible ? '✅' : '❌'}
                        </span>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/70">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-foreground/70">인정 가능</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{eligibleCount}개</div>
              </div>
              <div>
                <div className="text-sm text-foreground/70">인정 불가</div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{ineligibleCount}개</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedItem && (
        <Card className="border-2 border-blue-300 dark:border-blue-700 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40">
            <div className="flex items-center gap-3">
              <span className={`text-3xl ${selectedItem.eligible ? 'text-green-600' : 'text-red-600'}`}>
                {selectedItem.eligible ? '✅' : '❌'}
              </span>
              <div>
                <CardTitle className="text-2xl">{selectedItem.name}</CardTitle>
                <CardDescription className="text-base mt-1">{selectedItem.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className={`p-6 rounded-xl border-2 ${
              selectedItem.eligible
                ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
            }`}>
              <h3 className="text-xl font-bold mb-4">
                {selectedItem.eligible ? '✅ 경비 인정 가능' : '❌ 경비 인정 불가'}
              </h3>
              {selectedItem.conditions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold mb-2">인정 조건:</h4>
                  <ul className="space-y-1">
                    {selectedItem.conditions.map((condition, index) => (
                      <li key={index} className="text-sm text-foreground/80 flex items-start gap-2">
                        <span>•</span>
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {selectedItem.tips.length > 0 && (
              <div className="p-6 bg-yellow-50 dark:bg-yellow-950/30 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  <span>절세 팁</span>
                </h3>
                <ul className="space-y-2">
                  {selectedItem.tips.map((tip, index) => (
                    <li key={index} className="text-base text-foreground/80 flex items-start gap-2">
                      <span>✅</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border-2 border-green-200 dark:border-green-800">
              <p className="text-center font-semibold text-base mb-4 text-foreground">
                🎉 친구들도 경비 인정 여부를 확인해보라고 공유해보세요!
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        `${selectedItem.name} 경비 인정 여부를 확인했어요! ${selectedItem.eligible ? '✅ 인정 가능' : '❌ 인정 불가'} 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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
                      `${selectedItem.name} 경비 인정 여부를 확인했어요! ${selectedItem.eligible ? '✅ 인정 가능' : '❌ 인정 불가'} 💰\n\n${typeof window !== 'undefined' ? window.location.href : ''}`
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
          </CardContent>
        </Card>
      )}

      <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-950/50 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl shadow-md">
        <p className="text-sm text-foreground/80 leading-relaxed">
          <strong className="font-semibold">⚠️ 면책 조항:</strong> 본 체크리스트는 참고용이며, 실제 경비 인정 여부는 세무서 심사에 따라 달라질 수 있습니다.
          정확한 경비 인정 여부는 세무 전문가의 도움을 받으시기 바랍니다.
        </p>
      </div>
    </div>
  );
}

