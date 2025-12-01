'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Heading {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('article h2, article h3'))
            .map((element) => ({
                id: element.id,
                text: element.textContent || '',
                level: Number(element.tagName.substring(1)),
            }));
        setHeadings(elements);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        elements.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto">
            <h4 className="text-sm font-semibold mb-4 text-foreground/90">목차</h4>
            <ul className="space-y-2 text-sm">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                'block transition-colors hover:text-blue-600 dark:hover:text-blue-400',
                                activeId === heading.id
                                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                                    : 'text-foreground/60'
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: 'smooth',
                                });
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
