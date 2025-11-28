# Vercel 배포 가이드

이 문서는 Growth Engine Starter Kit을 Vercel에 배포하는 상세 가이드입니다.

## 1. 사전 준비

### 1.1 GitHub 저장소 준비
- GitHub에 프로젝트가 푸시되어 있어야 합니다
- 저장소는 Public 또는 Private 모두 가능합니다

### 1.2 Vercel 계정 생성
- [Vercel](https://vercel.com)에 로그인
- GitHub 계정 연동

## 2. 프로젝트 배포

### 2.1 새 프로젝트 생성
1. Vercel 대시보드에서 "Add New Project" 클릭
2. GitHub 저장소 선택 (`lsk7209/starter_kit_v1`)
3. 프로젝트 설정 확인:
   - **Framework Preset**: Next.js (자동 감지)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `.next` (기본값)
   - **Install Command**: `npm install` (기본값)

### 2.2 환경 변수 설정

Vercel 대시보드 > Project Settings > Environment Variables에서 다음 변수를 설정하세요:

#### 필수 환경 변수

| 변수명 | 설명 | 예시 | 자동 감지 |
|--------|------|------|----------|
| `GEMINI_API_KEY` | Google Gemini API 키 | `AIza...` | ❌ |
| `TURSO_DATABASE_URL` | Turso 데이터베이스 URL | `libsql://...` | ❌ |
| `TURSO_AUTH_TOKEN` | Turso 인증 토큰 | `eyJ...` | ❌ |
| `NEXT_PUBLIC_SITE_URL` | 사이트 URL | `https://your-domain.vercel.app` | ✅ VERCEL_URL 사용 |

**참고**: `NEXT_PUBLIC_SITE_URL`이 설정되지 않으면 Vercel이 자동으로 제공하는 `VERCEL_URL`을 사용합니다.

#### 선택적 환경 변수

| 변수명 | 설명 | 필수 여부 |
|--------|------|----------|
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | AdSense 클라이언트 ID | ⚠️ 광고 사용 시 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console 인증 | ⚠️ SEO 최적화 |
| `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` | Naver Search Advisor 인증 | ⚠️ 한국 SEO |
| `CRON_SECRET` | Cron API 보안 키 | ⚠️ Cron 사용 시 |

**중요**: `NEXT_PUBLIC_*` 접두사가 있는 변수는 클라이언트에서 접근 가능합니다.

### 2.3 배포 실행
1. "Deploy" 버튼 클릭
2. 빌드 로그 확인
3. 배포 완료 대기 (약 2-3분)

## 3. 배포 후 설정

### 3.1 도메인 설정 (선택)
1. Project Settings > Domains
2. Custom Domain 추가
3. DNS 설정 안내에 따라 도메인 연결

### 3.2 Cron Job 설정

#### Vercel Pro 플랜 이상
- `vercel.json`의 Cron 설정이 자동으로 활성화됩니다
- 매일 00:00 UTC에 `/api/cron/daily`가 자동 실행됩니다

#### Vercel Hobby 플랜
**옵션 1: Vercel Cron Jobs (베타)**
1. Project Settings > Cron Jobs
2. 새 Cron Job 추가:
   - Path: `/api/cron/daily`
   - Schedule: `0 0 * * *` (매일 00:00 UTC)
   - Authorization: Bearer Token 설정 (CRON_SECRET 사용)

**옵션 2: 외부 서비스 사용**
- [cron-job.org](https://cron-job.org) 또는 유사 서비스 사용
- URL: `https://your-domain.vercel.app/api/cron/daily`
- Schedule: 매일 00:00 KST (또는 원하는 시간)
- Headers: `Authorization: Bearer YOUR_CRON_SECRET`

### 3.3 GitHub Actions 설정
1. GitHub 저장소 > Settings > Secrets and variables > Actions
2. `GEMINI_API_KEY` 시크릿 추가
3. Actions 탭에서 워크플로우가 활성화되었는지 확인

## 4. 배포 확인

### 4.1 빌드 로그 확인
- Vercel 대시보드 > Deployments > 최신 배포 클릭
- Build Logs 탭에서 빌드 과정 확인

### 4.2 사이트 접속 확인
- 배포된 URL로 접속
- 주요 페이지 확인:
  - `/` (홈)
  - `/blog` (블로그 목록)
  - `/tools` (도구 목록)
  - `/about` (소개)
  - `/privacy` (개인정보 처리방침)

### 4.3 기능 테스트
- [ ] 블로그 포스트 목록 표시
- [ ] 블로그 포스트 상세 페이지
- [ ] 도구 목록 표시
- [ ] 조회수 카운터 작동
- [ ] AdSense 광고 표시 (설정한 경우)
- [ ] Sitemap 접근 (`/sitemap.xml`)
- [ ] Robots.txt 접근 (`/robots.txt`)

## 5. 문제 해결

### 5.1 빌드 실패
**문제**: 빌드 중 에러 발생
**해결**:
1. Build Logs에서 에러 메시지 확인
2. 환경 변수 누락 확인
3. 로컬에서 `npm run build` 실행하여 동일 에러 재현
4. 의존성 문제: `package.json` 확인

### 5.2 환경 변수 오류
**문제**: 런타임 에러 (API 키 누락 등)
**해결**:
1. Environment Variables에서 모든 필수 변수 확인
2. `NEXT_PUBLIC_*` 접두사 확인
3. 변수 값에 공백이나 특수문자 없는지 확인
4. 재배포 실행

### 5.3 Cron Job 제한 및 설정
**문제**: Cron Job 제한 오류 (Hobby 플랜은 최대 2개)
**해결**:
1. **Hobby 플랜 사용 시**: `vercel.json`에서 `crons` 섹션을 제거하고 외부 서비스 사용
   - [cron-job.org](https://cron-job.org) 또는 [EasyCron](https://www.easycron.com) 사용
   - 매일 00:00 UTC에 다음 URL 호출:
     ```
     https://your-domain.vercel.app/api/cron/daily
     Authorization: Bearer YOUR_CRON_SECRET
     ```
2. **Pro 플랜 이상**: `vercel.json`에 Cron 설정 포함 가능
3. `CRON_SECRET` 환경 변수 설정 (외부 서비스 사용 시 필수)
4. 수동 테스트:
   ```bash
   curl -X GET "https://your-domain.vercel.app/api/cron/daily" \
     -H "Authorization: Bearer YOUR_CRON_SECRET"
   ```

### 5.4 데이터베이스 연결 오류
**문제**: Turso 데이터베이스 연결 실패
**해결**:
1. `TURSO_DATABASE_URL`과 `TURSO_AUTH_TOKEN` 확인
2. Turso 대시보드에서 데이터베이스 상태 확인
3. 네트워크 방화벽 설정 확인

## 6. 성능 최적화

### 6.1 빌드 최적화
- `next.config.js`에 이미 최적화 설정 포함:
  - `output: 'standalone'` - 독립 실행 파일 생성
  - `compress: true` - Gzip 압축 활성화
  - `poweredByHeader: false` - 보안 헤더 제거

### 6.2 Edge Runtime 활용
- 모든 API 라우트는 Edge Runtime 사용 (`export const runtime = 'edge'`)
- 빠른 응답 시간과 낮은 지연 시간
- `vercel.json`에 함수 타임아웃 설정 (10초)

### 6.3 정적 생성 최적화
- 모든 페이지는 정적 생성 (SSG)
- `generateStaticParams`로 빌드 시 모든 경로 생성
- `dynamicParams = false`로 동적 경로 제한

## 7. 모니터링

### 7.1 Vercel Analytics
- Vercel 대시보드 > Analytics
- 페이지뷰, 방문자 수, 성능 메트릭 확인

### 7.2 로그 확인
- Vercel 대시보드 > Deployments > Functions
- API 라우트 실행 로그 확인

## 8. 업데이트 및 재배포

### 8.1 자동 배포
- GitHub에 푸시하면 자동으로 재배포됩니다
- Production 브랜치 (보통 `main`)에만 자동 배포

### 8.2 수동 재배포
1. Vercel 대시보드 > Deployments
2. 최신 배포 선택
3. "Redeploy" 클릭

### 8.3 프리뷰 배포
- Pull Request 생성 시 자동으로 프리뷰 배포 생성
- 테스트 후 Production에 머지

## 9. 보안 체크리스트

- [x] 환경 변수에 민감 정보 포함 여부 확인
- [x] `CRON_SECRET` 설정 및 검증 로직 확인 (Vercel Cron 자동 인증 지원)
- [x] API 라우트에 Rate Limiting 적용 확인 (`/api/views/[slug]`)
- [x] Security Headers 설정 확인 (`next.config.js`)
- [x] 입력값 검증 및 Sanitization 확인 (`lib/rate-limit.ts`, `app/api/og/route.tsx`)
- [x] Edge Runtime 사용 확인 (공개 API 라우트: `/api/views`, `/api/cron`, `/api/og`)
- [x] 관리자 API는 Node.js Runtime 사용 (파일 시스템 접근 필요)
- [x] XSS 방지 확인 (OG 이미지 생성 시 입력값 Sanitization)
- [x] Vercel 환경 변수 자동 감지 (`VERCEL_URL` 사용)
- [x] AdSense 조건부 활성화 (clientId 있을 때만)

## 10. 추가 리소스

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Turso 문서](https://docs.turso.tech)
- [Google Gemini API 문서](https://ai.google.dev/docs)

