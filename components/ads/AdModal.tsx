'use client';

import { useEffect, useState } from 'react';
import { AdSlot } from './AdSlot';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  slotId: string;
}

export function AdModal({ isOpen, onClose, slotId }: AdModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ad-modal-title"
      onKeyDown={(e) => {
        // ESC 키로 모달 닫기
        if (e.key === 'Escape') {
          onClose();
        }
      }}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 max-w-md w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="ad-modal-title" className="text-lg font-semibold">
            광고
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="광고 모달 닫기"
            autoFocus
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="min-h-[250px]">
          <AdSlot slotId={slotId} format="auto" />
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" onClick={onClose} size="sm">
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}

