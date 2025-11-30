import { Metadata } from 'next';
import { QuizProvider } from '@/components/quiz/QuizProvider';
import { QuizContent } from '@/components/quiz/QuizContent';
import { QuizStructuredData } from '@/components/quiz/QuizStructuredData';

import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '세금 방어력 테스트 | 프리랜서 세금 지식 퀴즈 - Biz-Wallet',
  description: '세금 방어력 테스트로 프리랜서와 소상공인 세금 지식을 확인하세요. 5문항 퀴즈로 나의 세금 방어력 레벨을 측정합니다.',
  keywords: ['세금 테스트', '프리랜서 세금', '소상공인 세금', '세금 지식', '세금 방어력', '세금 퀴즈'],
  alternates: {
    canonical: `${siteConfig.url}/quiz`,
  },
  openGraph: {
    title: '세금 방어력 테스트 | 프리랜서 세금 지식 퀴즈 - Biz-Wallet',
    description: '세금 방어력 테스트로 프리랜서와 소상공인 세금 지식을 확인하세요. 5문항 퀴즈로 나의 세금 방어력 레벨을 측정합니다.',
    type: 'website',
    url: `${siteConfig.url}/quiz`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '세금 방어력 테스트 | 프리랜서 세금 지식 퀴즈',
    description: '세금 방어력 테스트로 프리랜서와 소상공인 세금 지식을 확인하세요.',
  },
};

export default function QuizPage() {
  return (
    <>
      <QuizStructuredData />
      <div className="min-h-screen py-8">
        <QuizProvider>
          <QuizContent />
        </QuizProvider>
      </div>
    </>
  );
}

