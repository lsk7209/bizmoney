import { TaxFilingChecklist } from '@/components/tools/TaxFilingChecklist';
import { TaxChecklistStructuredData } from '@/components/tools/TaxChecklistStructuredData';
import { Metadata } from 'next';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: '세금 신고 체크리스트 | 신고 전 확인사항 - Biz-Wallet',
  description: '세금 신고 체크리스트로 신고 전 준비사항을 체계적으로 관리하세요. 필수 서류부터 공제 증빙까지 모든 항목을 확인하세요. PDF 다운로드 가능.',
  keywords: ['세금 신고 체크리스트', '세금 신고 준비물', '신고 전 확인사항', '세금 신고 서류'],
  alternates: {
    canonical: `${siteConfig.url}/tax-checklist`,
  },
  openGraph: {
    title: '세금 신고 체크리스트 | 신고 전 확인사항 - Biz-Wallet',
    description: '세금 신고 체크리스트로 신고 전 준비사항을 체계적으로 관리하세요.',
    type: 'website',
    url: `${siteConfig.url}/tax-checklist`,
  },
  twitter: {
    card: 'summary_large_image',
    title: '세금 신고 체크리스트 | 신고 전 확인사항',
    description: '세금 신고 체크리스트로 준비사항을 확인하세요.',
  },
};

export default function TaxChecklistPage() {
  return (
    <>
      <TaxChecklistStructuredData />
      <div className="min-h-screen py-8">
        <TaxFilingChecklist />
      </div>
    </>
  );
}

