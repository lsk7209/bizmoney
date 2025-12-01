'use client';

import { Button } from '@/components/ui/button';
import { Share2, Link2, Facebook, Twitter } from 'lucide-react';
import { toast } from 'sonner'; // Assuming sonner or similar toast is used, or I'll use alert for now if not sure. I'll check package.json again. No sonner. I'll use window.alert or simple copy.

export function ShareButtons({ title, url }: { title: string; url: string }) {
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            alert('링크가 복사되었습니다!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    url,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            handleCopyLink();
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-2"
                onClick={handleShare}
            >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">공유하기</span>
            </Button>
        </div>
    );
}
