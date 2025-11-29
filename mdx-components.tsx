import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';
import { Callout } from '@/components/growth-engine/ui-blocks/Callout';
import { ProsCons } from '@/components/growth-engine/ui-blocks/ProsCons';
import { OptimizedImage } from '@/components/growth-engine/ui-blocks/OptimizedImage';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '@/components/growth-engine/ui-blocks/Table';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    ProsCons,
    Table,
    thead: (props: ComponentProps<'thead'>) => <TableHead {...props} />,
    tbody: (props: ComponentProps<'tbody'>) => <TableBody {...props} />,
    tr: (props: ComponentProps<'tr'>) => <TableRow {...props} />,
    th: (props: ComponentProps<'th'>) => <TableHeader {...props} />,
    td: (props: ComponentProps<'td'>) => <TableCell {...props} />,
    // SEO 최적화: 이미지에 자동으로 alt 텍스트 추가
    img: (props: ComponentProps<'img'>) => <OptimizedImage {...props} />,
    ...components,
  };
}


