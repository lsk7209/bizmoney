import Image from 'next/image';
import { ComponentProps } from 'react';

interface OptimizedImageProps extends Omit<ComponentProps<'img'>, 'src'> {
  src?: string;
  alt?: string;
  title?: string;
}

/**
 * SEO 최적화된 이미지 컴포넌트
 * - alt 속성이 없으면 자동으로 생성
 * - Next.js Image 최적화 사용
 */
export function OptimizedImage({ src, alt, title, ...props }: OptimizedImageProps) {
  // src가 없으면 일반 img 태그로 fallback
  if (!src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt || '이미지'} {...props} />;
  }

  // alt가 없으면 title이나 src에서 자동 생성
  const autoAlt = alt || title || extractAltFromSrc(src);

  // 외부 URL인지 확인
  const isExternal = src.startsWith('http://') || src.startsWith('https://');

  if (isExternal) {
    // 외부 이미지는 일반 img 태그 사용 (Next.js Image는 도메인 허용 필요)
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={autoAlt}
        title={title}
        loading="lazy"
        {...props}
      />
    );
  }

  // 내부 이미지는 Next.js Image 사용
  return (
    <Image
      src={src}
      alt={autoAlt}
      title={title}
      width={props.width ? Number(props.width) : 800}
      height={props.height ? Number(props.height) : 600}
      loading="lazy"
      {...(props as any)}
    />
  );
}

/**
 * src 경로에서 alt 텍스트 추출
 */
function extractAltFromSrc(src: string): string {
  // 파일명에서 확장자 제거하고 공백으로 변환
  const filename = src.split('/').pop() || '';
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  // 하이픈, 언더스코어를 공백으로 변환
  const altText = nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  return altText || '이미지';
}

