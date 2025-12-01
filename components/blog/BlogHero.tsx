import { formatDate } from '@/lib/utils';
import { ViewCounter } from '@/components/growth-engine/ViewCounter';
import { ShareButtons } from './ShareButtons';

interface BlogHeroProps {
    title: string;
    date: string;
    category?: string;
    slug: string;
    url: string;
}

export function BlogHero({ title, date, category = 'Blog', slug, url }: BlogHeroProps) {
    return (
        <div className="relative py-12 md:py-20 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
                    {category}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-balance">
                    {title}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-4 text-foreground/60 text-sm md:text-base">
                    <time dateTime={date}>{formatDate(date)}</time>
                    <span>•</span>
                    <ViewCounter slug={slug} />
                    <span>•</span>
                    <span>5분 읽기</span> {/* 추후 실제 계산 로직 추가 가능 */}
                </div>
                <div className="mt-8 flex justify-center">
                    <ShareButtons title={title} url={url} />
                </div>
            </div>
        </div>
    );
}
