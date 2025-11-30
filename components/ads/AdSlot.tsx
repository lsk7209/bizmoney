'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/site.config';

interface AdSlotProps {
  slotId: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

export function AdSlot({ 
  slotId, 
  format = 'auto',
  style,
  className = '',
  responsive = true 
}: AdSlotProps) {
  useEffect(() => {
    if (!siteConfig.adsense.enabled || !siteConfig.adsense.clientId) {
      return;
    }

    try {
      // @ts-ignore - adsbygoogle is loaded by GoogleAdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      // 개발 환경에서만 에러 로그 출력
      if (process.env.NODE_ENV === 'development') {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  if (!siteConfig.adsense.enabled || !siteConfig.adsense.clientId) {
    // 개발 환경에서는 플레이스홀더 표시
    return (
      <div 
        className={`bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center ${className}`}
        style={{ minHeight: '100px', ...style }}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400">
          광고 슬롯 ({slotId})
        </span>
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{
        display: 'block',
        ...style,
      }}
      data-ad-client={siteConfig.adsense.clientId}
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
}

